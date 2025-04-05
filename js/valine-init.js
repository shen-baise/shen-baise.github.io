document.addEventListener('DOMContentLoaded', function() {
  // 确保评论区存在
  const commentArea = document.getElementById('vcomment');
  if (!commentArea) return;

  // 初始化Valine
  new Valine({
    el: '#vcomment',
    appId: 'bG1dEXLOsW2LOuO6upOQ7woZ-MdYXbMMI',
    appKey: 'aSLbQwrdg1sKtStcw76WkBXQ',
    serverURLs: 'https://bg1dexlo.api.lncldglobal.com',
    placeholder: '欢迎留下你的评论！',
    avatar: 'monsterid',
    meta: ['nick', 'mail', 'link'],
    pageSize: 10,
    visitor: true,
    highlight: true,
    recordIP: true,
    enableQQ: true
  });
}); 