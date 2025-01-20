class Map{
    constructor(filePath){
        this.grids=[];
    }
    //连接格点
    connectGrids(){
        for(let i in this.grids){
            for(let next in this.grids[i].nextGrids){
                this.grids[next].foreGrids.push(i);
            }
        }
    }
    //清空visited状态
    clearVisited(){
        this.grids.forEach(grid=>{grid.visited=-1;});
    }
    //获取可以到达的格点列表
    canReach(start, range, forward=false){
        this.clearVisited();
        let queue=[];
        let can_reach=[];
        queue.push(start);
        can_reach.push(start);
        this.grids[start].visited=0;
        while(queue.length!==0){
            let current=queue.shift();
            if(this.grids[current].visited>=range){
                continue;
            }
            for(let next of this.grids[current].nextGrids){
                if(this.grids[next].visited===-1){
                    this.grids[next].visited=this.grids[current].visited+1;
                    queue.push(next);
                }
            }
            if(!forward){
                for(let fore of this.grids[current].foreGrids){
                    if(this.grids[fore].visited===-1){
                        this.grids[fore].visited=this.grids[current].visited+1;
                        queue.push(fore);
                    }
                }
            }
        }
    }
    //返回移动经过的路径
}

class Grids{
    constructor(text, nextGrids, passFunction=(player)=>{}, stopFunction=(player)=>{}){
        this.text=text;
        this.nextGrids=nextGrids;
        this.foreGrids=[];
        this.passFunction=passFunction;
        this.stopFunction=stopFunction;
        this.visited=-1;
    }

    pass(game, player){
        game.triggerEvent("pass", {player: player, grid: this});
        this.passFunction(player);
    }

    stop(game, player){
        game.triggerEvent("stop", {player: player, grid: this});
        this.stopFunction(player);
    }
}