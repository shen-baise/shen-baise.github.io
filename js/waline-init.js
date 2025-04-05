document.addEventListener('DOMContentLoaded', function() {
  // 等待页面加载完成
  window.addEventListener('load', function() {
    const commentContainer = document.getElementById('waline');
    if (!commentContainer) {
      console.warn('Waline 容器未找到');
      return;
    }

    // 初始化 Waline
    Waline.init({
      el: '#waline',
      serverURL: 'https://comment.deepwhite.work', // 你的 Waline 服务端地址
      lang: 'zh-CN',
      dark: 'auto',
      pageview: true,
      comment: true,
      path: window.location.pathname,
      locale: {
        placeholder: '欢迎留下你的评论！'
      },
      imageUploader: false,
      login: 'enable'
    });
    
    console.log('Waline 评论系统已初始化');
  });
}); 