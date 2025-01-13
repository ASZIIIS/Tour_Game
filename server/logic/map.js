class Map{
    constructor(filePath){
        this.filePath=filePath
    }
    //构造格点
    //获取可以到达的格点列表
    //返回移动经过的路径
}

class Grids{
    constructor(text, nextGrid, passFunction=(player)=>{}, stopFunction=(player)=>{}){
        this.text=text;
        this.nextGrid=nextGrid;
        this.passFunction=passFunction;
        this.stopFunction=stopFunction;
    }

    pass(game, player){
        game.triggerEvent("pass", )
    }
}