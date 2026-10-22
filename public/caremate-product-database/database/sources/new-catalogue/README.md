# 新目录增补来源

源文件：仓库根目录 `new-catalogue.pdf`（13 页）。本次仅导入 PDF 第 11–13 页的五个新品产品族，共 9 个型号、7 张源图及 7 张网站用图。页面未印刷页码，因此来源记录使用 PDF 页码。

- 第 11 页：Gait Belt、Foam Positioning Wedge
- 第 12 页：Heel Protector、Air Sheet for Patient Transfer
- 第 13 页：Foam Mattress

`source-metadata.json` 保存文件 SHA-256、大小和导入范围；`source-image-manifest.json` 保存图像对象编号、软遮罩编号、位置、尺寸及原图 WebP 哈希。`raw-images/` 为恢复软遮罩后的原生分辨率无损 WebP。各产品 `source/provenance.json` 记录裁切边界和留白，网站图片未放大。

文字由 PDF 文本层提取并对照整页渲染核验。未明确标注的型号、软硬度及图片对应关系不作推断，具体说明见产品 `editorialNotes`。
