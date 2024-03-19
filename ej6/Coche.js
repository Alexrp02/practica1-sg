import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Coche extends THREE.Object3D {
	constructor() {
		super();
		let materialLoader = new MTLLoader();
		let objectLoader = new OBJLoader();
		materialLoader.load('../models/porsche911/911.mtl',
			(materials) => {
				objectLoader.setMaterials(materials);
				objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',
					(object) => {
						object.position.set(0, 0.6, 4)
						this.add(object);
					}, null, null)
			}
		)
	}
}

export { Coche }
