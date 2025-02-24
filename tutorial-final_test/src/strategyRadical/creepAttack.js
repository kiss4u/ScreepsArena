import {enemyAll} from "../common/global";
import {myAttackClose, myAttackRange} from "../common/basicAttack";

/**
 * 开启进攻
 */
export function doAttack() {
    myAttackClose(enemyAll[0]);
    myAttackRange(enemyAll[0]);
}