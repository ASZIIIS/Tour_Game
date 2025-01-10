class Player {
    constructor(name) {
        this.name = name;
        this.health = 100;
    }

    takeDamage(amount) {
        this.health -= amount;
        console.log(`${this.name} 受到 ${amount} 点伤害，剩余血量 ${this.health}`);
    }
}

class RealPlayer extends Player {
    constructor(name) {
        super(name); // 调用父类的构造函数
    }

    makeMove() {
        console.log(`${this.name} 的回合，等待玩家操作`);
    }
}

class AIPlayer extends Player {
    constructor(name) {
        super(name); // 调用父类的构造函数
    }

    makeMove() {
        console.log(`${this.name} 的回合，AI 正在计算最佳操作...`);
        // 模拟 AI 行动逻辑
        setTimeout(() => {
            console.log(`${this.name} 使用了技能！`);
        }, 1000);
    }
}

module.exports = {
    Player,
    RealPlayer,
    AIPlayer,
};