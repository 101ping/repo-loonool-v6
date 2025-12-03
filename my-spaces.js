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
