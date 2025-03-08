import {
    ERR_FULL,
    ERR_INVALID_TARGET,
    ERR_NOT_ENOUGH_RESOURCES,
    ERR_NOT_IN_RANGE,
    RESOURCE_ENERGY
} from "game/constants";
import {creepCreateQueue, minerSize, myAttackers, myMiners, myWorkers, workerSize} from "./global";
import {createConstructionSite, findClosestByRange, getObjectsByPrototype} from "game/utils";
import {ConstructionSite, StructureTower} from "game/prototypes";

/**
 * 挖矿
 * @param miners
 * @param spawn
 * @param container
 * @param source
 */
export function doMining(miners, spawn, container, source) {
    if (source) {
        for (let miner of miners) {
            getFromSource(miner, spawn, container, source);
        }
        return;
    }
    if (container) {
        for (let miner of miners) {
            getFromContainer(miner, spawn, container);
        }
    }
}

function getFromSource(miner, spawn, container, source) {
    if (miner.store[RESOURCE_ENERGY] < miner.store.getCapacity()) {
        if (miner.harvest(source) === ERR_NOT_IN_RANGE) {
            miner.moveTo(source);
        }
    } else {
        if (spawn.store === spawn.store.getCapacity()) {
            console.log("基地能量已储满", spawn.store)
            if (!container) {
                goTransfer(miner, source);
            }
        }
        goTransfer(miner, spawn);
    }
}

function getFromContainer(miner, spawn, container) {
    if (miner.store[RESOURCE_ENERGY] < miner.store.getCapacity()) {
        console.log("getFromContainer", miner.withdraw(container, RESOURCE_ENERGY))
        if (miner.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            miner.moveTo(container);
        }
    } else {
        goTransfer(miner, spawn);
    }
}

/**
 * 运输
 * @param creep
 * @param target
 */
function goTransfer(creep, target) {
    let result = creep.transfer(target, RESOURCE_ENERGY);
    if (result === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
    } else if (result === ERR_FULL) {
        console.log("目标能量存储已达最大值！", target.store);
    }
}

/**
 * 空闲工人
 * @returns {*}
 */
export function getAvailableWorker(target) {
    for (let worker of myWorkers) {
        console.log("getAvailableWorker", worker.id, worker.event);
        if (worker.event === 'ready' && worker.store[RESOURCE_ENERGY] > 0) {
            return worker;
        } else {
            getEnergy(worker, target);
        }
    }
    return null;
}

/**
 * 检查worker身上能量是否可以建造
 * @param worker
 * @returns {boolean}
 */
function checkWorkerEnergy(worker) {
    if (worker.event === 'ready') {
        let current = worker.store[RESOURCE_ENERGY];
        if (current > 0 && current <= worker.store.getCapacity()) {
            return true;
        }
    }
    getEnergy(worker, source);

    return false;
}

/**
 * worker装载能量，取满后待命
 * @param worker
 * @param target
 */
function getEnergy(worker, target) {
    if (!worker) {
        console.log("执行命令的worker不存在");
        return;
    }
    if (worker.store[RESOURCE_ENERGY] === worker.store.getCapacity()) {
        worker.event = 'ready';
        return;
    }
    if (worker.harvest(target) === ERR_NOT_IN_RANGE) {
        worker.event = 'harvesting';
        worker.moveTo(target);
    }
}

/**
 * 建造防御塔
 * @param builder
 * @param posX
 * @param posY
 */
export function createTower(builder, posX, posY) {
    let constructionSite = getObjectsByPrototype(ConstructionSite).filter(i => i.my);
    if (!constructionSite || constructionSite.length < 10) {
        constructionSite = createConstructionSite({x: posX, y: posY}, StructureTower).object;
    }
    if (checkWorkerEnergy(builder)) {
        let result = builder.build(constructionSite);
        console.log("createTower", result);
        if (result === ERR_NOT_IN_RANGE) {
            builder.moveTo(constructionSite);
        } else if (result === ERR_INVALID_TARGET) {

        }
    }
}

export function buildaaaaaTower(target) {
    let constructionSite = getObjectsByPrototype(ConstructionSite).find(i => i.my);
    let creep = getAvailableWorker();
    let result = creep.build(constructionSite);
    if (result === ERR_NOT_IN_RANGE) {
        creep.moveTo(constructionSite);
    }
    if (result === ERR_NOT_ENOUGH_RESOURCES) {
        if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
}

