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

    // 未登录：跳转 Login
    if (!session || !session.user) {
      window.location.href = '/login.html'; 
      return;
    }

    const user = session.user;

    // 2. 创建 Space
    const newSpacePayload = {
      name: '未命名空间',
      owner_id: user.id,
    };

    const {
      data: spaceData,
      error: spaceError,
    } = await supabase
      .from('spaces')
      .insert(newSpacePayload)
      .select()
      .single();

    if (spaceError || !spaceData) {
      console.error('创建 Space 失败:', spaceError);
      alert('创建空间失败，请稍后再试');
      return;
    }

    const spaceId = spaceData.id;

    // 3. 创建 Task 1
    const newTaskPayload = {
      space_id: spaceId,
      name: 'Task 1',
      status: 'pending',
    };

    const {
      data: taskData,
      error: taskError,
    } = await supabase
      .from('tasks')
      .insert(newTaskPayload)
      .select()
      .single();

    if (taskError || !taskData) {
      console.error('创建 Task 失败:', taskError);
      alert('创建任务失败，请稍后再试');
      return;
    }

    const taskId = taskData.id;

    // 4. 跳转
    window.location.href = `/space/${spaceId}/task/${taskId}`;
  } catch (err) {
    console.error('创建图片审核空间出现异常:', err);
    alert('系统异常，请稍后再试');
  }
}
