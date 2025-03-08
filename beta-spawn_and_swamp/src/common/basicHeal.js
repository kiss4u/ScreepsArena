import {myHealers, mySpawn} from "./global";
import {ERR_NOT_IN_RANGE} from "game/constants";

export function myHeal(myCreep) {
    for (let creep of myHealers) {
        let hurtCreeps = myCreep.filter(function(i) {
            return i.hits < i.hitsMax;
        });
        console.log("友方受伤情况" ,hurtCreeps.length);
        if (hurtCreeps.length > 0) {
            if (creep.heal(hurtCreeps[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(hurtCreeps[0]);
            }
        } else {
            creep.moveTo(mySpawn);
        }
    }
}