const createSpaceBtn = document.getElementById("createSpaceBtn");

if (createSpaceBtn) {
  createSpaceBtn.addEventListener("click", () => {
    // 这里只负责视觉动效，实际“未登录跳转登录 / 已登录创建空间”
    // 交给以后接后端时处理，这里不写逻辑。
    createSpaceBtn.classList.remove("btn-pulse");
    void createSpaceBtn.offsetWidth; // 强制重绘，保证动画每次都触发
    createSpaceBtn.classList.add("btn-pulse");
  });
}
