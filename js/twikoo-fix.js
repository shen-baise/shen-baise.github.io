// 修复Twikoo评论系统
document.addEventListener('DOMContentLoaded', function() {
  // 确保评论区存在
  const commentArea = document.getElementById('twikoo');
  if (!commentArea) return;
  
  // 在页面完全加载后重新初始化Twikoo
  window.addEventListener('load', function() {
    // 如果twikoo已经初始化但出现问题，先清除
    if (window.tk) {
      commentArea.innerHTML = '';
    }
    
    // 重新加载twikoo脚本
    const twikooScript = document.createElement('script');
    twikooScript.src = 'https://cdn.staticfile.org/twikoo/1.6.8/twikoo.all.min.js';
    twikooScript.onload = function() {
      // 初始化twikoo
      window.twikoo.init({
        envId: 'https://twikoo.deepwhite.work/',
        el: '#twikoo',
        // 添加额外选项使其更可靠
        path: window.location.pathname,
        loading: '评论加载中...'
      });
    };
    document.body.appendChild(twikooScript);
  });
}); 