import {
    buildingQueue,
    creepCreateQueue, freshMiners,
    minerSize,
    myMiners,
    mySpawn,
    myWorkers,
    sources,
    containers,
    workerSize
} from "../common/global";
import {doMining} from "../common/basicWork";
import {doBuilding} from "./buildingFactory";
import {getRange} from "game/utils";
import {RESOURCE_ENERGY} from "game/constants";

/**
 * 采集建造
 */
export function doWork() {
    // freshMiners();
    // 挖矿
    let source =
        sources !== null && sources.length > 1 ? findNearest(sources) : sources[0];
    let container =
        containers !== null && containers.length > 1 ? findNearest(containers) : containers[0];

    console.log("扫描到矿点数量：", sources.length, "选择矿点：", source? source.id : "",
        "存储器数量：", containers.length, "选择存储器：", container? container.id : "");

    doMining(myMiners, mySpawn, container, source);
    // 建造
    doBuilding(mySpawn, container, source);
}

function findNearest(targets) {
    let target;
    let nearest = 9999999;
    for (let i = 0; i < targets.length; i++) {
        let temp = targets[i];
        if (temp.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
            console.log("矿点能量存储已耗尽", temp.id);
            continue;
        }
        let range = getRange(mySpawn, temp);
        if (range < nearest) {
            nearest = range;
            target = temp;
        }
    }
    return target;
}



