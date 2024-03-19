import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'


class Dormitorio extends THREE.Object3D {
	constructor() {
		super();
		let materialLoader = new MTLLoader();
		let objectLoader = new OBJLoader();
		materialLoader.load('../models/11-obj/Room.mtl',
			(materials) => {
				objectLoader.setMaterials(materials);
				objectLoader.load('../models/11-obj/Room.obj',
					(object) => {
						object.scale.set(0.05, 0.05, 0.05);
						this.add(object);
					}, null, null)
			}
		)
	}
}

export { Dormitorio }
