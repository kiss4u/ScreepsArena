import {enemyAll} from "../common/global";
import {myAttackClose, myAttackRange} from "../common/basicAttack";

/*
    开启进攻
 */
export function doAttack() {
    console.log("开始攻击，敌人来袭数量", enemyAll.length);
    myAttackClose(enemyAll[0]);
    myAttackRange(enemyAll[0]);
}