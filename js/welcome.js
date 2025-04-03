// 欢迎弹窗功能
document.addEventListener('DOMContentLoaded', function() {
  // 创建欢迎弹窗
  if (!localStorage.getItem('welcomeShown')) {
    // 创建欢迎弹窗元素
    const welcomeDiv = document.createElement('div');
    welcomeDiv.id = 'welcome-popup';
    welcomeDiv.innerHTML = `
      <h3>欢迎来到深白色的赛博产房！</h3>
      <p>假如再也见不到你</p>
      <p>祝你早安 午安 晚安</p>
      <button id="welcome-close">我知道了</button>
    `;
    document.body.appendChild(welcomeDiv);
    
    // 显示弹窗
    setTimeout(function() {
      welcomeDiv.style.display = 'block';
    }, 1000);
    
    // 关闭按钮事件
    document.getElementById('welcome-close').addEventListener('click', function() {
      welcomeDiv.style.display = 'none';
      localStorage.setItem('welcomeShown', 'true');
    });
    
    // 10秒后自动关闭
    setTimeout(function() {
      welcomeDiv.style.display = 'none';
    }, 10000);
  }
}); 