// 1）这里用数组模拟当前用户参与的空间列表
// 真实接后端时，只要把 spaces 替换成接口返回的数据即可
const spaces = [
  // 想测试“空状态”时，把下面三项全部删掉，改成 [] 即可
  {
    id: "space-001",
    name: "新品包装设计审核 · 2025-Q1",
    owner: "Li Mei",
    taskCount: 8,
    lastUpdated: "2025-12-01 15:32",
  },
  {
    id: "space-002",
    name: "品牌 Logo 相似度审核",
    owner: "Wang Si",
    taskCount: 3,
    lastUpdated: "2025-11-20 10:05",
  },
  {
    id: "space-003",
    name: "社交媒体活动视觉素材审核",
    owner: "You",
    taskCount: 15,
    lastUpdated: "2025-12-03 09:18",
  },
];

// 渲染列表或空状态
function renderSpaces() {
  const container = document.getElementById("spacesContainer");
  if (!container) return;

  // 有空间：渲染表格
  if (spaces.length > 0) {
    const table = document.createElement("table");
    table.className = "spaces-table";

    table.innerHTML = `
      <thead>
        <tr>
          <th class="spaces-col-name">Space Name</th>
          <th class="spaces-col-owner">Owner</th>
          <th class="spaces-col-tasks">Task Count</th>
          <th class="spaces-col-updated">Last Updated</th>
          <th class="spaces-col-action"></th>
        </tr>
      </thead>
      <tbody>
        ${spaces
          .map(
            (s) => `
          <tr data-space-id="${s.id}">
            <td class="spaces-col-name">
              <button class="link-button space-link" data-space-id="${s.id}">
                ${s.name}
              </button>
            </td>
            <td class="spaces-col-owner">${s.owner}</td>
            <td class="spaces-col-tasks">${s.taskCount}</td>
            <td class="spaces-col-updated">${s.lastUpdated}</td>
            <td class="spaces-col-action">
              <button class="btn-ghost enter-space-btn" data-space-id="${s.id}">
                进入空间
              </button>
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    `;

    container.innerHTML = "";
    container.appendChild(table);
  } else {
    // 没有任何空间：显示空状态
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🌀</div>
        <div class="empty-title">还没有任何图片审核空间</div>
        <div class="empty-subtitle">
          创建第一个 Space，把你和团队的图片审核集中到一个地方管理。
        </div>
        <div class="empty-actions">
          <button class="btn-primary" id="emptyCreateBtn">
            创建图片审核空间
          </button>
        </div>
      </div>
    `;
  }
}

// 绑定按钮行为：进入空间 / 创建空间
function bindEvents() {
  // 顶部右侧“创建新的审核空间”
  const createBtn = document.getElementById("createSpaceFromList");
  if (createBtn) {
    createBtn.addEventListener("click", () => {
      // 将来接创建流程，这里先占位
      alert("这里将来接：创建新的审核空间流程");
    });
  }

  // 事件委托：点击 Space 名称 或 进入空间 按钮
  document.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("space-link")) {
      const spaceId = target.getAttribute("data-space-id");
      console.log("点击 Space 名称：", spaceId);
      // TODO: 跳转到 Review Space 页面
      // window.location.href = `review-space.html?id=${spaceId}`;
    }

    if (target.classList.contains("enter-space-btn")) {
      const spaceId = target.getAttribute("data-space-id");
      console.log("点击进入空间：", spaceId);
      // TODO: 同样跳转到 Review Space 页面
      // window.location.href = `review-space.html?id=${spaceId}`;
    }

    if (target.id === "emptyCreateBtn") {
      alert("这里将来接：创建第一个审核空间流程");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderSpaces();
  bindEvents();
});
// 假数据，你可以保留或替换
const spaces = [
  {
    id: "space-001",
    name: "新品包装设计审核 · 2025-Q1",
    owner: "Li Mei",
    taskCount: 8,
    lastUpdated: "2025-12-01 15:32",
  },
  {
    id: "space-002",
    name: "品牌 Logo 相似度审核",
    owner: "Wang Si",
    taskCount: 3,
    lastUpdated: "2025-11-20 10:05",
  },
];

function renderSpaces() {
  const container = document.getElementById("spacesContainer");
  if (!container) return;

  // 有空间 → 表格
  if (spaces.length > 0) {
    container.innerHTML = `
      <table class="spaces-table">
        <thead>
          <tr>
            <th class="spaces-col-name">Space Name</th>
            <th class="spaces-col-owner">Owner</th>
            <th class="spaces-col-tasks">Task Count</th>
            <th class="spaces-col-updated">Last Updated</th>
            <th class="spaces-col-action"></th>
          </tr>
        </thead>
        <tbody>
          ${spaces
            .map(
              (s) => `
            <tr data-space-id="${s.id}">
              <td class="spaces-col-name">
                <button class="link-button space-link" data-space-id="${s.id}">
                  ${s.name}
                </button>
              </td>
              <td class="spaces-col-owner">${s.owner}</td>
              <td class="spaces-col-tasks">${s.taskCount}</td>
              <td class="spaces-col-updated">${s.lastUpdated}</td>
              <td class="spaces-col-action">
                <button class="btn-ghost enter-space-btn" data-space-id="${s.id}">
                  进入空间
                </button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  } else {
    // 空状态略
  }
}

function bindMySpacesEvents() {
  // 顶部“创建新的审核空间”按钮
  const createBtn = document.getElementById("createSpaceFromList");
  if (createBtn) {
    createBtn.addEventListener("click", () => {
      // 简单处理：先直接跳到 review-space 页面
      window.location.href = "review-space.html";
    });
  }

  // 事件委托：点击 Space 名称 / 进入空间 → 打开 review-space 页面
  document.addEventListener("click", (event) => {
    const target = event.target;

    // 点击 Space 名称
    if (target.classList.contains("space-link")) {
      const spaceId = target.getAttribute("data-space-id");
      // 带参数跳转（以后后端可以用这个 spaceId）
      window.location.href = `review-space.html?spaceId=${spaceId}`;
    }

    // 点击“进入空间”
    if (target.classList.contains("enter-space-btn")) {
      const spaceId = target.getAttribute("data-space-id");
      window.location.href = `review-space.html?spaceId=${spaceId}`;
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderSpaces();
  bindMySpacesEvents();
});
