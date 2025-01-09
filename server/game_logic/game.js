// game_logic.js 文件
const Player = require('./player'); // 导入玩家类

// 对局逻辑管理类
class Game {
    constructor(players) {
        this.players = players; // 玩家列表
        this.currentPlayerIndex = 0; // 当前玩家索引
        this.currentPhase = "start"; // 当前阶段
    }

    // 开始游戏逻辑循环
    startGame() {
        console.log("游戏开始");
        this.startTurn();
    }

    // 开始当前玩家的回合
    startTurn() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        console.log(`现在是 ${currentPlayer.name} 的回合`);
        this.startPhase();
    }

    // 回合开始阶段
    startPhase() {
        console.log("回合开始阶段");
        this.executeEmptyFunction();
        this.startActionPhase();
    }

    // 操作阶段
    startActionPhase() {
        console.log("进入操作阶段");
        this.executeEmptyFunction();

        // 等待玩家结束操作的接口
        console.log("等待玩家结束操作");
        this.endActionPhase = () => {
            console.log("玩家结束操作");
            this.startEndPhase();
        };
    }

    // 回合结束阶段
    startEndPhase() {
        console.log("回合结束阶段");
        this.executeEmptyFunction();
        this.nextPlayer();
    }

    // 切换到下一个玩家
    nextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.startTurn();
    }

    // 空函数，用于后续功能填充
    executeEmptyFunction() {
        // 空实现
    }
}

// 示例
const players = [new Player("玩家1"), new Player("玩家2"), new Player("玩家3")];
const game = new Game(players);
game.startGame();

// 模拟触发玩家结束操作（供前端调用的接口）
setTimeout(() => game.endActionPhase(), 2000); // 2秒后模拟结束操作
