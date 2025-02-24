import {ERR_NOT_IN_RANGE} from "game/constants";
import {myAttackers, myRangeAttackers} from "./global";

export function myAttackClose(target) {
    for (let creep of myAttackers) {
        if (creep.attack(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
}

export function myAttackRange(target) {
    for (let creep of myRangeAttackers) {
        if (creep.rangedAttack(target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
}