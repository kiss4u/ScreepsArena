import {findClosestByPath, getObjectsByPrototype} from 'game/utils';
import {Creep, StructureSpawn, Source} from 'game/prototypes';
import {ATTACK, BODYPART_COST, MOVE, RESOURCE_ENERGY, ERR_NOT_IN_RANGE, WORK, CARRY} from "game/constants";

const wokeBody = [MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY];
const source = getObjectsByPrototype(Source)[0];
const mySpawn = getObjectsByPrototype(StructureSpawn)[0];

export function loop() {
    let myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    if (myCreeps.length < 1) {
        for (let i = 0; i < 2 - myCreeps.length; i++) {
            let creep = createCreep(mySpawn, wokeBody, "woker_" + i);
            if (creep != null) {
                myCreeps.push(creep);
            }
        }
    }

    for (let creep of myCreeps) {
        if (creep != null) {
            if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            } else {
                goTransfer(creep, mySpawn);
            }
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

function goTransfer(creep, target) {
    console.log("goTransfer");
    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        console.log("goTransfer 1");
        creep.moveTo(target);
    }
}