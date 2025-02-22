import {
    creepCreateQueue,
    myAttackers,
    myCreepOthers,
    myMiners,
    myRangeAttackers,
    myWorkers, attackRangeBody, attackBody, healBody, workBody, workerSize, minerSize
} from "../common/global";
import {createCreep, createCreepWithType, spanEnergyEnough} from "../common/basicFactory";

/*
    生产creep
 */
export function doCreateCreep(spawn) {
    if (!spanEnergyEnough(spawn)) {
        return;
    }
    // todo改成按优先级
    // 优先生产农民
    if (myMiners.length < minerSize) {
        createCreep(spawn, workBody);
    } else {
        if (myWorkers.length < workerSize) {
            createCreepWithType(spawn, workBody, 'worker');
        } else if (myAttackers.length < 2) {
            createCreep(spawn, attackBody);
        } else if (myRangeAttackers.length < 2) {
            createCreep(spawn, attackRangeBody);
        }
    }
}