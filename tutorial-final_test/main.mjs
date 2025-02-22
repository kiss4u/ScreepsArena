import * as strategyDefault from "./src/strategyDefault/defaultMain.js";
import * as strategyRadical from "./src/strategyRadical/radicalMain.js";

let strategy;

export function loop() {
    if (!strategy) {
        strategy = getRandomInt(1, 2);
    }
    strategyDefault.run();
    // console.log("本局执行策略", strategy);
    // if (strategy === 1) {
    //     strategyDefault.run();
    // } else {
    //     strategyRadical.run();
    // }
}

/*
    生成随机数
 */
function getRandomInt(min, max) {
    min = Math.ceil(min); // 将最小值向上取整
    max = Math.floor(max); // 将最大值向下取整
    return Math.floor(Math.random() * (max - min + 1)) + min;
}








