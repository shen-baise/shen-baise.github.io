document.addEventListener('DOMContentLoaded', function() {
  // 移除不需要的菜单项
  const menuItems = document.querySelectorAll('.menus_items .menus_item');
  
  // 获取所有菜单项文本
  for (let i = 0; i < menuItems.length; i++) {
    let text = menuItems[i].textContent.trim();
    
    // 隐藏英文菜单项
    if (text === 'Home' || text === 'Archives' || text === 'Tags' || 
        text === 'Categories' || text === 'Link') {
      menuItems[i].style.display = 'none';
    }
  }
  
  // 修改赞赏模块样式
  const rewardButton = document.querySelector('.reward-button');
  if (rewardButton) {
    rewardButton.innerHTML = '<i class="fas fa-qrcode"></i> 赞赏支持';
  }
}); 