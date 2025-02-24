import {freshCreepInfo, myAttackers, myRangeAttackers, mySpawn} from "../common/global";
import {doCreateCreep} from "./creepFactory";
import {doWork} from "./creepWork";
import {doAttack} from "./creepAttack";
import {doHeal} from "./creepHeal";
import {doDefence} from "./creepDefence";

export function object() {
    console.log("标准战术：农民工人军人比例1:1:1");
    return this;
}

export function run() {
    //
    freshCreepInfo();
    //
    doCreateCreep(mySpawn);
    //
    doWork();
    //
    doAttack();
    //
    doHeal();
    //
    doDefence();
}

