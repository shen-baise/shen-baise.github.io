// Microsoft Edge 兼容性脚本

(function() {
  // 检查是否是Edge浏览器
  var isEdgeOrIE = /Edge\/|Trident\/|MSIE /.test(navigator.userAgent);
  
  if (isEdgeOrIE) {
    // 当文档加载完成时执行
    document.addEventListener('DOMContentLoaded', function() {
      // 添加Edge浏览器标识类
      document.body.classList.add('is-edge-browser');
      
      // 处理侧边栏显示问题
      fixSidebar();
      
      // 处理图片加载问题
      fixLazyLoad();
      
      // 处理布局显示问题
      fixLayout();
      
      // 处理动画效果
      fixAnimations();
    });
    
    // 页面完全加载后执行额外修复
    window.addEventListener('load', function() {
      // 确保所有元素都可见
      setTimeout(ensureVisibility, 500);
      
      // 再次修复图片
      fixLazyLoad();
    });
  }
  
  // 修复侧边栏不显示的问题
  function fixSidebar() {
    var sidebar = document.getElementById('aside-content');
    var cardWidgets = document.querySelectorAll('.card-widget');
    
    if (sidebar) {
      sidebar.style.display = 'block';
      sidebar.style.visibility = 'visible';
      sidebar.style.opacity = '1';
    }
    
    cardWidgets.forEach(function(card) {
      card.style.display = 'block';
      card.style.visibility = 'visible';
      card.style.opacity = '1';
    });
  }
  
  // 修复懒加载图片不显示的问题
  function fixLazyLoad() {
    var lazyImages = document.querySelectorAll('img[data-lazy-src]');
    
    lazyImages.forEach(function(img) {
      if (img.getAttribute('data-lazy-src')) {
        img.setAttribute('src', img.getAttribute('data-lazy-src'));
      }
    });
  }
  
  // 修复布局显示问题
  function fixLayout() {
    var layout = document.querySelector('.layout');
    var recentPosts = document.getElementById('recent-posts');
    var asideContent = document.getElementById('aside-content');
    
    if (layout && recentPosts && asideContent) {
      layout.style.display = 'block';
      
      // 设置适当的宽度
      if (window.innerWidth > 768) {
        recentPosts.style.width = '75%';
        recentPosts.style.float = 'left';
        
        asideContent.style.width = '25%';
        asideContent.style.float = 'left';
      }
    }
  }
  
  // 修复动画效果
  function fixAnimations() {
    // 替换可能有问题的CSS动画
    var style = document.createElement('style');
    style.textContent = `
      @-ms-keyframes ccc {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(-360deg); }
      }
      
      .is-edge-browser h1::before,
      .is-edge-browser h2::before,
      .is-edge-browser h3::before,
      .is-edge-browser h4::before,
      .is-edge-browser h5::before,
      .is-edge-browser h6::before {
        animation: ccc 1.6s linear infinite;
      }
    `;
    document.head.appendChild(style);
  }
  
  // 确保所有元素可见
  function ensureVisibility() {
    var allElements = document.querySelectorAll('#aside-content, #aside-content *, .card-widget, .card-widget *, #site-title, #site-subtitle, #nav, #footer, img[data-lazy-src], .recent-post-item, .recent-post-item *');
    
    allElements.forEach(function(el) {
      el.style.display = el.tagName === 'SPAN' ? 'inline-block' : 'block';
      el.style.visibility = 'visible';
      el.style.opacity = '1';
    });
  }
})(); 