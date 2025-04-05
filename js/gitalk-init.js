document.addEventListener('DOMContentLoaded', function() {
  // 等待页面加载完成
  window.addEventListener('load', function() {
    // 确保评论容器存在
    const gitalkContainer = document.getElementById('gitalk-container');
    if (!gitalkContainer) {
      // 查找评论区域
      const commentArea = document.getElementById('post-comment');
      if (!commentArea) return;

      // 创建 Gitalk 容器
      const container = document.createElement('div');
      container.id = 'gitalk-container';
      commentArea.appendChild(container);
    }

    // 初始化 Gitalk
    const gitalk = new Gitalk({
      clientID: '8b9dc693d4339bb5a45d',
      clientSecret: '3a0447af6c839e3afca783bbc3b95257f5a9edd4',
      repo: 'shen-baise.github.io',      // 存储评论的仓库
      owner: 'shen-baise',               // 仓库的拥有者
      admin: ['shen-baise'],             // 管理员，可以初始化评论
      id: location.pathname,             // 页面唯一标识
      language: 'zh-CN',                 // 语言设置
      distractionFreeMode: false,        // 是否开启无干扰模式
      createIssueManually: true,         // 是否手动创建 issue
      perPage: 10,                       // 每页评论数
      pagerDirection: 'last'             // 分页方向，last 表示从最新的开始显示
    });

    gitalk.render('gitalk-container');
    console.log('Gitalk 评论系统已初始化');
  });
}); 