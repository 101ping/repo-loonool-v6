function getSpaceIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("spaceId"); // 比如 "space-001"
}

window.addEventListener("DOMContentLoaded", () => {
  const spaceId = getSpaceIdFromUrl();
  console.log("当前 Space ID:", spaceId);
  // TODO: 根据 spaceId 去请求后端数据
});
// ===== 假数据：任务 / 图片 / Evidence / 讨论 =====
const tasks = [
  {
    id: "task-1",
    name: "任务 1",
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
        summary: "与 3 个已注册图形存在中等相似度，建议进一步核查。",
      },
      {
        id: "ev-2",
        title: "品牌视觉使用规范",
        type: "风格",
        who: "Li Mei",
        time: "2025-12-03 10:30",
        summary: "当前方案与品牌主色系及 Logo 使用规范整体保持一致。",
      },
    ],
  },
  {
    id: "task-2",
    name: "任务 2",
    hasFinal: false,
    images: [
      { id: "img-4", name: "social-1.png", isFinal: false },
      { id: "img-5", name: "social-2.png", isFinal: false },
    ],
    evidences: [
      {
        id: "ev-3",
        title: "社交平台素材规范截图",
        type: "外部证据",
        who: "You",
        time: "2025-12-03 11:02",
        summary: "对竖版素材中 Logo 占比的限制有明确说明。",
      },
    ],
  },
];

let currentTaskId = "task-1";

const discussionMessages = [
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
    text: "主 KV 可以作为 Final 候选，看一下相似度和风格分析结果。",
  },
];

function getCurrentTask() {
  return tasks.find((t) => t.id === currentTaskId) || tasks[0];
}

/* ===== 左侧：Task List ===== */
function renderTaskList() {
  const taskListEl = document.getElementById("taskList");
  if (!taskListEl) return;

  taskListEl.innerHTML = tasks
    .map((task) => {
      const imgCount = task.images.length;
      const active = task.id === currentTaskId ? "active" : "";

      const finalHtml = task.hasFinal
        ? `<span class="task-final-icon">✅</span>`
        : `<span class="task-final-placeholder">Final</span>`;

      return `
        <li class="task-item ${active}" data-task-id="${task.id}">
          <div class="task-item-left">
            <div class="task-name">${task.name}</div>
            <div class="task-meta">图片：${imgCount}/6</div>
          </div>
          ${finalHtml}
        </li>
      `;
    })
    .join("");
}

/* ===== 中间：Image Review ===== */
function renderImages() {
  const task = getCurrentTask();
  const grid = document.getElementById("imageGrid");
  const empty = document.getElementById("imageEmptyState");
  const taskLabel = document.getElementById("currentTaskLabel");
  if (!grid || !empty || !taskLabel) return;

  taskLabel.textContent = `当前：${task.name}`;

  if (task.images.length === 0) {
    empty.style.display = "block";
    grid.style.display = "none";
    return;
  }

  empty.style.display = "none";
  grid.style.display = "block";

  // 1 张大图 / 2–6 自适应网格
  const count = task.images.length;
  grid.className = "image-grid " + (count === 1 ? "single" : "multi");

  grid.innerHTML = task.images
    .map(
      (img) => `
      <div class="image-card" data-img-id="${img.id}">
        <div class="image-thumb" data-img-id="${img.id}">
          <span>预览：${img.name}</span>
          <div class="image-thumb-overlay">
            设为 Final（预留按钮）
          </div>
        </div>
        <div class="image-meta-row">
          <div class="image-name">${img.name}</div>
          ${
            img.isFinal
              ? `<div class="image-final-tag">Final ✅</div>`
              : `<div style="font-size:11px;color:#aaa;">候选</div>`
          }
        </div>
      </div>
    `
    )
    .join("");
}

/* ===== 中间：Discussion ===== */
function renderDiscussion() {
  const box = document.getElementById("discussionMessages");
  if (!box) return;

  box.innerHTML = discussionMessages
    .map((m) => {
      if (m.type === "system") {
        return `<div class="msg-system">${m.text}</div>`;
      }
      return `
        <div class="msg-user">
          <div class="msg-user-author">${m.author}</div>
          <div class="msg-user-text">${m.text}</div>
        </div>
      `;
    })
    .join("");

  box.scrollTop = box.scrollHeight;
}

/* ===== 右侧：Evidence Summary + List ===== */
function renderEvidenceSummary() {
  const task = getCurrentTask();
  const el = document.getElementById("evidenceSummary");
  if (!el) return;

  const imgCount = task.images.length;
  const evCount = task.evidences.length;
  const finalImg = task.images.find((i) => i.isFinal);

  el.innerHTML = `
    <div class="summary-row">
      <span class="summary-label">任务名称</span>
      <span class="summary-value">${task.name}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">图片数量</span>
      <span class="summary-value">${imgCount}/6</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">已生成证据</span>
      <span class="summary-value">${evCount} 条</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Final 图片</span>
      <span class="summary-value">
        ${
          finalImg
            ? `已选定：${finalImg.name}`
            : `<span style="color:#c0392b;">尚未选定</span>`
        }
      </span>
    </div>
    <div class="summary-row">
      <span class="summary-label">AI 综合建议</span>
      <span class="summary-value summary-pill">
        ${
          finalImg
            ? "当前 Final 方向整体风险可控，可继续完善细节。"
            : "建议先完成相似度与风格检查，再讨论最终方案。"
        }
      </span>
    </div>
  `;
}

function renderEvidenceList() {
  const task = getCurrentTask();
  const listEl = document.getElementById("evidenceList");
  if (!listEl) return;

  if (task.evidences.length === 0) {
    listEl.innerHTML =
      '<div class="sidebar-hint">当前任务还没有任何 Evidence，可以从下方工具或上传入口创建。</div>';
    return;
  }

  listEl.innerHTML = task.evidences
    .map(
      (ev) => `
      <div class="evidence-item">
        <div class="evidence-row-top">
          <div class="evidence-title">${ev.title}</div>
          <div class="evidence-type-pill">${ev.type}</div>
        </div>
        <div class="evidence-meta">
          ${ev.who} · ${ev.time}
        </div>
        <div class="evidence-summary">
          ${ev.summary}
        </div>
        <div class="evidence-actions">
          <button class="btn-secondary btn-small">查看详情</button>
          <button class="btn-secondary btn-small">复制预览链接</button>
        </div>
      </div>
    `
    )
    .join("");
}

/* ===== 图片预览 Modal ===== */
function openImageModal(img) {
  const modal = document.getElementById("imageModal");
  const body = document.getElementById("imageModalBody");
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="image-modal-thumb">
      假图预览：${img.name}
    </div>
    <div class="image-modal-name">${img.name}</div>
    <p style="font-size:12px;color:#777;margin-top:4px;">
      这里将来接真实大图预览（全屏 / 放大）。
    </p>
  `;

  modal.style.display = "flex";
}

function closeImageModal() {
  const modal = document.getElementById("imageModal");
  if (!modal) return;
  modal.style.display = "none";
}

/* ===== 事件绑定 ===== */
function bindEvents() {
  // 左侧：Add Images
  const addBtn = document.getElementById("addImagesBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      alert("这里将来接：系统打开文件选择窗口，支持多张图片。");
    });
  }

  // 左侧：Export Results
  const exportBtn = document.getElementById("exportBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      alert("这里将来接：导出所有任务的 Final 图片为 zip 包。");
    });
  }

  // 左侧：切换任务
  const taskListEl = document.getElementById("taskList");
  if (taskListEl) {
    taskListEl.addEventListener("click", (e) => {
      const item = e.target.closest(".task-item");
      if (!item) return;
      const id = item.getAttribute("data-task-id");
      if (!id || id === currentTaskId) return;
      currentTaskId = id;
      renderTaskList();
      renderImages();
      renderEvidenceSummary();
      renderEvidenceList();
    });
  }

  // 中间：点击图片 → 弹出 Modal
  const imageGrid = document.getElementById("imageGrid");
  if (imageGrid) {
    imageGrid.addEventListener("click", (e) => {
      const thumb = e.target.closest(".image-thumb");
      if (!thumb) return;
      const imgId = thumb.getAttribute("data-img-id");
      if (!imgId) return;

      const task = getCurrentTask();
      const img = task.images.find((i) => i.id === imgId);
      if (!img) return;

      openImageModal(img);
    });
  }

  // Modal 关闭
  const modal = document.getElementById("imageModal");
  const modalClose = document.getElementById("imageModalClose");
  if (modal && modalClose) {
    modalClose.addEventListener("click", closeImageModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.classList.contains("image-modal-backdrop")) {
        closeImageModal();
      }
    });
  }

  // Discussion：发送消息
  const form = document.getElementById("discussionForm");
  const input = document.getElementById("discussionInput");
  if (form && input) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      discussionMessages.push({
        id: "user-" + Date.now(),
        type: "user",
        author: "You",
        text,
      });
      input.value = "";
      renderDiscussion();
    });
  }

  // 邀请成员按钮
  const inviteBtn = document.getElementById("inviteBtn");
  if (inviteBtn) {
    inviteBtn.addEventListener("click", () => {
      alert("这里将来接：生成当前 Space 的邀请链接。");
    });
  }

  // 分析工具点击
  document.addEventListener("click", (e) => {
    const row = e.target.closest(".tool-row");
    if (!row) return;
    const nameEl = row.querySelector(".tool-name");
    const label = nameEl ? nameEl.textContent.trim() : "分析工具";
    alert(`这里将来接：执行分析工具「${label}」，生成结果并可保存为 Evidence。`);
  });
}

/* ===== 初始化 ===== */
window.addEventListener("DOMContentLoaded", () => {
  renderTaskList();
  renderImages();
  renderDiscussion();
  renderEvidenceSummary();
  renderEvidenceList();
  bindEvents();
});
