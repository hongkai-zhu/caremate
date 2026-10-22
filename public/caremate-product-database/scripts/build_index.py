#!/usr/bin/env python3
"""Validate editable YAML records and generate the website-facing index."""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import re
import sys
from pathlib import Path, PurePosixPath
from typing import Any

import yaml
from PIL import Image, UnidentifiedImageError


ROOT = Path(__file__).resolve().parents[1]
DATABASE = ROOT / "database"
PRODUCTS_DIR = DATABASE / "products"
GENERATED_DIR = DATABASE / "generated"
CATEGORIES_PATH = DATABASE / "categories.yaml"
SOURCES_DIR = DATABASE / "sources"
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
IMAGE_EXTENSIONS = {".webp", ".png", ".jpg", ".jpeg", ".avif"}
IMAGE_SOURCE_TYPES = {"catalogue-extracted", "replacement", "edited"}


class ValidationError(Exception):
    pass


def load_yaml(path: Path) -> dict[str, Any]:
    try:
        value = yaml.safe_load(path.read_text(encoding="utf-8"))
    except Exception as error:
        raise ValidationError(f"{path}: invalid YAML: {error}") from error
    if not isinstance(value, dict):
        raise ValidationError(f"{path}: top level must be an object")
    return value


def load_json(path: Path, expected_type: type[Any]) -> Any:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except Exception as error:
        raise ValidationError(f"{path}: invalid JSON: {error}") from error
    if not isinstance(value, expected_type):
        raise ValidationError(
            f"{path}: top level must be {expected_type.__name__}"
        )
    return value


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValidationError(message)


def validate_localized_text(value: Any, where: str) -> None:
    require(isinstance(value, dict), f"{where}: must be an object")
    require(isinstance(value.get("en"), str), f"{where}.en: must be a string")


def validate_image_file_value(value: Any, where: str) -> str:
    require(isinstance(value, str), f"{where}: must be a string")
    require("\\" not in value, f"{where}: must use forward slashes")
    relative_path = PurePosixPath(value)
    require(
        not relative_path.is_absolute()
        and len(relative_path.parts) >= 2
        and relative_path.parts[0] == "images"
        and all(part not in {"", ".", ".."} for part in relative_path.parts)
        and relative_path.as_posix() == value,
        f"{where}: must be a safe relative path below images/",
    )
    require(
        relative_path.suffix in IMAGE_EXTENSIONS,
        f"{where}: unsupported image extension {relative_path.suffix!r}",
    )
    return value


def validate_provenance(
    product: dict[str, Any],
    yaml_path: Path,
    candidate_source_files: set[str],
    product_image_files: set[str],
) -> None:
    provenance_path = yaml_path.parent / "source" / "provenance.json"
    require(provenance_path.is_file(), f"{yaml_path}: missing source/provenance.json")
    provenance = load_json(provenance_path, dict)
    require(
        provenance.get("productId") == product["id"],
        f"{provenance_path}: productId must equal {product['id']!r}",
    )

    image_sources = provenance.get("imageSources")
    require(
        isinstance(image_sources, list) and image_sources,
        f"{provenance_path}.imageSources: must be a non-empty list",
    )
    source_pdf_pages: list[int] = []
    source_product_files: set[str] = set()
    for index, item in enumerate(image_sources):
        where = f"{provenance_path}.imageSources[{index}]"
        require(isinstance(item, dict), f"{where}: must be an object")

        pdf_page = item.get("pdfPage")
        require(
            isinstance(pdf_page, int) and not isinstance(pdf_page, bool) and pdf_page > 0,
            f"{where}.pdfPage: must be a positive integer",
        )
        source_pdf_pages.append(pdf_page)

        product_file = item.get("productFile")
        product_file = validate_image_file_value(
            product_file, f"{where}.productFile"
        )
        source_product_files.add(product_file)

        normalized_file = item.get("sourceNormalizedFile")
        require(
            isinstance(normalized_file, str) and normalized_file,
            f"{where}.sourceNormalizedFile: must be a non-empty string",
        )
        require(
            normalized_file in candidate_source_files,
            f"{where}.sourceNormalizedFile: not a candidate in source manifest",
        )
        source_path = ROOT / normalized_file
        require(
            source_path.is_file(),
            f"{where}.sourceNormalizedFile: missing {source_path}",
        )

    expected_pdf_pages = sorted(set(source_pdf_pages))
    require(
        provenance.get("pdfPages") == expected_pdf_pages,
        f"{provenance_path}.pdfPages: must equal {expected_pdf_pages}",
    )
    require(
        source_product_files == product_image_files,
        f"{provenance_path}.imageSources productFile set does not match product images: "
        f"expected {sorted(product_image_files)}, got {sorted(source_product_files)}",
    )


def validate_product(
    product: dict[str, Any],
    yaml_path: Path,
    category_ids: set[str],
    candidate_source_files: set[str],
) -> None:
    required = {
        "schemaVersion",
        "id",
        "slug",
        "status",
        "reviewStatus",
        "category",
        "subcategory",
        "name",
        "variants",
        "description",
        "features",
        "images",
        "editorialNotes",
        "sortOrder",
    }
    missing = sorted(required - set(product))
    require(not missing, f"{yaml_path}: missing keys: {', '.join(missing)}")
    require(product["schemaVersion"] == 1, f"{yaml_path}: schemaVersion must be 1")
    for key in ("id", "slug"):
        require(
            isinstance(product[key], str) and SLUG_RE.fullmatch(product[key]),
            f"{yaml_path}: invalid {key}: {product[key]!r}",
        )
    require(
        product["id"] == yaml_path.parent.name,
        f"{yaml_path}: id must equal its folder name",
    )
    require(
        product["status"] in {"draft", "published", "archived"},
        f"{yaml_path}: invalid status",
    )
    require(
        isinstance(product["reviewStatus"], str)
        and bool(product["reviewStatus"].strip()),
        f"{yaml_path}: reviewStatus must be a non-empty string",
    )
    require(
        isinstance(product["subcategory"], str)
        and bool(product["subcategory"].strip()),
        f"{yaml_path}: subcategory must be a non-empty string",
    )
    require(
        isinstance(product["category"], str)
        and product["category"] in category_ids,
        f"{yaml_path}: unknown category {product['category']!r}",
    )
    validate_localized_text(product["name"], f"{yaml_path}.name")
    validate_localized_text(product["description"], f"{yaml_path}.description")
    require(isinstance(product["variants"], list), f"{yaml_path}: variants must be a list")
    variant_skus: set[str] = set()
    for index, item in enumerate(product["variants"]):
        where = f"{yaml_path}.variants[{index}]"
        require(isinstance(item, dict), f"{where}: must be an object")
        require(
            isinstance(item.get("sku"), str) and item["sku"].strip(),
            f"{where}.sku: must be a non-empty string",
        )
        require(item["sku"] not in variant_skus, f"{where}: duplicate SKU in product")
        variant_skus.add(item["sku"])
        if "label" in item:
            validate_localized_text(item["label"], f"{where}.label")
    features = product["features"]
    require(
        isinstance(features, dict) and isinstance(features.get("en"), list),
        f"{yaml_path}: features.en must be a list",
    )
    images = product["images"]
    require(isinstance(images, list) and images, f"{yaml_path}: images must be non-empty")
    hero_count = 0
    seen_files: set[str] = set()
    for index, item in enumerate(images):
        where = f"{yaml_path}.images[{index}]"
        require(isinstance(item, dict), f"{where}: must be an object")
        require(
            item.get("role")
            in {"hero", "gallery", "detail", "packaging", "instruction"},
            f"{where}: invalid role",
        )
        hero_count += item["role"] == "hero"
        require(
            item.get("sourceType") in IMAGE_SOURCE_TYPES,
            f"{where}.sourceType: must be one of {sorted(IMAGE_SOURCE_TYPES)}",
        )
        file_value = validate_image_file_value(item.get("file"), f"{where}.file")
        require(file_value not in seen_files, f"{where}: duplicate image path")
        seen_files.add(file_value)
        image_path = yaml_path.parent / file_value
        require(image_path.is_file(), f"{where}: missing image {image_path}")
        require(image_path.stat().st_size > 0, f"{where}: empty image {image_path}")
        try:
            with Image.open(image_path) as source_image:
                require(
                    source_image.width > 0 and source_image.height > 0,
                    f"{where}: image has invalid dimensions",
                )
                source_image.verify()
        except (OSError, UnidentifiedImageError) as error:
            raise ValidationError(
                f"{where}: image cannot be decoded: {image_path}: {error}"
            ) from error
        validate_localized_text(item.get("alt"), f"{where}.alt")
        if "modelSkus" in item:
            require(
                isinstance(item["modelSkus"], list),
                f"{where}.modelSkus: must be a list",
            )
            require(
                all(
                    isinstance(sku, str) and bool(sku.strip())
                    for sku in item["modelSkus"]
                ),
                f"{where}.modelSkus: every SKU must be a non-empty string",
            )
            require(
                len(item["modelSkus"]) == len(set(item["modelSkus"])),
                f"{where}.modelSkus: duplicate SKU",
            )
            unknown = set(item["modelSkus"]) - variant_skus
            require(
                not unknown,
                f"{where}.modelSkus: unknown SKU(s): {sorted(unknown)}",
            )
    require(hero_count == 1, f"{yaml_path}: exactly one hero image is required")
    images_dir = yaml_path.parent / "images"
    require(images_dir.is_dir(), f"{yaml_path}: missing images directory")
    actual_image_files = {
        path.relative_to(yaml_path.parent).as_posix()
        for path in images_dir.rglob("*")
        if path.is_file()
    }
    require(
        actual_image_files == seen_files,
        f"{yaml_path}: images directory does not match referenced files: "
        f"unreferenced={sorted(actual_image_files - seen_files)}, "
        f"missing={sorted(seen_files - actual_image_files)}",
    )
    require(
        isinstance(product["sortOrder"], int) and product["sortOrder"] >= 0,
        f"{yaml_path}: sortOrder must be a non-negative integer",
    )
    validate_provenance(
        product,
        yaml_path,
        candidate_source_files,
        seen_files,
    )


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def validate_source_images(manifest_path: Path) -> set[str]:
    manifest = load_json(manifest_path, list)
    candidate_source_files: set[str] = set()
    for index, item in enumerate(manifest):
        where = f"{manifest_path}[{index}]"
        require(isinstance(item, dict), f"{where}: must be an object")
        if item["classification"] != "candidate":
            continue
        normalized_file = item.get("normalizedFile")
        require(
            isinstance(normalized_file, str) and normalized_file,
            f"{where}.normalizedFile: must be a non-empty string",
        )
        require(
            normalized_file not in candidate_source_files,
            f"{where}.normalizedFile: duplicate candidate path",
        )
        candidate_source_files.add(normalized_file)
        image_path = ROOT / normalized_file
        require(image_path.is_file(), f"{where}: missing {image_path}")
        require(image_path.stat().st_size > 0, f"{where}: empty {image_path}")
        try:
            with Image.open(image_path) as source_image:
                require(
                    source_image.width > 0 and source_image.height > 0,
                    f"{where}: invalid dimensions",
                )
                source_image.verify()
        except (OSError, UnidentifiedImageError) as error:
            raise ValidationError(
                f"{where}: image cannot be decoded: {image_path}: {error}"
            ) from error
        require(
            sha256_file(image_path) == item["normalizedSha256"],
            f"{where}: SHA-256 mismatch for {image_path}",
        )
    return candidate_source_files


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--check",
        action="store_true",
        help="validate only; do not rewrite generated files",
    )
    args = parser.parse_args()

    try:
        categories_doc = load_yaml(CATEGORIES_PATH)
        categories = categories_doc.get("categories")
        require(isinstance(categories, list), "categories.yaml: categories must be a list")
        category_ids = {item["id"] for item in categories}
        source_metadata_paths = sorted(SOURCES_DIR.glob("*/source-metadata.json"))
        require(bool(source_metadata_paths), "no catalogue source metadata found")
        sources = []
        candidate_source_files: set[str] = set()
        for metadata_path in source_metadata_paths:
            source = load_json(metadata_path, dict)
            source_files = validate_source_images(
                metadata_path.with_name("source-image-manifest.json")
            )
            require(
                not candidate_source_files.intersection(source_files),
                f"{metadata_path}: source images overlap another catalogue",
            )
            require(
                len(source_files) == source["candidateSourceImageCount"],
                f"{metadata_path}: candidate image count does not match manifest",
            )
            candidate_source_files.update(source_files)
            sources.append({"id": metadata_path.parent.name, **source})

        products: list[dict[str, Any]] = []
        ids: set[str] = set()
        slugs: set[str] = set()
        skus: dict[str, str] = {}
        for yaml_path in sorted(PRODUCTS_DIR.glob("*/product.yaml")):
            product = load_yaml(yaml_path)
            validate_product(
                product,
                yaml_path,
                category_ids,
                candidate_source_files,
            )
            require(product["id"] not in ids, f"duplicate product id: {product['id']}")
            require(product["slug"] not in slugs, f"duplicate product slug: {product['slug']}")
            ids.add(product["id"])
            slugs.add(product["slug"])
            for item in product["variants"]:
                sku = item["sku"]
                require(
                    sku not in skus,
                    f"duplicate SKU {sku!r}: {skus.get(sku)} and {product['id']}",
                )
                skus[sku] = product["id"]

            normalized = json.loads(json.dumps(product))
            for source_image, image in zip(product["images"], normalized["images"]):
                image_path = yaml_path.parent / source_image["file"]
                image["contentHash"] = sha256_file(image_path)
                image["file"] = (
                    f"products/{product['id']}/{image['file']}"
                )
            products.append(normalized)

        products.sort(key=lambda item: (item["sortOrder"], item["id"]))
        require(
            len(products) == sum(source["productRecordCount"] for source in sources),
            "record count does not match source metadata",
        )

        index = {
            "schemaVersion": 1,
            "metadata": {
                "sources": sources,
                "candidateSourceImageCount": len(candidate_source_files),
                "productRecordCount": len(products),
                "skuCount": len(skus),
                "sourceOfTruth": "database/products/*/product.yaml",
                "assetBase": "database/",
            },
            "categories": categories,
            "products": products,
        }
        index_path = GENERATED_DIR / "products-index.json"
        if args.check:
            require(
                index_path.is_file(),
                f"{index_path}: missing; run build_index.py without --check",
            )
            current_index = load_json(index_path, dict)
            require(
                current_index == index,
                f"{index_path}: generated index is stale; "
                "run build_index.py without --check",
            )
        else:
            GENERATED_DIR.mkdir(parents=True, exist_ok=True)
            index_path.write_text(
                json.dumps(index, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            with (GENERATED_DIR / "products-overview.csv").open(
                "w", newline="", encoding="utf-8"
            ) as stream:
                fields = [
                    "id",
                    "slug",
                    "name_en",
                    "skus",
                    "category",
                    "subcategory",
                    "status",
                    "review_status",
                    "hero_image",
                    "product_yaml",
                ]
                writer = csv.DictWriter(stream, fieldnames=fields)
                writer.writeheader()
                for product in products:
                    hero = next(
                        image["file"]
                        for image in product["images"]
                        if image["role"] == "hero"
                    )
                    writer.writerow(
                        {
                            "id": product["id"],
                            "slug": product["slug"],
                            "name_en": product["name"]["en"],
                            "skus": "|".join(
                                item["sku"] for item in product["variants"]
                            ),
                            "category": product["category"],
                            "subcategory": product["subcategory"],
                            "status": product["status"],
                            "review_status": product["reviewStatus"],
                            "hero_image": hero,
                            "product_yaml": (
                                f"products/{product['id']}/product.yaml"
                            ),
                        }
                    )
        print(
            f"OK: {len(products)} products, {len(skus)} SKUs, "
            f"{sum(len(p['images']) for p in products)} curated images"
        )
        return 0
    except ValidationError as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
