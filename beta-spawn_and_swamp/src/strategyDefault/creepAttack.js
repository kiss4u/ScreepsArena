import {enemyAll, enemySpawn, myAttackers, myHealers, myRangeAttackers} from "../common/global";
import {myAttackClose, myAttackRange} from "../common/basicAttack";

/**
 * 开启进攻
 */
export function doAttack() {
    // if (myAttackers.length + myRangeAttackers.length + myHealers.length < 3) {
    //     return;
    // }
    myAttackClose(enemyAll[0]);
    myAttackRange(enemyAll[0]);
    if (enemyAll.length === 0) {
        myAttackClose(enemySpawn);
        myAttackRange(enemySpawn);
    }
}

