import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* 顶栏 */}
      <header className="top-bar">
        <button className="btn">设置</button>
        <button className="btn">退出</button>
      </header>

      {/* 主体区域 */}
      <div className="main-content">
        {/* 左边栏 - 玩家简略信息 */}
        <aside className="left-sidebar">
          <h3>玩家列表</h3>
          <ul>
            <li>玩家1</li>
            <li>玩家2</li>
            <li>玩家3</li>
          </ul>
        </aside>

        {/* 长地图区域 */}
        <section className="map-container">
          <div className="map-content">
            <h1>地图</h1>
            <p>这是一个可以滚动的长地图区域。</p>
          </div>
        </section>

        {/* 右侧栏 - 玩家详细信息 */}
        <aside className="right-sidebar">
          <h3>玩家信息</h3>
          <p>姓名: 玩家1</p>
          <p>分数: 100</p>
        </aside>
      </div>

      {/* 下方栏 - 手牌区 */}
      <footer className="bottom-bar">
        <h3>手牌</h3>
        <div className="hand-cards">
          <div className="card">卡牌1</div>
          <div className="card">卡牌2</div>
          <div className="card">卡牌3</div>
        </div>
      </footer>
    </div>
  );
}

export default App;