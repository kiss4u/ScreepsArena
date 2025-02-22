import {BODYPART_COST, RESOURCE_ENERGY} from "game/constants";


export function createCreep(spawn, body, name) {
    let cost = getCreepCost(body);
    let current = spawn.store[RESOURCE_ENERGY];
    console.log("createCreep当前资源", current, "需要资源", cost);
    if (current < cost) {
        return;
    }
    return spawn.spawnCreep(body, name).object;
}

function getCreepCost(bodys) {
    let cost = 0;
    for (let body of bodys) {
        cost += BODYPART_COST[body]
    }
    console.log("getCreepCost", bodys, "cost", cost);
    return cost;
}