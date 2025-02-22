import {getObjectsByPrototype} from 'game/utils';
import {Creep, StructureTower, StructureContainer} from 'game/prototypes';
import {ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL, RESOURCE_ENERGY, ERR_NOT_ENOUGH_ENERGY} from 'game/constants';

export function loop() {
    const tower = getObjectsByPrototype(StructureTower)[0];
    const container = getObjectsByPrototype(StructureContainer)[0];
    const myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    const enemyCreeps = getObjectsByPrototype(Creep).filter(creep => !creep.my)[0];

    towerAttack(tower, enemyCreeps);

    for (let creep of myCreeps) {
        if (creep.store[RESOURCE_ENERGY] === 0) {
            goHarvest(creep, container);
        }
        if (creep.store[RESOURCE_ENERGY] >= 10) {
            goTransfer(creep, tower);
        }
        towerAttack(tower, enemyCreeps);
    }
}
function towerAttack(tower, enemyCreeps) {
    if (tower.store[RESOURCE_ENERGY] < 10) {
        console.log("防御塔能量不足");
    } else {
        console.log("防御塔能量足够");
        tower.attack(enemyCreeps);
    }
}

function goHarvest(creep, container) {
    console.log("goHarvest");
    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        console.log("goHarvest 1");
        creep.moveTo(container);
    }
    console.log("goHarvest result " + creep.store[RESOURCE_ENERGY]);
}

function goTransfer(creep, target) {
    console.log("goTransfer");
    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        console.log("goTransfer 1");
        creep.moveTo(target);
    }
}