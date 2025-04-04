// 欢迎弹窗功能
document.addEventListener('DOMContentLoaded', function() {
  // 创建欢迎弹窗
  const welcomePopup = document.createElement('div');
  welcomePopup.id = 'welcome-popup';
  welcomePopup.innerHTML = `
    <h3>欢迎来到深白色的赛博产房!</h3>
    <p>感谢您的访问，希望您在这里能找到有趣的内容~</p>
    <button id="welcome-close">开始探索</button>
  `;

  document.body.appendChild(welcomePopup);

  // 显示欢迎弹窗
  setTimeout(() => {
    welcomePopup.style.display = 'block';
  }, 1000);

  // 关闭欢迎弹窗
  document.getElementById('welcome-close').addEventListener('click', function() {
    welcomePopup.style.display = 'none';
  });

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