import {getObjectsByPrototype} from 'game/utils';
import {Creep, Source, StructureSpawn} from 'game/prototypes';
import {MOVE, ATTACK, RANGED_ATTACK, TOUGH, HEAL, WORK, CARRY} from "game/constants";

// 我方兵种列表
export let myCreepsAll = []
export let myMiners = []
export let myWorkers = [];
export let myAttackers = [];
export let myRangeAttackers = [];
export let myHealers = [];
export let myDefenders = [];
export let myCreepOthers = [];

// 敌方兵种列表
export let enemyAll = []
export let enemyMiners = []
export let enemyWorkers = [];
export let enemyAttackers = [];
export let enemyRangeAttackers = [];
export let enemyHealers = [];
export let enemyDefenders = [];
export let enemyCreepOthers = [];

// 任务队列
export let allTaskQueue = [];
export let creepCreateQueue = [];
export let buildingQueue = [];

// 兵种基数
export let minerSize = 2;
export let workerSize =  1;
export let attackerSize = 2;
export let rangeAttackerSize = 2;
export let healerSize = 2;
export let defenderSize = 2;

// 兵种基础属性
export const minerBody = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, WORK];
export const workerBody = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, CARRY];
export const attackerBody = [TOUGH, TOUGH, MOVE, MOVE, ATTACK];
export const rangeAttackerBody = [TOUGH, TOUGH, MOVE, MOVE, RANGED_ATTACK];
export const healerBody = [TOUGH, TOUGH, MOVE, MOVE, HEAL];
export const defenderBody = [TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, MOVE];

// 矿点
export const source = getObjectsByPrototype(Source)[0];

// 我方基地
export const mySpawn = getObjectsByPrototype(StructureSpawn).filter(spawn => spawn.my)[0];
// 敌方基地
export const enemySpawn = getObjectsByPrototype(StructureSpawn).filter(spawn => !spawn.my)[0];

let globalCreepNum = 0;

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

/**
 * 刷新全图creep信息
 */
export function freshCreepInfo() {
    clearCreepInfo();
    let allCreeps = getObjectsByPrototype(Creep);
    myCreepsAll = allCreeps.filter(creep => creep.my);
    filterCreepInfo("我方信息", myCreepsAll, myWorkers, myAttackers, myRangeAttackers, myHealers, myCreepOthers);
    enemyAll = allCreeps.filter(creep => !creep.my);
    filterCreepInfo("敌方信息", enemyAll, enemyWorkers, enemyAttackers, enemyRangeAttackers, enemyHealers, enemyCreepOthers);
}

/**
 * 敌我creep类型归类
 * @param type
 * @param creeps
 * @param creepWork
 * @param creepAttack
 * @param creepAttackRange
 * @param creepHeal
 * @param creepOther
 */
function filterCreepInfo(type, creeps, creepWork, creepAttack, creepAttackRange, creepHeal, creepOther) {
    for (let creep of creeps) {
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
    // console.log("creeps" , creeps);
    console.log(type, "农民：", creepWork.length,
        "近战：", creepAttack.length,
        "远程：", creepAttackRange.length,
        "治疗：", creepHeal.length,
        "其他：", creepOther.length);
}

export function incrementCreepNum() {
    return globalCreepNum++;
}