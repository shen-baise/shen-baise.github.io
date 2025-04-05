document.addEventListener('DOMContentLoaded', function() {
  // 检测当前主题模式
  const htmlElement = document.querySelector('html');
  let currentTheme = htmlElement.getAttribute('data-theme') || 'light';

  // 设置初始Giscus主题
  setGiscusTheme(currentTheme);

  // 监听主题变化
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'data-theme') {
        const newTheme = htmlElement.getAttribute('data-theme') || 'light';
        setGiscusTheme(newTheme);
      }
    });
  });

  observer.observe(htmlElement, { attributes: true });

  // 设置Giscus主题
  function setGiscusTheme(theme) {
    const giscusTheme = theme === 'dark' ? 'dark_dimmed' : 'light';
    
    // 等待giscus加载
    function sendMessage() {
      const iframe = document.querySelector('iframe.giscus-frame');
      if (!iframe) return;
      
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: giscusTheme } } },
        'https://giscus.app'
      );
    }

    // 如果已经加载，直接发送消息
    if (document.querySelector('iframe.giscus-frame')) {
      sendMessage();
    } else {
      // 等待giscus加载完成
      window.addEventListener('message', event => {
        if (event.origin !== 'https://giscus.app') return;
        if (!(typeof event.data === 'object' && event.data.giscus)) return;
        
        if (event.data.giscus.mounted) {
          sendMessage();
        }
      });
    }
  }
}); 