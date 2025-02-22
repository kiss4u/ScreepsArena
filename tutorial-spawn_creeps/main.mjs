import {findClosestByPath, getObjectsByPrototype} from 'game/utils';
import {Creep, StructureSpawn, Flag} from 'game/prototypes';
import {ATTACK, BODYPART_COST, MOVE, RESOURCE_ENERGY} from "game/constants";

const attackBody = [MOVE];

export function loop() {

    let flags = getObjectsByPrototype(Flag);
    const mySpawn = getObjectsByPrototype(StructureSpawn)[0];
    let myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);

    console.log(flags.length, myCreeps.length);
    if (myCreeps.length < flags.length) {
        for (let i = 0; i < flags.length - myCreeps.length; i++) {
            let creep = createCreep(mySpawn, attackBody, "flager_" + i);
            if (creep != null) {
                myCreeps.push(creep);
            }
        }
    }
    console.log(flags.length, myCreeps.length);
    for (let creep of myCreeps) {
        // let closestFlag = creep.findClosestByPath(flags);
        if (creep != null) {
            let flag = flags.pop();
            creep.moveTo(flag);
            console.log(creep, "移动至", flag);
        }
    }
}

function createCreep(spawn, body, name) {
    let cost = getCreepCost(body);
    let current = spawn.store[RESOURCE_ENERGY];
    console.log("createCreep当前资源", current, "需要资源", cost);
    if (current < cost) {
        return;
    }
    return spawn.spawnCreep(body, name).object;
}

function getCreepCost(bodies) {
    let cost = 0;
    for (let body of bodies) {
        cost += BODYPART_COST[body]
    }
    console.log("getCreepCost", bodies, "cost", cost);
    return cost;
}