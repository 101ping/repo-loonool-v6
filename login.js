// 读取 ?next=xxx，决定登录后跳去哪
function getNextUrl() {
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");
  // 默认回到 My Spaces（作为入口页）
  return next || "my-spaces.html";
}

window.addEventListener("DOMContentLoaded", () => {
  const loginTab = document.getElementById("loginTab");
  const signupTab = document.getElementById("signupTab");
  const titleEl = document.getElementById("authTitle");
  const subtitleEl = document.getElementById("authSubtitle");
  const form = document.getElementById("authForm");
  const submitBtn = document.getElementById("authSubmit");
  const goSignupInline = document.getElementById("goSignupInline");

  if (!loginTab || !signupTab || !form) return;

  function switchMode(mode) {
    form.dataset.mode = mode;

    if (mode === "login") {
      loginTab.classList.add("auth-tab-active");
      signupTab.classList.remove("auth-tab-active");
      titleEl.textContent = "登录你的图片审核空间";
      subtitleEl.textContent =
        "输入邮箱和密码登录。如果你还没有账号，可以切换到「注册」创建新的空间。";
      submitBtn.textContent = "登录";
    } else {
      signupTab.classList.add("auth-tab-active");
      loginTab.classList.remove("auth-tab-active");
      titleEl.textContent = "注册并创建你的图片审核空间";
      subtitleEl.textContent =
        "使用邮箱注册一个新账号。完成后你可以创建审核空间、上传图片并生成证据链。";
      submitBtn.textContent = "注册并继续";
    }
  }

  loginTab.addEventListener("click", () => switchMode("login"));
  signupTab.addEventListener("click", () => switchMode("signup"));
  goSignupInline.addEventListener("click", () => switchMode("signup"));

  // 提交表单（V1：不做真实校验，直接当成功）
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const mode = form.dataset.mode || "login";
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) return;

    // 这里可以简单在 localStorage 标记「已登录」
    try {
      localStorage.setItem("loonoolIsLoggedIn", "true");
      localStorage.setItem("loonoolUserEmail", String(email));
    } catch (e) {
      // 本地 file:// 有时会失败，可以忽略
    }

    if (mode === "signup") {
      // TODO：将来在这里调用后端 API 创建用户 & 默认 Space
      // 例如：POST /api/signup，然后创建一个「我的第一个空间」
    }

    const nextUrl = getNextUrl();
    window.location.href = nextUrl;
  });
});
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
