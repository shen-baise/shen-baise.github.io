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
      meta: ['nick', 'mail'],
      pageSize: 10,
      visitor: true,
      highlight: true,
      recordIP: true,  // 记录IP地址以便更好管理
      enableQQ: true,
      // 设置管理员邮箱，管理员可以删除任何评论
      master: 'shenbaise19@gmail.com',  // 你的邮箱地址
      // 管理员昵称，可选
      masterTag: '博主',
      // 确保每个页面有独立的评论区
      path: window.location.pathname,
      // 添加管理员标识
      tagMeta: ['博主', '小伙伴', '访客'],
    });
    
    // 添加CSS以美化界面
    const style = document.createElement('style');
    style.textContent = `
      .vnick + .vsys { display: none !important; }
      .vcomment-admin .vnick + .vsys { display: block !important; color: #ff7242; }
      .vtag.master { background-color: #49b1f5 !important; color: #fff !important; }
      .vat { color: #49b1f5 !important; }
      .vcards .vcard .vh .vmeta .vat { color: #ef8b56 !important; }
      .vcards .vcard .vhead .vnick { color: #ef8b56; }
      
      /* 管理员删除按钮样式 */
      .vdelete {
        display: none;  /* 默认隐藏删除按钮 */
        margin-left: 8px;
        color: #f56c6c;
        cursor: pointer;
      }
      
      /* 管理员可见的删除按钮 */
      .vtag.master ~ .vdelete,
      .vcomment-admin .vdelete {
        display: inline-block !important;
      }
    `;
    document.head.appendChild(style);
    
    console.log('Valine 评论系统已初始化，管理员功能已启用');
  });
}); 