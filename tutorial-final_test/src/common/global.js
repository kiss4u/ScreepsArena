import {getObjectsByPrototype} from 'game/utils';
import {Creep, Source, StructureSpawn} from 'game/prototypes';
import {MOVE, ATTACK, RANGED_ATTACK, TOUGH, HEAL, WORK, CARRY} from "game/constants";

export let myCreepsAll = []
export let myMiners = []
export let myWorkers = [];
export let myAttackers = [];
export let myRangeAttackers = [];
export let myHealers = [];
export let myDefenders = [];
export let myCreepOthers = [];

export let enemyAll = []
export let enemyMiners = []
export let enemyWorkers = [];
export let enemyAttackers = [];
export let enemyRangeAttackers = [];
export let enemyHealers = [];
export let enemyDefenders = [];
export let enemyCreepOthers = [];

export let allTaskQueue = [];
export let creepCreateQueue = [];
export let buildingQueue = [];

export const minerSize = 1;
export let workerSize = minerSize + 1;
export let attackerSize = 1;
export let rangeAttackerSize = 1;
export let healerSize = 1;
export let DefenderSize = 1;

export const workBody = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE];
export const attackBody = [TOUGH, ATTACK, MOVE, MOVE];
export const attackRangeBody = [TOUGH, RANGED_ATTACK, MOVE, MOVE];
export const healBody = [TOUGH, TOUGH, HEAL, MOVE, MOVE];

export const source = getObjectsByPrototype(Source)[0];

export const mySpawn = getObjectsByPrototype(StructureSpawn).filter(spawn => spawn.my)[0];
export const enemySpawn = getObjectsByPrototype(StructureSpawn).filter(spawn => !spawn.my)[0];

function clearCreepInfo() {
    myCreepsAll = [];
    myWorkers = [];
    myAttackers = [];
    myRangeAttackers = [];
    myHealers = [];
    myDefenders = [];
    myCreepOthers = [];

    enemyAll = []
    enemyWorkers = [];
    enemyAttackers = [];
    enemyRangeAttackers = [];
    enemyHealers = [];
    enemyDefenders = [];
    enemyCreepOthers = [];
}

/*
    刷新全图creep信息
 */
export function freshCreepInfo() {
    clearCreepInfo();
    let allCreeps = getObjectsByPrototype(Creep);
    myCreepsAll = allCreeps.filter(creep => creep.my);
    filterCreepInfo("我方", myCreepsAll, myWorkers, myAttackers, myRangeAttackers, myHealers, myCreepOthers);
    enemyAll = allCreeps.filter(creep => !creep.my);
    filterCreepInfo("敌方", enemyAll, enemyWorkers, enemyAttackers, enemyRangeAttackers, enemyHealers, enemyCreepOthers);
}

/*
    敌我creep类型归类
 */
function filterCreepInfo(type, creeps, creepWork, creepAttack, creepAttackRange, creepHeal, creepOther) {
    for (let creep of creeps) {
        // console.log("creep role" , creep.role);
        if (creep.body.some(bodyPart => bodyPart.type === WORK)) {
            creepWork.push(creep);
            continue;
        }
        if (creep.body.some(bodyPart => bodyPart.type === ATTACK)) {
            creepAttack.push(creep);
            continue;
        }
        if (creep.body.some(bodyPart => bodyPart.type === RANGED_ATTACK)) {
            creepAttackRange.push(creep);
            continue;
        }
        if (creep.body.some(bodyPart => bodyPart.type === HEAL)) {
            creepHeal.push(creep);
            continue;
        }
        creepOther.push(creep);
    }
    console.log(type, "农民：", creepWork.length,
        "近战：", creepAttack.length,
        "远程：", creepAttackRange.length,
        "治疗：", creepHeal.length,
        "其他：", creepOther.length);
}