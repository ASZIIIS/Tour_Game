class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.states=new Map();
    }
    //扔骰子
    //移动
    //抽卡
    //使用卡牌
}

class RealPlayer extends Player {
    constructor(name, websocket) {
        super(name); // 调用父类的构造函数
        this.decision=websocket;
    }
}

class AIPlayer extends Player {
    constructor(name, ai) {
        super(name); // 调用父类的构造函数
        this.decision=ai;
    }
}

module.exports = {
    Player,
    RealPlayer,
    AIPlayer,
};