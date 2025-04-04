// 欢迎弹窗功能
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否已显示过欢迎弹窗
  if (!localStorage.getItem('welcomeShown')) {
    // 创建欢迎弹窗元素
    const welcomePopup = document.createElement('div');
    welcomePopup.id = 'welcome-popup';
    welcomePopup.innerHTML = `
      <h3>欢迎来到我的博客!</h3>
      <p>感谢您访问我的个人空间，希望您能在这里找到有用的信息和愉快的阅读体验。</p>
      <p>本站点持续更新中，如有任何建议，欢迎在留言板留言~</p>
      <button id="welcome-close">我知道了</button>
    `;
    
    // 添加到页面中
    document.body.appendChild(welcomePopup);
    
    // 显示弹窗
    setTimeout(() => {
      welcomePopup.style.display = 'block';
    }, 1000);
    
    // 关闭按钮事件
    document.getElementById('welcome-close').addEventListener('click', function() {
      welcomePopup.style.display = 'none';
      
      // 标记已显示过欢迎弹窗
      localStorage.setItem('welcomeShown', 'true');
    });
    
    // 只在首页显示
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
      welcomePopup.style.display = 'none';
    }
  }

  // 添加页面滚动特效
  function addScrollAnimation() {
    const postItems = document.querySelectorAll('.recent-post-item, .card-widget');
    
    // 初始隐藏所有元素
    postItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 滚动时显示元素
    function revealOnScroll() {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      postItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < windowHeight - revealPoint) {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }
      });
    }
    
    // 初始检查
    revealOnScroll();
    
    // 监听滚动事件
    window.addEventListener('scroll', revealOnScroll);
  }
  
  // 启动滚动动画
  addScrollAnimation();
  
  // 添加鼠标悬停图片放大效果
  const postCovers = document.querySelectorAll('.post-cover img');
  postCovers.forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.05)';
      img.style.transition = 'transform 0.6s ease';
    });
    
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
}); 