import {getObjectsByPrototype} from 'game/utils';
import {Creep, Flag} from 'game/prototypes';

export function loop() {
    const flags = getObjectsByPrototype(Flag);
    const myCreeps = getObjectsByPrototype(Creep).filter(creep => creep.my);
    for (let creep of myCreeps) {

        let closestFlag = creep.findClosestByPath(flags);
        creep.moveTo(closestFlag);
    }

}