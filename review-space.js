/***********************
 * 1. 读取 spaceId
 ***********************/
function getSpaceIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("spaceId"); // 比如 "space-001"
}

/***********************
 * 2. 每个 Space 的配置（假数据）
 *    以后这里可以换成后端接口返回
 ***********************/
const SPACE_CONFIGS = {
  "space-001": {
    spaceName: "新品包装设计审核 · 2025-Q1",
    tasks: [
      {
        id: "task-1",
        name: "任务 1 · 主 KV",
        hasFinal: true,
        images: [
          { id: "img-1", name: "kv-main.png", isFinal: true },
          { id: "img-2", name: "kv-variant-a.png", isFinal: false },
          { id: "img-3", name: "kv-variant-b.png", isFinal: false },
        ],
        evidences: [
          {
            id: "ev-1",
            title: "图形相似度初筛报告",
            type: "风险",
            who: "系统",
            time: "2025-12-03 10:12",
            summary:
              "与 3 个已注册图形存在中等相似度，建议进一步核查商标持有人与使用范围。",
          },
          {
            id: "ev-2",
            title: "品牌视觉使用规范 · KV 章节",
            type: "风格",
            who: "Li Mei",
            time: "2025-12-03 10:30",
            summary:
              "当前方案与品牌主色系、Logo 安全区及最小尺寸要求整体匹配度高。",
          },
        ],
      },
      {
        id: "task-2",
        name: "任务 2 · 备用 KV",
        hasFinal: false,
        images: [
          { id: "img-4", name: "kv-alt-1.png", isFinal: false },
          { id: "img-5", name: "kv-alt-2.png", isFinal: false },
        ],
        evidences: [
          {
            id: "ev-3",
            title: "竞品 KV 收集",
            type: "市场",
            who: "You",
            time: "2025-12-03 11:05",
            summary:
              "收集了 5 个同品类 KV，当前方案在排版结构上与主流方案有一定差异。",
          },
        ],
      },
    ],
    discussion: [
      {
        id: "m1",
        type: "system",
        text: "系统：任务 1 已创建（首张图片已上传）。",
      },
      {
        id: "m2",
        type: "system",
        text: "系统：Li Mei 上传了图片《kv-main.png》到任务 1。",
      },
      {
        id: "m3",
        type: "user",
        author: "You",
        text: "主 KV 我先标记为 Final 候选，等相似度和风格工具跑完再确认。",
      },
    ],
  },

  "space-002": {
    spaceName: "品牌 Logo 相似度审核",
    tasks: [
      {
        id: "task-1",
        name: "任务 1 · Logo 初筛",
        hasFinal: false,
        images: [
          { id: "img-10", name: "logo-v1.png", isFinal: false },
          { id: "img-11", name: "logo-v2.png", isFinal: false },
        ],
        evidences: [
          {
            id: "ev-10",
            title: "公开注册商标截图",
            type: "外部证据",
            who: "Wang Si",
            time: "2025-11-21 09:10",
            summary:
              "截取了 4 个在同一大类下已注册的图形商标，用于后续比对
