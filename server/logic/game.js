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
        this.utils=utils;
        this.players=players;
        InitializeMap(map);
        InitializeCards(card_packages);
        this.InitializePlayers();
        this.currentPlayerIndex = 0; // 当前玩家索引
        this.currentPhase = 0; // 当前阶段
        this.currentDice=undefined; //全局控制骰子
        this.eventObservers = new Map();
    }

    InitializeMap(){

    }

    InitializeCards(){
        
    }

    InitializePlayers(){

    }

    static logErrorToFile(error, log_path, info=null) {
        const logMessage = `[${new Date().toISOString()}] 错误: ${error.stack}\n`;
        fs.appendFileSync(log_path, logMessage, 'utf8'); // 异步追加日志到文件
        console.log("异常信息已记录到 error_log.txt");
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
        console.log(`事件触发: ${event}`);
        if (this.eventObservers.has(event)) {
            for (const observer of this.eventObservers.get(event)) {
                observer.callback(data);
            }
        }
    }
    
    //扔骰子
    //抽卡
    //移动
    //触发格点
    //打出卡牌
    
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

module.exports={Game};

