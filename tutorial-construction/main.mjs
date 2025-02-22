import {createConstructionSite, getObjectsByPrototype} from 'game/utils';
import {Creep, StructureContainer, StructureTower, ConstructionSite} from 'game/prototypes';
import {ERR_NOT_ENOUGH_RESOURCES, ERR_NOT_IN_RANGE, RESOURCE_ENERGY} from "game/constants";

const container = getObjectsByPrototype(StructureContainer)[0];

export function loop() {
    let constructionSite = getObjectsByPrototype(ConstructionSite).find(i => i.my);
    let myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    let creep = myCreeps[0];

    if (!constructionSite) {
        constructionSite = createConstructionSite({
            x: container.x + 1,
            y: container.y + 1
        }, StructureTower).object;
    }

    let result = creep.build(constructionSite);
    if (result === ERR_NOT_IN_RANGE) {
        creep.moveTo(constructionSite);
    }
    if (result === ERR_NOT_ENOUGH_RESOURCES) {
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(container);
        }
    }
}