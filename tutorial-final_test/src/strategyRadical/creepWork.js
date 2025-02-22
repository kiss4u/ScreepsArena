import {minerSize, myMiners, mySpawn, myWorkers, source, workerSize} from "../common/global";
import {createBuilding, doMining} from "../common/basicWork";

/*
    采集能量
 */
export function doWork() {
    for (let i = 0; i < myWorkers.length; i++) {
        let worker = myWorkers[i];
        if (myMiners.includes(worker)) {
            continue;
        }
        // 补充矿工
        if (myMiners.length < minerSize) {
            myMiners.push(worker);
        }
    }
    //
    doMining(myMiners, mySpawn, null, source);

    // createRallyFlag(mySpawn.x - 1, mySpawn.y - 1);

    createBuilding(mySpawn.x - 3, mySpawn.y - 3);
}