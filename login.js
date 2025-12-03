// 简单占位：阻止表单刷新页面，并在错误区域填一行提示文字
window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".auth-form");
  const errorBox = document.getElementById("authError");

  if (!form || !errorBox) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // 这里只是 V1 占位，不做真实校验
    errorBox.textContent = "登录逻辑尚未接入（V1 仅做 UI 占位）。";
  });
});
