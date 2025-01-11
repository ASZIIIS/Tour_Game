const fs = require('fs');
const path = require('path');

class Card {
    constructor(filePath) {
        this.filePath = filePath;
        this.effect = null;
    }

    async loadEffect() {
        try {
            const effectModule = require(path.resolve(this.effectFilePath));
            this.effect = effectModule.effect;
            console.log(`成功加载卡牌效果: ${this.name}`);
        } catch (error) {
            console.error(`加载卡牌效果时发生异常: ${this.name}`, error.message);
        }
    }
}

class CardPackage{
    constructor(filePath){
        this.filePath=filePath
    }
}
