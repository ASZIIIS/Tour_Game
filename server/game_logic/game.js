const Players = require('./player'); // 导入玩家类

// 对局逻辑管理类
class Game {
    constructor(player_names, player_types, map, card_packages) {
        /*
        参数列表：
        player_names: 一个数组，记录每个玩家的名称
        player_types: 一个数组，标记需要创建的玩家是真人玩家还是ai玩家
        map: 对局地图的文件夹路径
        card_packages: 一个数组，是各个需要加载的卡牌包的文件夹路径
        */
        //TODO: load map
        //TODO: load card packages
        if(player_names.length!=player_types.length){
            this.logErrorToFile(new Error("玩家名称数量与玩家数量不一致"))
        }
        this.players=new Array(player_names.length)
        for(index in player_types){
            if(player_types[index]){
                this.players[index]=new Players.AIPlayer(player_names[index])
            }else{
                this.players[index]=new Players.RealPlayer(player_names[index])
            }
        }
        this.currentPlayerIndex = 0; // 当前玩家索引
        this.currentPhase = 0; // 当前阶段
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

    logErrorToFile(error, info=null) {
        const logMessage = `[${new Date().toISOString()}] 错误: ${error.stack}\n`;
        fs.appendFileSync('error_log.txt', logMessage, 'utf8'); // 异步追加日志到文件
        console.log("异常信息已记录到 error_log.txt");
    }
}

// 示例
const players = [new Player("玩家1"), new Player("玩家2"), new Player("玩家3")];
const game = new Game(players);
game.startGame();

// 模拟触发玩家结束操作（供前端调用的接口）
setTimeout(() => game.endActionPhase(), 2000); // 2秒后模拟结束操作
