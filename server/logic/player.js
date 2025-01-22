class Player {
    constructor(name, websocket=undefined, ai=undefined) {
        this.name = name;
        this.websocket=websocket;
        this.ai=ai;
        this.states=new Map();
        this.cards=[];
        this.position=0;
    }
    //扔骰子
    //移动
    //抽卡
    //使用卡牌
}

module.exports = {
    Player,
};