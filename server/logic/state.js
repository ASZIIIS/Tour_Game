class State{
    constructor(name){
        this.name=name;
    }
    influence(game, player, data){
        throw Error("未定义");
    }
}