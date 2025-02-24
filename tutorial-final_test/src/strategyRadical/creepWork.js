import {minerSize, myMiners, mySpawn, myWorkers, source, workerSize} from "../common/global";
import {doMining} from "../common/basicWork";

/**
 * 采集建造
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
}