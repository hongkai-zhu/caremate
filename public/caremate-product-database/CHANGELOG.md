# Changelog

## 2026-10-22

- 从 `new-catalogue.pdf` 第 11–13 页新增 Gait Belt、Foam Positioning Wedge、Heel Protector、Air Sheet for Patient Transfer、Foam Mattress。
- 新增 5 个产品族、9 个型号、7 张网站用图及 7 张无损源图；总计 121 个产品、184 个型号、177 张网站用图。
- 沿用 Patient Care 分类：新增 Patient Transfer 子分类，定位楔、足跟保护器和床垫归入 Pressure Relief。
- 保留转移气垫尺寸/承重示意图及床垫剖面图，逐页核对说明并记录未明确标注的型号关系。
- 构建脚本支持独立的多份 PDF 来源清单；生成索引的 `metadata.sources` 分别保留每份 PDF 的元数据。
- 更新产品索引、CSV 总览、分类介绍及维护说明。

## 2026-07-24

- 从 Caremate catalogue 建立初始内容库。
- 创建 116 个产品记录、175 个型号条目与 170 张整理后的产品图。
- 保存 149 张候选源图片及完整来源清单。
- 对组合图中的 gauge、bulb 和 chestpiece 建立单品裁图。
- 逐图质检并修复 PDF 裁切遮罩、相邻产品碎片与组合图裁切边界。
- 依据图片中可见标签补充精确型号映射；无法可靠对应的 family 图片不强行绑定型号。
- 为图片增加 `sourceType`、生成时内容哈希及更严格的 YAML／图片／provenance／manifest 联合校验。
- 标记源 PDF 缺少印刷页 07–08 与 11–14。
- 标记 catalogue 自身的型号/说明不一致和原有拼写问题。
