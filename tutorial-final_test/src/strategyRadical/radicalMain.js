import {freshCreepInfo, mySpawn} from "../common/global";
import {doCreateCreep} from "./creepFactory";
import {doWork} from "./creepWork";
import {doAttack} from "./creepAttack";
import {doDefence} from "./creepDefence";

export function object() {
    console.log("激进战术：农民工人军人比例3:1:1");
    return this;
}

export function run() {
    // createRallyFlag(myAttackers[1], mySpawn.x + 2, mySpawn.y + 2);
    //
    freshCreepInfo();
    //
    doCreateCreep(mySpawn);
    //
    doWork();
    //
    doAttack();
    //
    doDefence();
}

