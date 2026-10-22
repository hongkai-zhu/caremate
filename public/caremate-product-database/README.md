# Caremate 产品内容库

这是从 `Catalogue of Caremate 506.pdf` 提取并逐页核对、再由 `new-catalogue.pdf` 增补的产品内容库。产品文字和图片可独立于网页代码维护，网站通过生成索引读取这些内容。

## 先看结论

- `database/products/<产品 ID>/product.yaml` 是人工编辑的结构化文字与元数据源。
- 同一文件夹内的 `images/hero.webp` 和 `images/gallery-*.webp` 是该产品在网站中使用的图片。
- `database/generated/products-index.json` 是网页读取的统一索引，由脚本自动生成，不要手工修改。
- 121 个产品记录、184 个型号条目、177 张整理后的产品图均已建立来源关联。
- 两份 PDF 共保存 156 张产品/组件源图，采用浏览器可用的 WebP，方便追溯。

## 2026-10 新增产品位置

以下文件夹均位于 `database/products/`，文字在 `product.yaml`，主图在 `images/hero.webp`，补充图在 `images/gallery-02.webp`，来源在 `source/provenance.json`。

| 产品 | 文件夹 | 网站分类 |
| --- | --- | --- |
| Gait Belt | `cm-gb-series/` | Patient Care → Patient Transfer |
| Foam Positioning Wedge | `cm-fw-series/` | Patient Care → Pressure Relief |
| Heel Protector | `cm-hp1511/` | Patient Care → Pressure Relief |
| Air Sheet for Patient Transfer | `cm-as-series/` | Patient Care → Patient Transfer |
| Foam Mattress | `cm-m-series/` | Patient Care → Pressure Relief |

本次增补仅取仓库根目录 `new-catalogue.pdf` 的第 11–13 页。原图及来源清单在 `database/sources/new-catalogue/`。Air Sheet 保留尺寸/承重示意图，Foam Mattress 保留剖面图。未明确标注的型号与图片对应关系记在 `editorialNotes` 中。

## 文件结构

```text
caremate-product-database/
├── README.md
├── database/
│   ├── categories.yaml
│   ├── products/
│   │   └── cm-1222/
│   │       ├── product.yaml
│   │       ├── images/
│   │       │   └── hero.webp
│   │       └── source/
│   │           └── provenance.json
│   ├── generated/
│   │   ├── products-index.json
│   │   └── products-overview.csv
│   ├── schema/
│   │   └── product.schema.json
│   └── sources/
│       ├── catalogue-caremate-506/
│       └── new-catalogue/
└── scripts/
    └── build_index.py
```

## 日常修改方法

### 修改产品文字

打开对应产品的 `product.yaml`，编辑这些字段：

```yaml
name:
  en: Economy Sphygmomanometer
  zh: 经济型机械血压计
description:
  en: ""
  zh: ""
features:
  en:
    - Manometer calibrated from 20-300mmHg with NON STOP PIN
  zh:
    - 压力表量程 20–300 mmHg
```

`id` 是稳定的内部主键，创建后不要改。`slug` 可以在以后决定网址结构时修改。

可以先在 `database/generated/products-overview.csv` 中按型号、英文名称或分类查找，再进入对应的产品目录。所有记录沿用 `draft` 状态；当前网站会显示索引中的全部产品，不按该状态过滤。

### 替换产品图

直接覆盖对应产品目录中的 `images/hero.webp`，并把同一图片条目的 `sourceType` 改为 `replacement`。这样来源记录不会错误地把新照片声明为 catalogue 原图。

```yaml
images:
  - role: hero
    file: images/hero.webp
    sourceType: replacement
    alt:
      en: Economy Sphygmomanometer
```

如果增加图库图片：

1. 把图片放进该产品的 `images/`；
2. 在 `product.yaml` 的 `images` 数组中添加相对路径、`sourceType`、替代文字和关联型号；
3. 在 `source/provenance.json` 的 `imageSources` 中增加同一 `productFile` 映射；
4. 重新生成索引。

推荐保留 WebP，图片最长边 1600–2400 px。每个产品必须恰好有一张 `role: hero` 图片。

`sourceType` 可用值：

- `catalogue-extracted`：直接提取或从组合图裁出的 catalogue 图片；
- `edited`：从 catalogue 恢复、清理或编辑后的图片；
- `replacement`：以后自行替换的新照片。

### 重新生成网页索引

需要 Python 3、PyYAML 和 Pillow：

```bash
python3 -m pip install pyyaml pillow
python3 scripts/build_index.py
```

以上命令在 `public/caremate-product-database/` 下运行。若在网站根目录，使用 `python3 public/caremate-product-database/scripts/build_index.py`。构建脚本自动读取 `database/sources/*/source-metadata.json` 及对应图片清单，合并到索引的 `metadata.sources`，同时校验产品总数、原图数量和文件哈希。

仅检查、不改生成文件，并确认现有 JSON 没有过期：

```bash
python3 scripts/build_index.py --check
```

网站第二阶段可直接读取：

```text
database/generated/products-index.json
```

索引内图片路径以 `database/` 为基准，例如：

```text
products/cm-1222/images/hero.webp
```

索引的 `metadata.assetBase` 固定为 `database/`；每张图片还带有按当前文件计算的 `contentHash`。前端可以这样避免替换图片后仍命中旧缓存：

```js
const src = `${index.metadata.assetBase}${image.file}?v=${image.contentHash.slice(0, 12)}`;
```

## 数据原则

- 多型号共用说明或图片时，使用一个产品族记录和多个 `variants`，避免复制粘贴后内容失去同步。
- 图片条目的 `modelSkus` 只表示照片中可由标签或版面关系明确确认的具体型号；图片与型号无法可靠一一对应时省略此字段，仅关联到整个产品族，并在 `reviewStatus` 与来源说明中标出。
- Catalogue 中确认存在的拼写或语法问题原则上原样保留；已发现的来源问题或推定标题会写入 `editorialNotes`。网站上线前仍建议进行一次英文文案编辑。
- 每个产品的 `source/provenance.json` 记录 PDF 页码、目录页码、原始图片编号、裁剪区域及特殊说明。
- 产品 YAML、图片文件、来源映射、源图哈希和生成索引会在构建时一起校验；任一关联断开都会报错。

## 源文件完整性提醒

初版 `Catalogue of Caremate 506.pdf` 的印刷页顺序从 01–06 跳到 09–10，再跳到 15–34。印刷页 **07–08 和 11–14 不在该 PDF 中**。初版内容库覆盖该 PDF 实际包含的全部产品页。本次 `new-catalogue.pdf` 仅增补指定的五个产品族，不代表已补齐初版缺页。
