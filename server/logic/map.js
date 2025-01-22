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
        let queue=[];
        let can_reach=[];
        queue.push(start);
        can_reach.push(start);
        this.grids[start].visited=0;
        while(queue.length!==0){
            let current=queue.shift();
            can_reach.push(current);
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
        this.clearVisited();
        return can_reach;
    }
    //返回移动经过的路径
    gridPath(start, end){
        let queue=[];
        let pres=[];
        let path=[];
        queue.push(start);
        pres.push(0);
        this.grids[start].visited=0;
        let front=0;
        while(front<queue.length){
            let current=queue[front];
            if(current==end){
                let pre_index=pres[front];
                path.push(end);
                while(pre_index!=0){
                    path.push(queue[pre_index]);
                    pre_index=pres[pre_index];
                }
                path.push(start);
                break;
            }
            for(let next of this.grids[current].nextGrids){
                if(this.grids[next].visited===-1){
                    this.grids[next].visited=this.grids[current].visited+1;
                    queue.push(next);
                    pres.push(front);
                }
            }
            for(let fore of this.grids[current].foreGrids){
                if(this.grids[fore].visited===-1){
                    this.grids[fore].visited=this.grids[current].visited+1;
                    queue.push(fore);
                    pres.push(front);
                }
            }
            front++;
        }
        this.clearVisited();
        path.reverse();
        return path;
    }
}

class Grids{
    constructor(text, nextGrids, passFunction=(player)=>{}, stopFunction=(player)=>{}){
        this.text=text;
        this.nextGrids=nextGrids;
        this.foreGrids=[];
        this.passFunction=passFunction;
        this.stopFunction=stopFunction;
        this.visited=-1;
        this.players_in=[];
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