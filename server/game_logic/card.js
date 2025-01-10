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
            this.logErrorToFile(error); // 将异常记录到日志文件
        }
    }

    logErrorToFile(error) {
        const logMessage = `[${new Date().toISOString()}] 卡牌: ${this.name}, 错误: ${error.stack}\n`;
        fs.appendFileSync('error_log.txt', logMessage, 'utf8'); // 异步追加日志到文件
        console.log("异常信息已记录到 error_log.txt");
    }
}

class CardPackage{
    constructor(filePath){
        this.filePath=filePath
    }
}
