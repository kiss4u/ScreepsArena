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
    let size = myMiners.length + countQueueWaiting(minerBody);
    if (size < minerSize) {
        addQueueBatch(minerBody, minerSize - size);
    }
    if (myWorkers.length + countQueueWaiting(workerBody) < workerSize) {
        addQueue(workerBody);
    }
    if (myAttackers.length + countQueueWaiting(attackerBody) < attackerSize) {
        addQueue(attackerBody);
    }
    if (myRangeAttackers.length + countQueueWaiting(rangeAttackerBody) < rangeAttackerSize) {
        addQueue(rangeAttackerBody);
    }
    if (myHealers.length + countQueueWaiting(healerBody) < healerSize) {
        addQueue(healerBody);
    }
    if (myCreepOthers.length + countQueueWaiting(defenderBody) < defenderSize) {
        addQueue(defenderBody);
    }
    console.log("待生产队列数量", creepCreateQueue.length);
}

/**
 *
 * @param body
 */
function addQueue(body) {
    addQueueBatch(body, 1);
}

/**
 * 添加到生存队列
 * @param body
 * @param size
 */
function addQueueBatch(body, size) {
    for (let i = 0; i < size; i++) {
        creepCreateQueue.push(body)
    }
}

/**
 * 队列中type待生产数量
 * @param type
 * @returns {number}
 */
function countQueueWaiting(type) {
    return creepCreateQueue.filter(body => body === type).length;
}