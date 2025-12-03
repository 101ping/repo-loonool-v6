document.getElementById("createSpaceBtn").addEventListener("click", () => {
  const loggedIn = false; // TODO: 替换为真实登录状态

  if (!loggedIn) {
    window.location.href = "/login";
  } else {
    window.location.href = "/review-space";
  }
});
