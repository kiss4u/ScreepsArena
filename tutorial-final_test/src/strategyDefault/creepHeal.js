import {myHeal} from "../common/basicHeal";
import {myAttackers, myRangeAttackers} from "../common/global";

/*
    开启治疗
 */
export function doHeal() {
    let target = [];
    target.concat(myAttackers, myRangeAttackers);
    myHeal(target);
}