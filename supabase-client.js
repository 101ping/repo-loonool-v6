// supabase-client.js

// TODO: 把下面两行改成你自己的项目配置（不要带引号错误）：
const SUPABASE_URL = "https://你的-project-url.supabase.co";
const SUPABASE_ANON_KEY = "你的-anon-public-key";

// 创建一个全局可用的 supabase 客户端
window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
