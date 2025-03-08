import {myHeal} from "../common/basicHeal";
import {myAttackers, myHealers, myMiners, myRangeAttackers} from "../common/global";

/**
 * 开启治疗
 */
export function doHeal() {
    let target = [...myAttackers, ...myRangeAttackers, ...myHealers, ...myMiners];
    if (!target) {
        console.log("当前无友方受伤");
        return;
    }
    myHeal(target);
}