import { getObjectsByPrototype  } from 'game/utils';
import { Creep} from 'game/prototypes';
import { ERR_NOT_IN_RANGE } from 'game/constants';

export function loop() {
    let myCreep = getObjectsByPrototype(Creep).find(creep => creep.my);
	let otherCreep = getObjectsByPrototype(Creep).find(creep => !creep.my);
	if(myCreep.attack(otherCreep) === ERR_NOT_IN_RANGE) {
		myCreep.moveTo(otherCreep);
	}
}