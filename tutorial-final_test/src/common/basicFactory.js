import {RESOURCE_ENERGY, BODYPART_COST} from "game/constants";
import {getAvailableWorker} from "./basicWork";

/**
 * 基地能量
 * @param spawn
 * @returns {boolean}
 */
export function getSpawnEnergy(spawn) {
    return spawn.store[RESOURCE_ENERGY];
}

/**
 * 基地能量状态
 * @param spawn
 * @returns {boolean}
 */
export function spawnEnergyEnough(spawn) {
    let current = getSpawnEnergy(spawn);
    console.log("基地能量值为", current);
    return current > 0;
}

/**
 * 计算creep生成需消耗的能量
 * @param bodies
 * @returns {number}
 */
export function getCreepCost(bodies) {
    let cost = 0;
    for (let body of bodies) {
        cost += BODYPART_COST[body]
    }
    // console.log("getCreepCost", bodies, "cost", cost);
    return cost;
}

/**
 * 基地能量是否可以生产
 * @param spawn
 * @param body
 * @returns {boolean}
 */
function checkEnergyEnough(spawn, body) {
    let cost = getCreepCost(body);
    let current = spawn.store[RESOURCE_ENERGY];
    console.log("基地生产", body[body.length - 1], "需要能量值", cost, "当前能量值", current);
    return current >= cost;
}

/**
 * 生成creep
 * @param spawn
 * @param body
 * @returns {*}
 */
export function createCreep(spawn, body) {
    if (!checkEnergyEnough(spawn, body)) {
        return;
    }
    createCreepWithType(spawn, body, '');
}

export function createCreepWithType(spawn, body, type) {
    return spawn.spawnCreep(body, {
        memory: {role: type, event: ''}
    });
}

function createCreepTo(spawn, body, to) {
    createCreep(spawn, body).moveTo(to);
}

/**
 * 生成creep-带名称
 * @param spawn
 * @param body
 * @param name
 * @param type
 * @returns {*}
 */
export function createCreepWithName(spawn, body, name, type) {
    if (!checkEnergyEnough(spawn, body)) {
        return;
    }
    return spawn.spawnCreep(body, name, {
        memory: {role: type, event: ''}
    });
}

function createRallyFlag(posX, posY) {
    let worker = getAvailableWorker();
    if (!worker) {
        worker.moveTo(posX, posY);
        worker.pos.createFlag('Flag1');
    }
}