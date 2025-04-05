// 网站运行时间计算
document.addEventListener('DOMContentLoaded', function() {
  const cdnSpan = document.getElementById('cdn');
  if (!cdnSpan) return;
  
  // 网站创建时间
  const startDate = new Date('2023-01-01'); // 替换为你的网站创建日期
  
  function updateRuntime() {
    const now = new Date();
    const timeDiff = now - startDate;
    
    // 计算时间差
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    // 更新显示
    cdnSpan.innerHTML = 'Blog up for ' + days + ' days ' + hours + ' hours ' + minutes + ' mins';
  }
  
  // 初始更新
  updateRuntime();
  
  // 每分钟更新一次
  setInterval(updateRuntime, 60000);
}); 