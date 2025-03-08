import {
    getSpawnEnergy,
    spawnEnergyEnough
} from "../common/basicFactory";
import {buildaaaaaTower, createTower, getAvailableWorker} from "../common/basicWork";
import {buildingQueue} from "../common/global";
import {createConstructionSite, getObjectsByPrototype} from "game/utils";
import {ConstructionSite, Creep, StructureTower} from "game/prototypes";
import {ERR_NOT_ENOUGH_RESOURCES, ERR_NOT_IN_RANGE, RESOURCE_ENERGY} from "game/constants";

let towerState;
let flagState;

/**
 * 建造
 * @param spawn
 * @param container
 * @param source
 */
export function doBuilding(spawn, container, source) {
    if (!spawnEnergyEnough(spawn)) {
        return;
    }
    let worker = getAvailableWorker(source ? source : container);
    if (!worker) {
        console.log("当前无空闲工人");
        return;
    }
    buildFlag();
    buildTower(getSquarePosition(spawn.x, spawn.y, 1));

    buildingQueueConsumer(spawn);

    buildaaaaaTower(source ? source : container);
}

/**
 * building队列消费者
 * @param spawn
 */
function buildingQueueConsumer(spawn) {
    let currentEnergy = getSpawnEnergy(spawn);
    while (buildingQueue.length > 0) {
        let pos = buildingQueue[0]; // 查看队列的第一个元素
        let costEnergy = 0;
        if (currentEnergy < costEnergy) {
            console.log("建造防御塔能量还差", costEnergy - currentEnergy);
            break;
        }
        currentEnergy -= costEnergy;
        if (buildingQueue.length > 1) {
            buildingQueue.shift();
            createTower(getAvailableWorker(), pos.x, pos.y);
        } else {
            // 如果队列中只有一个元素，则不做处理或根据需要处理
            break;
        }
    }
}

/**
 * building队列生产者
 */
function buildingQueueProducer(pos) {
    buildingQueue.push(pos);
}

/**
 * 建立集合点
 * @param position
 */
function buildFlag(position) {
    // createRallyFlag(mySpawn.x - 1, mySpawn.y - 1);
}

/**
 * 建造防御塔
 * @param position
 */
function buildTower(position) {
    if (!towerState) {
        towerState = true;
        for (let pos of position) {
            buildingQueueProducer(pos);
        }
    }
}

/**
 * 以基地为中心，边长2n的正方形四角坐标
 * @param centerX
 * @param centerY
 * @param distance
 * @returns {[{x: number, y: *},{x: *, y: *},{x: number, y: number},{x: *, y: number}]}
 */
function getSquarePosition(centerX, centerY, distance) {
    return [
        // {x: centerX - distance, y: centerY + distance},
        {x: centerX + distance, y: centerY + distance},
        // {x: centerX - distance, y: centerY - distance},
        // {x: centerX + distance, y: centerY - distance}
    ];
}
