const fs = require('fs');
const path = require('path');

class Card {
    constructor(filePath) {
        this.filePath = filePath;
        this.effect = null;
    }

    loadEffect() {
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

class CardPool{
    constructor(name){
        this.name=name;
        this.pool=[];
        this.backup=undefined;
    }

    //洗牌
    static shuffle(array){
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // 交换元素
        }
        return array;
    }

    //添加卡牌
    addCard(card, number){
        for(let i=0;i<number;i++){
            this.pool.push(card);
        }
    }

    //记录牌库满状态
    record(){
        this.backup=[...this.pool];
    }

    //抽卡
    drawCard(number, remove=true, fromTop=true){
        if(number<=this.pool.length){
            if(fromTop){
                return this.pool.splice(0,number);
            }else{
                let cards=[];
                for(let i=0;i<number;i++){
                    let j=Math.floor(Math.random() * this.pool.length);
                    cards.push(this.pool.splice(j,1));
                }
                return cards;
            }
        }else{
            let cards=[...this.pool];
            let remainingNumber=number-this.pool.length;
            this.pool=[...this.backup];
            if(fromTop){
                return cards.concat(this.pool.splice(0,remainingNumber));
            }else{
                for(let i=0;i<number;i++){
                    let j=Math.floor(Math.random() * this.pool.length);
                    cards.push(this.pool.splice(j,1));
                }
                return CardPool.shuffle(cards);
            }
        }
    }

    //定点检索卡牌
    searchCard(number, name=undefined, checkFunction=undefined, remove=true){
        // 第一步：根据 name 过滤（如果 name 不为 undefined）
        let filteredCards = name !== undefined
            ? cards.filter(card => card.name === name)
            : cards;

        // 第二步：根据 checkFunction 过滤（如果 checkFunction 不为 undefined）
        filteredCards = checkFunction !== undefined
            ? filteredCards.filter(card => checkFunction(card))
            : filteredCards;

        // 第三步：挑选前 number 个元素
        let result = filteredCards.slice(0, number);

        // 第四步：根据 remove 标志从原数组中移除选中的元素
        if (remove) {
            result.forEach(card => {
                let index = cards.indexOf(card); // 找到选中元素的索引
                if (index !== -1) {
                    cards.splice(index, 1); // 从原数组中移除
                }
            });
        }

        // 返回结果数组
        return result;
    }
}
