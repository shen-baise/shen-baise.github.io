document.addEventListener('DOMContentLoaded', function() {
  // 等待页面完全加载
  window.addEventListener('load', function() {
    // 在 Butterfly 主题中，评论容器的 ID 是 'card-comment'，里面包含具体评论系统的容器
    const commentContainer = document.getElementById('post-comment');
    if (!commentContainer) return;
    
    // 寻找或创建 Valine 容器
    let valineContainer = document.getElementById('vcomments');
    if (!valineContainer) {
      valineContainer = document.createElement('div');
      valineContainer.id = 'vcomments';
      commentContainer.appendChild(valineContainer);
    }

    // 初始化 Valine
    new Valine({
      el: '#vcomments',
      appId: 'wnkwX1IFdiXC2FA8BVJlOzp5-gzGzoHsz',
      appKey: '7KYI9keQ3D2x8kWWEoMJ9Pkq',
      serverURLs: 'https://wnkwx1if.lc-cn-n1-shared.com',
      placeholder: '嘿，别忘了留下你的小脚印哦！',
      avatar: 'monsterid',
      meta: ['nick', 'mail', 'link'],
      pageSize: 10,
      visitor: true,
      highlight: true,
      recordIP: true,
      enableQQ: true,
      path: window.location.pathname
    });
    
    console.log('Valine 评论系统已初始化');
  });
}); 