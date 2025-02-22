import {RESOURCE_ENERGY, BODYPART_COST} from "game/constants";
import {getAvailableWorker} from "./basicWork";

/*
    基地能量是否足够
 */
export function spanEnergyEnough(spawn) {
    let current = spawn.store[RESOURCE_ENERGY];
    console.log("基地当前能量为", current);
    return current >= 300;
}

/*
    生成creep
 */
export function createCreep(spawn, body) {
    return createCreepWithType(spawn, body, '');
}

export function createCreepWithType(spawn, body, type) {
    let cost = getCreepCost(body);
    let current = spawn.store[RESOURCE_ENERGY];
    console.log("createCreep当前资源", current, "需要资源", cost);
    if (current < cost) {
        return;
    }
    return spawn.spawnCreep(body, {
        memory: {role: type, event: ''}
    });
}

function createCreepTo(spawn, body, to) {
    createCreep(spawn, body).moveTo(to);
}

/*
    生成creep-带名称
 */
function createCreepWithName(spawn, body, name, type) {
    let cost = getCreepCost(body);
    let current = spawn.store[RESOURCE_ENERGY];
    console.log("createCreep当前资源", current, "需要资源", cost);
    if (current < cost) {
        return;
    }
    return spawn.spawnCreep(body, name, {
        memory: {role: type, event: ''}
    });
}

/*
    计算creep生成需消耗的能量
 */
function getCreepCost(bodies) {
    let cost = 0;
    for (let body of bodies) {
        cost += BODYPART_COST[body]
    }
    // console.log("getCreepCost", bodies, "cost", cost);
    return cost;
}

function createRallyFlag(posX, posY) {
    let worker = getAvailableWorker();
    if (!worker) {
        worker.moveTo(posX, posY);
        worker.pos.createFlag('Flag1');
    }
}