class State{
    constructor(name, player){
        this.name=name;
        this.player=player;
    }
    static influence(player){
        throw Error("未定义");
    }
    addState(){
        throw Error("未定义");
    }
    updateState(){
        throw Error("未定义");
    }
    removeState(){
        throw Error("未定义");
    }
}