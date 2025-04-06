document.addEventListener('DOMContentLoaded', function() {
  // 等待页面完全加载
  window.addEventListener('load', function() {
    // 在 Butterfly 主题中，评论容器的 ID 是 'card-comment'，里面包含具体评论系统的容器
    const commentContainer = document.getElementById('post-comment');
    if (!commentContainer) return;
    
    // 获取当前页面路径作为评论标识
    const currentPath = window.location.pathname || '/';
    console.log('当前页面路径:', currentPath);
    
    // 寻找或创建 Valine 容器
    let valineContainer = document.getElementById('vcomments');
    if (!valineContainer) {
      valineContainer = document.createElement('div');
      valineContainer.id = 'vcomments';
      commentContainer.appendChild(valineContainer);
    }

    // 初始化 Valine
    const valine = new Valine({
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
      // 管理员设置
      admin: 'shenbaise19@gmail.com', // 管理员邮箱
      adminLabel: '博主', // 管理员标签
      // 强制使用当前页面路径
      path: currentPath,
      // 添加评论者标签
      tagMeta: ['博主', '小伙伴', '访客']
    });
    
    // 添加自定义样式
    const style = document.createElement('style');
    style.textContent = `
      /* 隐藏浏览器信息 */
      .vnick + .vsys { display: none !important; }
      
      /* 管理员标识样式 */
      .vat { color: #49b1f5 !important; }
      .vcards .vcard .vh .vmeta .vat { color: #ff7242 !important; }
      
      /* 管理员标签样式 */
      .vcard .vhead .vnick.admin-nick { 
        color: #ff7242 !important;
        font-weight: bold;
      }
      .vcard .vhead .admin-tag {
        display: inline-block;
        background-color: #49b1f5;
        color: white;
        font-size: 0.75em;
        padding: 0 5px;
        margin-left: 5px;
        border-radius: 3px;
      }
      
      /* 删除按钮样式 */
      .v[data-class="v"] .vcard .vhead .vdelete {
        color: #f56c6c !important;
      }
    `;
    document.head.appendChild(style);
    
    // 添加功能增强脚本
    setTimeout(() => {
      // 标记管理员评论
      const comments = document.querySelectorAll('.vcard');
      comments.forEach(comment => {
        const nickElement = comment.querySelector('.vnick');
        const mailElement = comment.querySelector('.vmail');
        
        if (nickElement && mailElement) {
          const mail = mailElement.getAttribute('d-mail');
          if (mail === 'shenbaise19@gmail.com') {
            nickElement.classList.add('admin-nick');
            
            // 添加管理员标签
            const adminTag = document.createElement('span');
            adminTag.className = 'admin-tag';
            adminTag.textContent = '博主';
            nickElement.parentNode.insertBefore(adminTag, nickElement.nextSibling);
          }
        }
      });
      
      console.log('评论区样式和功能增强已应用');
    }, 1000);
    
    console.log('Valine 评论系统已初始化，当前页面评论路径:', currentPath);
  });
}); 