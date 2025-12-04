// supabase-client.js

// TODO: 把下面两行改成你自己的项目配置（不要带引号错误）：
const SUPABASE_URL = "https://iuvikcdtguhllpouduyu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dmlrY2R0Z3VobGxwb3VkdXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MTEyNzcsImV4cCI6MjA4MDM4NzI3N30.Ye5Z8lQPefnXY0znP764TMX_vrwROQIzlBxoKflhz_8
";

// 创建一个全局可用的 supabase 客户端
window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
