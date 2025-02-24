import * as strategyTest from "./src/testMain.js";
import * as strategyDefault from "./src/strategyDefault/defaultMain.js";
import * as strategyRadical from "./src/strategyRadical/radicalMain.js";
import {getRandomInt} from "./src/util/randomUtil.js";

export function loop() {
    randomDoStrategy(1, 1).run();
}

// 战术
let strategy;

/**
 * 随机一个战术
 * @param strategyFrom
 * @param strategyTo
 * @returns {{run?: function(), object?: function(): this}|{run?: function(): void, object?: function(): this}|{run?: function(): void, object?: function(): this}}
 */
function randomDoStrategy(strategyFrom, strategyTo) {
    if (!strategy) {
        strategy = formatStrategy(getRandomInt(strategyFrom, strategyTo)).object();
    }
    return strategy;
}

function formatStrategy(num) {
    switch (num) {
        case 0:
            return strategyTest;
        case 1:
            return strategyDefault;
        case 2:
            return strategyRadical;
        default:
            return strategyDefault;
    }
}








