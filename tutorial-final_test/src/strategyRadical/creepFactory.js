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
    incrementCreepNum,
    attackerSize, rangeAttackerSize, myHealers, healerSize
} from "../common/global";
import {createCreep, createCreepWithName, createCreepWithType, spawnEnergyEnough} from "../common/basicFactory";

/**
 * 生产creep
 * @param spawn
 */
export function doCreateCreep(spawn) {
    if (!spawnEnergyEnough(spawn)) {
        return;
    }

    // 优先生产农民
    if (myMiners.length < minerSize) {
        let name = 'miner_' + incrementCreepNum();
        createCreepWithName(spawn, workerBody, name, 'miner');
    } else {
        if (myWorkers.length < workerSize) {
            createCreepWithType(spawn, workerBody, 'worker');
        } else if (myAttackers.length < attackerSize) {
            createCreep(spawn, attackerBody);
        } else if (myRangeAttackers.length < rangeAttackerSize) {
            createCreep(spawn, rangeAttackerBody);
        } else if (myHealers.length < healerSize) {
            createCreep(spawn, healerBody);
        }
    }
}