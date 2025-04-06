// 导航栏滚动隐藏效果
document.addEventListener('DOMContentLoaded', function() {
  const nav = document.getElementById('nav');
  let lastScrollTop = 0;
  let scrollThreshold = 100; // 滚动阈值，避免轻微滚动时频繁切换

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 如果在页面顶部，始终显示导航栏
    if (scrollTop <= 0) {
      nav.classList.remove('nav-hidden');
      nav.classList.add('nav-visible');
      return;
    }
    
    // 向下滚动时隐藏导航栏
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
      if (!nav.classList.contains('nav-hidden')) {
        nav.classList.remove('nav-visible');
        nav.classList.add('nav-hidden');
      }
    } 
    // 向上滚动时显示导航栏
    else if (scrollTop < lastScrollTop) {
      if (!nav.classList.contains('nav-visible')) {
        nav.classList.remove('nav-hidden');
        nav.classList.add('nav-visible');
      }
    }
    
    lastScrollTop = scrollTop;
  }

  // 节流函数，避免频繁触发滚动事件
  function throttle(callback, delay) {
    let previousCall = new Date().getTime();
    return function() {
      const time = new Date().getTime();
      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  // 添加滚动事件监听器
  window.addEventListener('scroll', throttle(handleScroll, 100));
}); 