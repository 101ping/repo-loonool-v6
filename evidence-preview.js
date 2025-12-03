// ========== 404 自动跳转函数 ==========
function goto404() {
  window.location.href = "404.html"; 
}

// ========== 解析 URL 参数 ==========
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const spaceId = getQueryParam("spaceId");
const taskId = getQueryParam("taskId");
const evidenceId = getQueryParam("evidenceId");

// 基础参数检查（任何一个缺失 → 404）
if (!spaceId || !taskId || !evidenceId) {
  goto404();
}
// ========== 404 自动跳转 ==========
function goto404() {
  window.location.href = "404.html";
}

// ========== URL 参数解析 ==========
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const spaceId = getQueryParam("spaceId");
const taskId = getQueryParam("taskId");
const evidenceId = getQueryParam("evidenceId");

// 参数缺失 → 自动跳 404
if (!spaceId || !taskId || !evidenceId) {
  goto404();
}

// ========== 检查 mock 数据是否存在（把你问的代码放这里） ==========
const space = MOCK_SPACES[spaceId];
if (!space) {
  goto404();
}

const task = space.tasks[taskId];
if (!task) {
  goto404();
}

const evidence = task.evidences[evidenceId];
if (!evidence) {
  goto404();
}

// ========== 数据存在 → 渲染 Evidence 页面 ==========
document.getElementById("eviTitle").textContent = evidence.title;
document.getElementById("eviCreator").textContent = evidence.creator;
document.getElementById("eviTime").textContent = evidence.time;
document.getElementById("eviContent").textContent = evidence.content;

/***********************
 * 1. 读取 URL 参数
 ***********************/
function getPreviewParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    spaceId: params.get("spaceId") || "space-001",
    taskId: params.get("taskId") || "task-1",
    evidenceId: params.get("evidenceId") || "ev-1",
  };
}

/***********************
 * 2. 假数据：和 review-space.js 对应
 *    （以后可以换成后端接口返回）
 ***********************/
const PREVIEW_DATA = {
  "space-001": {
    spaceName: "新品包装设计审核 · 2025-Q1",
    tasks: {
      "task-1": {
        name: "任务 1 · 主 KV",
        evidences: {
          "ev-1": {
            title: "图形相似度初筛报告",
            author: "系统",
            time: "2025-12-03 10:12",
            type: "风险",
            contentHtml: `
              <p>这是一份针对当前主 KV 图片的图形相似度初筛结果。</p>
              <p>在公开图形商标库中检索到 <strong>3 个外观较为接近的图形</strong>，其中 1 个属于不同品类，2 个与当前使用场景相近。</p>
              <p>本报告 <strong>不构成任何法律意见</strong>，仅用于帮助团队初步识别潜在冲突图形，后续是否需要进一步检索或咨询专业人士，由团队自行决定。</p>
            `,
          },
          "ev-2": {
            title: "品牌视觉使用规范 · KV 章节",
            author: "Li Mei",
            time: "2025-12-03 10:30",
            type: "风格",
            contentHtml: `
              <p>本 Evidence 摘要了品牌视觉手册中与 KV 相关的核心要求：</p>
              <ul>
                <li>主色需保持在品牌主色系范围内；</li>
                <li>Logo 需放置在右下角安全区内，不得被其它元素遮挡；</li>
                <li>禁止在 KV 中加入与竞品品牌高度相近的图形元素。</li>
              </ul>
              <p>当前方案整体符合上述规范，仅建议微调文案层级和按钮对比度。</p>
            `,
          },
        },
      },
      "task-2": {
        name: "任务 2 · 备用 KV",
        evidences: {
          "ev-3": {
            title: "竞品 KV 收集",
            author: "You",
            time: "2025-12-03 11:05",
            type: "市场",
            contentHtml: `
              <p>该 Evidence 汇总了 5 组同品类产品的 KV 截图，用于对比排版结构与信息层级。</p>
              <p>观察结果：</p>
              <ul>
                <li>多数竞品采用“产品+卖点+权益”三段式结构；</li>
                <li>当前方案在产品展示区域上更为聚焦，但卖点信息略少；</li>
                <li>建议在不增加视觉噪音的前提下，补充 1~2 个关键卖点。</li>
              </ul>
            `,
          },
        },
      },
    },
  },

  "space-002": {
    spaceName: "品牌 Logo 相似度审核",
    tasks: {
      "task-1": {
        name: "任务 1 · Logo 初筛",
        evidences: {
          "ev-10": {
            title: "公开注册商标截图",
            author: "Wang Si",
            time: "2025-11-21 09:10",
            type: "外部证据",
            contentHtml: `
              <p>该 Evidence 收录了 4 个与本次设计方向接近的已注册图形商标，用于后续比对与内部讨论。</p>
              <p>截图信息包括：商标图样、注册号、类别和核定使用商品/服务范围。</p>
            `,
          },
        },
      },
    },
  },

  "space-003": {
    spaceName: "社交媒体活动视觉素材审核",
    tasks: {},
  },
};

/***********************
 * 3. 根据参数查找 Evidence
 ***********************/
function findEvidence(spaceId, taskId, evidenceId) {
  const space = PREVIEW_DATA[spaceId];
  if (!space) return null;
  const task = space.tasks[taskId];
  if (!task) return null;
  const ev = task.evidences && task.evidences[evidenceId];
  if (!ev) return null;
  return {
    spaceName: space.spaceName,
    taskName: task.name,
    ...ev,
  };
}

/***********************
 * 4. 渲染页面
 ***********************/
function renderPreview() {
  const { spaceId, taskId, evidenceId } = getPreviewParams();
  const data = findEvidence(spaceId, taskId, evidenceId);

  const titleEl = document.getElementById("previewTitle");
  const metaEl = document.getElementById("previewMeta");
  const contentEl = document.getElementById("previewContent");

  if (!titleEl || !metaEl || !contentEl) return;

  if (!data) {
    titleEl.textContent = "找不到对应的 Evidence";
    metaEl.textContent = "链接可能已失效，或你无权访问该 Evidence。";
    contentEl.innerHTML = `
      <p>请确认链接是否完整，或联系空间管理员。</p>
    `;
    return;
  }

  // 设置标题
  titleEl.textContent = data.title;

  // Meta 行：Space / Task / 作者 / 时间
  metaEl.textContent = `${data.spaceName} · ${data.taskName} ｜ ${data.author} ｜ ${data.time}`;

  // 主内容（采用预设的 HTML）
  contentEl.innerHTML = data.contentHtml;

  // 更新浏览器 tab 标题
  document.title = `${data.title} · Evidence Preview · LOONOOL`;

  // CTA：返回任务按钮（带回 spaceId & taskId）
  const goToTaskBtn = document.getElementById("goToTaskBtn");
  if (goToTaskBtn) {
    goToTaskBtn.addEventListener("click", () => {
      // 将来可以用 anchor 跳到特定任务，这里先简单跳回 Review Space
      window.location.href = `review-space.html?spaceId=${spaceId}&taskId=${taskId}`;
    });
  }
}

/***********************
 * 5. 初始化
 ***********************/
window.addEventListener("DOMContentLoaded", () => {
  renderPreview();
});
