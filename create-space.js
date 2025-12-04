// 创建空间.js

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("create-space-btn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    console.log("点击：创建图片审核空间");

    // 1️⃣ 检查登录状态
    try {
      const {
        data: { user },
        error: userError,
      } = await window.supabaseClient.auth.getUser();

      if (userError) {
        console.error("获取用户失败：", userError);
      }

      if (!user) {
        // 未登录，跳转登录页，带上 next 参数
        const next = encodeURIComponent("my-spaces.html");
        window.location.href = `login.html?next=${next}`;
        return;
      }

      console.log("当前用户：", user.id);

      // 2️⃣ 创建 Space（根据你数据库实际字段调整）
      const { data: spaceRows, error: spaceError } = await window.supabaseClient
        .from("spaces")
        .insert([
          {
            // 常见命名 owner_id / user_id / created_by，按你的表字段改
            owner_id: user.id,
            name: "未命名空间",
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .limit(1);

      if (spaceError || !spaceRows || spaceRows.length === 0) {
        console.error("创建 Space 失败：", spaceError);
        alert("创建空间失败，请稍后重试");
        return;
      }

      const space = spaceRows[0];
      console.log("Space 创建成功：", space);

      // 3️⃣ 创建 Task 1（同样按你的表结构调整字段名）
      const { data: taskRows, error: taskError } = await window.supabaseClient
        .from("tasks")
        .insert([
          {
            space_id: space.id,
            name: "任务 1",
            status: "pending",
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .limit(1);

      if (taskError || !taskRows || taskRows.length === 0) {
        console.error("创建 Task 失败：", taskError);
        alert("创建任务失败，请稍后重试");
        return;
      }

      const task = taskRows[0];
      console.log("Task 创建成功：", task);

      // 4️⃣ 跳转到空间页面
      // 你真实的路由如果是 /space/[spaceId]/task/[taskId].html 就改成相应形式
      const targetUrl = `space.html?spaceId=${space.id}&taskId=${task.id}`;
      window.location.href = targetUrl;
    } catch (e) {
      console.error("创建空间 / 任务过程中出错：", e);
      alert("操作失败，请稍后重试。");
    }
  });
});
