class Map{
    constructor(filePath){
        this.filePath=filePath
    }
}

class Grids{
    constructor(text, passFunction=(player)=>{}, stopFunction=(player)=>{}){
        this.text=text;
        this.pass=passFunction;
        this.stop=stopFunction;
    }
}