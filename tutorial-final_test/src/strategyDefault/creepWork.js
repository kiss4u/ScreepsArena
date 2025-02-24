import {
    buildingQueue,
    creepCreateQueue, freshMiners,
    minerSize,
    myMiners,
    mySpawn,
    myWorkers,
    source,
    workerSize
} from "../common/global";
import {doMining} from "../common/basicWork";
import {doBuilding} from "./buildingFactory";


/**
 * 采集建造
 */
export function doWork() {
    freshMiners();
    // 挖矿
    doMining(myMiners, mySpawn, null, source);
    // 建造
    doBuilding(mySpawn);
}



