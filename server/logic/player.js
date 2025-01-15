class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
    }
    //扔骰子
    //移动
    //抽卡
    //使用卡牌
}

class RealPlayer extends Player {
    constructor(name) {
        super(name); // 调用父类的构造函数
    }

    
}

class AIPlayer extends Player {
    constructor(name) {
        super(name); // 调用父类的构造函数
    }
}

module.exports = {
    Player,
    RealPlayer,
    AIPlayer,
};