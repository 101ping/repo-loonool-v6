// 监听按钮点击事件
document.getElementById('create-space-btn').addEventListener('click', function() {
    // 假设当前用户未登录
    let loggedIn = false;

    if (loggedIn) {
        // 如果已登录，跳转到审核空间页面
        window.location.href = '/review-space'; // 假设这是审核空间页面的路径
    } else {
        // 如果未登录，跳转到登录页面
        window.location.href = '/login'; // 登录页面路径
    }
});
