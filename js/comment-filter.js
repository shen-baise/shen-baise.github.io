/**
 * 评论过滤工具
 * 用于防止XSS攻击和过滤不良内容
 */

(function() {
  // 在Valine评论系统初始化后执行
  document.addEventListener('DOMContentLoaded', function() {
    // 等待Valine初始化
    const checkValineInterval = setInterval(function() {
      const commentForm = document.querySelector('.vwrap');
      if (commentForm) {
        clearInterval(checkValineInterval);
        setupCommentFilter();
      }
    }, 500);

    function setupCommentFilter() {
      // 找到评论表单和提交按钮
      const commentForm = document.querySelector('.vwrap');
      const submitBtn = commentForm.querySelector('.vsubmit');
      const textareaEl = commentForm.querySelector('.veditor');
      
      if (!submitBtn || !textareaEl) return;
      
      // 添加表单提交拦截
      const originalSubmitEvent = submitBtn.onclick;
      
      submitBtn.onclick = function(e) {
        // 获取评论内容
        const commentText = textareaEl.value;
        
        // 检查是否包含XSS攻击内容
        if (containsXSS(commentText)) {
          e.preventDefault();
          e.stopPropagation();
          
          // 显示警告并禁止提交
          showWarning('评论包含不安全内容，已被系统拦截！');
          return false;
        }
        
        // 检查是否包含敏感词
        if (containsSensitiveWords(commentText)) {
          e.preventDefault();
          e.stopPropagation();
          
          // 显示警告
          showWarning('评论包含敏感内容，请修改后重新提交！');
          return false;
        }
        
        // 继续原始提交流程
        if (typeof originalSubmitEvent === 'function') {
          return originalSubmitEvent.call(this, e);
        }
        return true;
      };
      
      console.log('评论过滤系统已启用');
    }
    
    // 检查内容是否包含XSS攻击代码
    function containsXSS(text) {
      if (!text) return false;
      
      const xssPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
        /javascript:/gi,
        /onerror\s*=\s*/gi,
        /onclick\s*=\s*/gi,
        /onload\s*=\s*/gi,
        /onmouseover\s*=\s*/gi,
        /on\w+\s*=\s*/gi,
        /alert\s*\(/gi,
        /document\.cookie/gi,
        /document\.write/gi,
        /eval\s*\(/gi,
        /setTimeout\s*\(/gi,
        /setInterval\s*\(/gi,
        /location\s*=/gi
      ];
      
      for (const pattern of xssPatterns) {
        if (pattern.test(text)) {
          console.warn('检测到XSS攻击代码:', text.match(pattern)[0]);
          return true;
        }
      }
      
      return false;
    }
    
    // 检查内容是否包含敏感词
    function containsSensitiveWords(text) {
      if (!text) return false;
      
      // 定义敏感词列表 (移除政治相关词汇，保留明显的侮辱性词汇)
      const sensitiveWords = [
        '赌博', '博彩', 
        '操你', '妈的',
        'fuck', 'shit', 'bitch'
      ];
      
      // 转换为小写进行检查
      const lowerText = text.toLowerCase();
      
      for (const word of sensitiveWords) {
        if (lowerText.includes(word.toLowerCase())) {
          console.warn('检测到敏感词:', word);
          return true;
        }
      }
      
      return false;
    }
    
    // 监听评论加载完成
    const checkCommentsLoaded = setInterval(function() {
      const commentsList = document.querySelector('.vcards');
      if (commentsList && commentsList.children.length > 0) {
        clearInterval(checkCommentsLoaded);
        allowNormalContent();
      }
    }, 1000);
    
    // 允许表情和正常内容显示
    function allowNormalContent() {
      // 查找所有评论内容
      const comments = document.querySelectorAll('.vcontent');
      
      comments.forEach(function(comment) {
        // 恢复图片表情显示
        let content = comment.innerHTML;
        
        // 允许图片标签显示
        content = content.replace(/&lt;img/g, '<img')
                        .replace(/&gt;/g, '>')
                        .replace(/&amp;/g, '&')
                        .replace(/data-disabled-event=/g, 'alt=');
        
        // 确保图片标签中的属性正确显示
        content = content.replace(/src=&quot;([^&]*)&quot;/g, 'src="$1"')
                        .replace(/alt=&quot;([^&]*)&quot;/g, 'alt="$1"')
                        .replace(/class=&quot;([^&]*)&quot;/g, 'class="$1"');
        
        comment.innerHTML = content;
      });
    }
    
    // 显示警告提示
    function showWarning(message) {
      // 如果页面有Toastr，优先使用
      if (typeof toastr !== 'undefined') {
        toastr.error(message, '安全警告');
        return;
      }
      
      // 否则使用自定义警告框
      const warningEl = document.createElement('div');
      warningEl.className = 'comment-warning';
      warningEl.innerHTML = `
        <div class="comment-warning-inner">
          <span class="comment-warning-icon">⚠️</span>
          <span class="comment-warning-text">${message}</span>
          <span class="comment-warning-close" onclick="this.parentNode.parentNode.remove()">×</span>
        </div>
      `;
      
      // 添加样式
      const style = document.createElement('style');
      style.textContent = `
        .comment-warning {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #fff8e1;
          border-left: 4px solid #ffc107;
          padding: 10px 15px;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          z-index: 9999;
          animation: slide-in 0.3s ease-out forwards;
        }
        .comment-warning-inner {
          display: flex;
          align-items: center;
        }
        .comment-warning-icon {
          margin-right: 10px;
          font-size: 20px;
        }
        .comment-warning-text {
          flex: 1;
          color: #d32f2f;
          font-weight: bold;
        }
        .comment-warning-close {
          margin-left: 10px;
          cursor: pointer;
          font-size: 20px;
          color: #757575;
        }
        @keyframes slide-in {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
      
      // 添加到页面
      document.body.appendChild(warningEl);
      
      // 自动关闭
      setTimeout(function() {
        if (warningEl.parentNode) {
          warningEl.classList.add('fade-out');
          setTimeout(function() {
            if (warningEl.parentNode) {
              warningEl.parentNode.removeChild(warningEl);
            }
          }, 300);
        }
      }, 5000);
    }
  });
})(); 