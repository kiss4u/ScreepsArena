import {
    creepCreateQueue,
    myAttackers,
    myCreepOthers,
    myMiners,
    myRangeAttackers,
    myWorkers,
    rangeAttackerBody,
    attackerBody,
    healerBody,
    workerBody,
    workerSize,
    minerSize,
    attackerSize,
    myHealers,
    rangeAttackerSize, healerSize, minerBody, defenderBody, defenderSize
} from "../common/global";
import {
    createCreep,
    createCreepWithName,
    createCreepWithType,
    getCreepCost,
    getSpawnEnergy,
    spawnEnergyEnough
} from "../common/basicFactory";

/**
 * 生成creep
 * @param spawn
 */
export function doCreateCreep(spawn) {
    if (!spawnEnergyEnough(spawn)) {
        return;
    }
    createQueueProducer();
    createQueueConsumer(spawn);
}

/**
 * creep队列消费者
 * @param spawn
 */
function createQueueConsumer(spawn) {
    let currentEnergy = getSpawnEnergy(spawn);
    while (creepCreateQueue.length > 0) {
        let body = creepCreateQueue[0]; // 查看队列的第一个元素
        let costEnergy = getCreepCost(body);
        if (currentEnergy < costEnergy) {
            console.log("下一个待生产能量还差", costEnergy - currentEnergy);
            break;
        }
        currentEnergy -= costEnergy;
        if (creepCreateQueue.length > 1) {
            createCreep(spawn, creepCreateQueue.shift());
        } else {
            // 如果队列中只有一个元素，则不做处理或根据需要处理
            break;
        }
    }
}

/**
 * creep队列生产者
 */
function createQueueProducer() {
    if (myMiners.length + countQueueWaiting(minerBody) < minerSize) {
        creepCreateQueue.push(minerBody);
    }
    if (myWorkers.length + countQueueWaiting(workerBody) < workerSize) {
        creepCreateQueue.push(workerBody);
    }
    if (myAttackers.length + countQueueWaiting(attackerBody) < attackerSize) {
        creepCreateQueue.push(attackerBody);
    }
    if (myRangeAttackers.length + countQueueWaiting(rangeAttackerBody) < rangeAttackerSize) {
        creepCreateQueue.push(rangeAttackerBody);
    }
    if (myHealers.length + countQueueWaiting(healerBody) < healerSize) {
        creepCreateQueue.push(healerBody);
    }
    if (myCreepOthers.length + countQueueWaiting(defenderBody) < defenderSize) {
        creepCreateQueue.push(defenderBody);
    }
    console.log("待生产队列数量", creepCreateQueue.length);
}

/**
 * 队列中type待生产数量
 * @param type
 * @returns {number}
 */
function countQueueWaiting(type) {
    return creepCreateQueue.filter(body => body === type).length;
}