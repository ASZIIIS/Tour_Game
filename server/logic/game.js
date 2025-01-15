const Players = require('./player'); // 导入玩家类

// 对局逻辑管理类
class Game {
    constructor(players, map, card_pools) {
        /*
        参数列表：
        players: 一个数组，记录每个玩家
        map: 对局地图
        card_pools: 一个数组，是各个卡池
        */
        this.map=map;
        this.cardpools=card_pools;
        this.players=players;
        this.currentPlayerIndex = 0; // 当前玩家索引
        this.currentPlayer=this.players[this.currentPlayerIndex];
        this.currentDice=undefined; //全局控制骰子
        this.playing=true;//对局是否在进行中
        this.eventObservers = new Map();
        this.cardpools=new Map();
    }

    static logErrorToFile(error, log_path, info=null) {
        const logMessage = `[${new Date().toISOString()}] 错误: ${error.stack}\n`;
        fs.appendFileSync(log_path, logMessage, 'utf8'); // 异步追加日志到文件
        console.log("异常信息已记录到 error_log.txt");
    }

    startGame(){
        while(this.playing){
            this.goTurn(this.currentPlayer);
            this.currentPlayerIndex=(this.currentPlayerIndex+1)%this.players.length;
            this.currentPlayer=this.players[this.currentPlayerIndex];
        }
    }

    //执行回合
    goTurn(player){

    }
    
    // 注册观察者
    registerObserver(event, observer) {
        // // 注册观察者并获取唯一标识
        // const observerId1 = game.registerObserver("testEvent", (data) => {
        //     console.log(`观察者1: ${data.message}`);
        // });
        if (!this.eventObservers.has(event)) {
            this.eventObservers.set(event, []);
        }
        const observerObj = { id: Symbol(), callback: observer };
        this.eventObservers.get(event).push(observerObj);
        return observerObj.id;
    }
    
    // 注销观察者
    removeObserver(event, observerId) {
        if (this.eventObservers.has(event)) {
            this.eventObservers.set(event, this.eventObservers.get(event).filter(obs => obs.id !== observerId));
        }
    }
    
    // 触发事件
    triggerEvent(event, data) {
        if (this.eventObservers.has(event)) {
            for (const observer of this.eventObservers.get(event)) {
                observer.callback(data);
            }
        }
    }
    
    //扔骰子
    rollDice(min, max, player){
        this.triggerEvent("rollDice", player);
        this.currentDice=Math.floor(Math.random() * (max - min + 1)) + min;
        //TODO: 广播
    }

    //抽卡
    drawCard(cardpool, player){
        this.triggerEvent("drawCard", player);
        //TODO: 抽卡
        this.triggerEvent("getCard", {player: player, card: card})
        //TODO: 广播
    }

    //移动
    move(path,player){
        /*
        path: 移动路径上经过的所有格点
        player：移动的玩家
        */
        let currentGrid=player.currentGrid;
        for(let index in path){
            //TODO: 通知前端移动
            currentGrid=path[index];
            currentGrid.pass(this, player);
        }
        //TODO: 广播
    }

    //打出卡牌
    useCard(card, player){
        this.triggerEvent("useCard", player);
        //TODO: 广播
        card.effect(player);
    }

    //选择玩家
    choosePlayer(canChoosePlayers, player){
        //TODO: 前端选择
        let chosenPlayer;
        this.triggerEvent("choose",{chosen: chosenPlayer, player: player});
    }

    //更新状态
    updateState(player, status){
        //TODO: 通知前端状态更新
    }
}

class ForceInterrupt extends Error {
    /*
    强制中断玩家行为所用到的抛出异常
    */
    constructor(message, executeFunction=()=>{}) {
        super(message);
        this.name = "InterruptException"; // 自定义异常名称
        this.executeFunction=executeFunction;
    }
}

function loadMap(folderPath){

}

function loadCardPools(folderPaths){

}

function loadPlayers(player_names, player_types, player_agents){

}

module.exports={
    Game,
    ForceInterrupt,
};

