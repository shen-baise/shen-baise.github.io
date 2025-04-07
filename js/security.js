/**
 * 网站安全防护脚本
 * 提供全站XSS防护、CSP策略和安全增强功能
 */

(function() {
  // 在DOM加载完成后执行
  document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 设置内容安全策略 (CSP)
    function setupCSP() {
      // 创建CSP meta标签
      const cspMeta = document.createElement('meta');
      cspMeta.httpEquiv = 'Content-Security-Policy';
      cspMeta.content = "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; " +
                        "script-src 'self' https: 'unsafe-inline' 'unsafe-eval'; " +
                        "style-src 'self' https: 'unsafe-inline'; " +
                        "img-src 'self' https: data: blob:; " +
                        "font-src 'self' https: data:; " +
                        "connect-src 'self' https:; " +
                        "frame-src 'self' https:; " +
                        "object-src 'none';";
      
      // 添加到头部
      document.head.appendChild(cspMeta);
      console.log('CSP策略已应用');
    }
    
    // 2. 全局XSS过滤器
    function sanitizeDOM() {
      // 查找所有用户生成内容区域
      const userContentAreas = document.querySelectorAll('.post-content, .vcontent, .comment-content');
      
      userContentAreas.forEach(area => {
        // 防止潜在XSS执行
        area.setAttribute('data-xss-protected', 'true');
        
        // 查找并净化可能的危险元素
        const scripts = area.querySelectorAll('script');
        scripts.forEach(script => script.remove());
        
        const iframes = area.querySelectorAll('iframe:not([src^="https://www.youtube.com"]):not([src^="https://player.bilibili.com"])');
        iframes.forEach(iframe => iframe.remove());
        
        // 移除所有内联事件处理器
        const allElements = area.querySelectorAll('*');
        allElements.forEach(el => {
          const attributes = el.attributes;
          for (let i = attributes.length - 1; i >= 0; i--) {
            const attrName = attributes[i].name;
            if (attrName.startsWith('on')) {
              el.removeAttribute(attrName);
            }
          }
        });
      });
      
      console.log('DOM内容已净化');
    }
    
    // 3. 处理URL参数
    function sanitizeURLParameters() {
      // 获取URL参数并清理
      const urlParams = new URLSearchParams(window.location.search);
      let paramsModified = false;
      
      // 遍历所有参数检查XSS
      for (const [key, value] of urlParams.entries()) {
        if (/[<>"'&]/.test(value) || /javascript:/i.test(value)) {
          // 删除或编码可疑参数
          urlParams.delete(key);
          paramsModified = true;
        }
      }
      
      // 如果修改了参数，更新URL (使用history.replaceState不会刷新页面)
      if (paramsModified) {
        const newParams = urlParams.toString();
        const newURL = window.location.pathname + (newParams ? `?${newParams}` : '') + window.location.hash;
        window.history.replaceState({}, document.title, newURL);
        console.log('URL参数已净化');
      }
    }
    
    // 4. 添加额外保护措施
    function addSecurityHeaders() {
      // 可以通过HTTP响应头实现更好的安全性，但这需要服务器配置
      // 这里通过JavaScript模拟一些保护行为
      
      // 限制iframes嵌入 (X-Frame-Options模拟)
      if (window !== window.top) {
        // 如果当前页面被嵌入iframe中，检查来源
        const allowedOrigins = [
          'https://shen-baise.github.io',
          // 添加其他允许的来源
        ];
        
        const parentOrigin = document.referrer;
        let isAllowed = false;
        
        for (const origin of allowedOrigins) {
          if (parentOrigin.startsWith(origin)) {
            isAllowed = true;
            break;
          }
        }
        
        if (!isAllowed) {
          // 如果父页面不在允许列表中，重定向到顶级窗口
          window.top.location.href = window.location.href;
        }
      }
    }
    
    // 5. 设置XSS审计器 (监听DOM变化)
    function setupXSSAuditor() {
      // 创建一个MutationObserver来监视DOM变化
      const observer = new MutationObserver(function(mutations) {
        let needsSanitize = false;
        
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // 检查是否添加了新内容
            needsSanitize = true;
          } else if (mutation.type === 'attributes') {
            // 检查属性变化，特别是事件处理器
            const attrName = mutation.attributeName;
            if (attrName && attrName.startsWith('on')) {
              const element = mutation.target;
              element.removeAttribute(attrName);
            }
          }
        });
        
        // 如果检测到内容变化，重新净化
        if (needsSanitize) {
          sanitizeDOM();
        }
      });
      
      // 开始观察整个文档的变化
      observer.observe(document.body, {
        childList: true,
        attributes: true,
        subtree: true,
        attributeFilter: ['onclick', 'onload', 'onmouseover', 'onerror', 'onscroll']
      });
      
      console.log('XSS审计器已启动');
    }
    
    // 执行所有安全措施
    setupCSP();
    sanitizeDOM();
    sanitizeURLParameters();
    addSecurityHeaders();
    setupXSSAuditor();
    
    console.log('网站安全防护已启用');
  });
  
  // 页面加载完成后再次运行安全检查
  window.addEventListener('load', function() {
    // 延迟执行，确保所有动态内容已加载
    setTimeout(function() {
      // 查找所有用户生成内容区域并再次净化
      const userContentAreas = document.querySelectorAll('.post-content, .vcontent, .comment-content');
      
      userContentAreas.forEach(area => {
        // 防止可能的XSS攻击
        const scripts = area.querySelectorAll('script');
        scripts.forEach(script => script.remove());
        
        // 替换所有可能有害的链接
        const links = area.querySelectorAll('a[href^="javascript:"]');
        links.forEach(link => link.href = '#');
      });
      
      console.log('页面完全加载后的安全检查已完成');
    }, 1000);
  });
})(); 