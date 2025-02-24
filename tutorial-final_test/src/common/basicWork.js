import {ERR_FULL, ERR_NOT_IN_RANGE, RESOURCE_ENERGY} from "game/constants";
import {myAttackers, myWorkers, source} from "./global";
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
    for (let miner of miners) {
        if (miner.store[RESOURCE_ENERGY] < miner.store.getCapacity()) {
            if (miner.harvest(source) === ERR_NOT_IN_RANGE) {
                miner.moveTo(source);
            }
        } else {
            if (spawn.store === spawn.store.getCapacity()) {
                console.log("基地能量已储满", spawn.store)
                if (!container) {
                    goTransfer(miner, container);
                }
            }
            goTransfer(miner, spawn);
        }
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
export function getAvailableWorker() {
    return myWorkers[1];
}

/**
 * 建造
 * @param pox
 * @param poy
 */
export function createBuilding(pox, poy) {
    let worker = getAvailableWorker();
    if (!worker) {
        console.log("当前无空闲工人");
        return;
    }
    //
    createTower(worker, pox, poy);
}

function checkWorkerEnergy(worker) {
    if (worker.event !== 'harvesting') {
        let current = worker.store[RESOURCE_ENERGY];
        if (current > 0 && current <= worker.store.getCapacity()) {
            return true;
        }
    }
    getEnergy(worker, source);

    return false;
}

function getEnergy(worker, target) {
    if (!worker) {
        console.log("执行命令的worker不存在");
        return;
    }
    if (worker.store[RESOURCE_ENERGY] === worker.store.getCapacity()) {
        worker.event = '';
        return;
    }
    worker.event = 'harvesting';
    console.log(worker.event);
    if (worker.harvest(target) === ERR_NOT_IN_RANGE) {
        worker.moveTo(target);
    }
}

export function createTower(builder, posX, posY) {
    let constructionSite = getObjectsByPrototype(ConstructionSite).find(i => i.my);
    if (!constructionSite) {
        constructionSite = createConstructionSite({x: posX, y: posY}, StructureTower).object;
    }
    if (checkWorkerEnergy(builder)) {
        if (builder.build(constructionSite) === ERR_NOT_IN_RANGE) {
            builder.moveTo(constructionSite);
        }
    }
}