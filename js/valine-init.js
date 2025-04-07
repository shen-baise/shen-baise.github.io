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

    // 创建XSS过滤函数
    function xssFilter(content) {
      if (!content) return '';
      
      // 创建一个安全的HTML过滤器
      return content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .replace(/`/g, '&#x60;')
        .replace(/(script|iframe|onerror|onload|onclick|onmouseover)/gi, function(match) {
          return match.replace(/[a-zA-Z]/g, function(c) {
            return '&#' + c.charCodeAt(0) + ';';
          });
        });
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
      tagMeta: ['博主', '小伙伴', '访客'],
      // 安全设置
      commentFilter: function(comment) {
        // 设置危险关键词过滤
        const dangerousPatterns = [
          /<script/i, 
          /<iframe/i, 
          /javascript:/i, 
          /onerror=/i, 
          /onclick=/i, 
          /onload=/i, 
          /onmouseover=/i,
          /alert\(/i,
          /document\.cookie/i
        ];
        
        // 检查评论是否包含危险内容
        for (const pattern of dangerousPatterns) {
          if (pattern.test(comment)) {
            console.warn('检测到可能的XSS攻击，评论已被拦截');
            // 可以选择直接拒绝，或者转义后接受
            // return false; // 拒绝评论
            return xssFilter(comment); // 转义后接受
          }
        }
        
        // 所有评论都应该经过最基本的HTML转义
        return xssFilter(comment);
      }
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
    
    // 处理现有评论中的可能XSS内容
    function sanitizeExistingComments() {
      const commentContents = document.querySelectorAll('.vcontent');
      commentContents.forEach(content => {
        // 使用innerHTML获取原始内容，然后使用textContent设置纯文本内容
        // 这会去除所有HTML标签，避免XSS执行
        const originalText = content.innerHTML;
        content.textContent = originalText;
      });
    }
    
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
      
      // 清理现有评论中的XSS
      sanitizeExistingComments();
      
      console.log('评论区样式和功能增强已应用，XSS防护已启用');
    }, 1000);
    
    // 监听DOM变化，处理新加载的评论
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          // 检查新添加的节点是否包含评论
          mutation.addedNodes.forEach(function(node) {
            if (node.classList && node.classList.contains('vcard')) {
              // 找到新评论的内容区域并净化
              const contentArea = node.querySelector('.vcontent');
              if (contentArea) {
                const originalText = contentArea.innerHTML;
                contentArea.textContent = originalText;
              }
            }
          });
        }
      });
    });
    
    // 开始观察评论区的变化
    observer.observe(commentContainer, { childList: true, subtree: true });
    
    console.log('Valine 评论系统已初始化，当前页面评论路径:', currentPath);
  });
}); 