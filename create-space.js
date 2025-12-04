// /js/create-space.js

const supabase = window.supabaseClient;
const createSpaceBtn = document.getElementById('create-space-btn');

if (createSpaceBtn && supabase) {
  createSpaceBtn.addEventListener('click', handleCreateSpaceClick);
}

async function handleCreateSpaceClick() {
  try {
    // 1. 检查登录状态
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('获取登录状态失败:', sessionError);
      alert('系统错误，请稍后再试');
      return;
    }

    // 未登录：跳转到 Login 页面
    if (!session || !session.user) {
      window.location.href = '/login.html'; // 根据你的实际登录页路径改
      return;
    }

    const user = session.user;

    // 2. 创建 Space（根据你数据库的字段来改）
    const newSpacePayload = {
      name: '未命名空间',       // 或者可以先写死 / 弹窗填写
      owner_id: user.id,       // 你 spaces 表里如果是 owner_uuid / owner 记得改列名
      // 其他列：比如 created_at 会用默认值就不用传
    };

    const {
      data: spaceData,
      error: spaceError,
    } = await supabase
      .from('spaces')           // 你的表名，如果叫 space 就改成 'space'
      .insert(newSpacePayload)
      .select()
      .single();

    if (spaceError || !spaceData) {
      console.error('创建 Space 失败:', spaceError);
      alert('创建空间失败，请稍后再试');
      return;
    }

    const spaceId = spaceData.id; // 如果主键叫 space_id 就改成 spaceData.space_id

    // 3. 创建 Task 1
    const newTaskPayload = {
      space_id: spaceId,      // 外键指向刚创建的 space
      name: 'Task 1',         // 或者 "首次审核任务" 之类
      status: 'pending',      // 看你表里有没有这个字段
    };

    const {
      data: taskData,
      error: taskError,
    } = await supabase
      .from('tasks')          // 你的任务表名
      .insert(newTaskPayload)
      .select()
      .single();

    if (taskError || !taskData) {
      console.error('创建 Task 失败:', taskError);
      alert('创建任务失败，请稍后再试');
      return;
    }

    const taskId = taskData.id; // 如果列名是 task_id 就改一下

    // 4. 跳转到 /space/[spaceId]/task/[taskId]
    const targetUrl = `/space/${spaceId}/task/${taskId}`;
    window.location.href = targetUrl;
  } catch (err) {
    console.error('创建图片审核空间时出现异常:', err);
    alert('系统异常，请稍后再试');
  }
}
/js/create-space.js/js/create-space.js
