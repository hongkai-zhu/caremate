# Source and provenance

本目录用于追溯，不是网站日常编辑区。

- `source-metadata.json`：源 PDF 的页码、缺页、文件大小、SHA-256 与数量摘要。
- `source-image-manifest.json/.csv`：每个嵌入图片的 xref、原始尺寸、标准化后尺寸、放置位置、分类及关联产品。
- `raw-images/`：从 PDF 嵌入对象直接提取、合并 soft mask 并统一到浏览器可用色彩空间后的 WebP。为适合网页和压缩包，13 张超高分辨率图的最长边限制为 2400 px；manifest 同时保留 PDF 对象原始尺寸与实际 WebP 尺寸。
- `source-pages/`：低分辨率整页参考图。
- `qa-page-maps/`：标有 PDF 图片对象编号的核对页。
- `raw-text/`：原生文字层或 300 dpi OCR 的逐页原始文本。

产品目录内的 `source/provenance.json` 才是“某个产品对应哪些来源图”的具体映射。

源 PDF 本身未在此目录重复保存；可使用 `source-metadata.json` 中的文件大小和 SHA-256 核对原件。
