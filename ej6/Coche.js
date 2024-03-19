import * as THREE from '../libs/three.module.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { OBJLoader } from '../libs/OBJLoader.js'

class Coche extends THREE.Object3D {
	constructor() {
		super();
		this.morro = new THREE.Vector3(0, 0, -1);
		this.velocidad = 0;
		let materialLoader = new MTLLoader();
		let objectLoader = new OBJLoader();
		materialLoader.load('../models/porsche911/911.mtl',
			(materials) => {
				objectLoader.setMaterials(materials);
				objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',
					(object) => {
						// object.position.set(0, 0.6, 4)
						object.scale.set(0.5, 0.5, 0.5);
						this.add(object);
					}, null, null)
			}
		)
		setInterval(() => {
			this.translateOnAxis(this.morro, this.velocidad);
			this.velocidad *= 0.99;
		}, 1000 / 60)
		setInterval(() => {
			if (this.pressedKeys["w"]) this.velocidad += 0.001;
			if (this.pressedKeys["s"]) this.velocidad -= 0.001;
			if (this.pressedKeys["a"]) this.rotateY(0.01);
			if (this.pressedKeys["d"]) this.rotateY(-0.01);
		}, 1000 / 120)

		this.pressedKeys = {};
		this.setControls();
	}
	setControls() {

		document.addEventListener("keydown", (event) => {
			console.log(event.key)
			switch (event.key) {
				case "w":
					this.pressedKeys["w"] = true;
					this.pressedKeys["s"] = false;
					break;
				case "s":
					this.pressedKeys["s"] = true;
					this.pressedKeys["w"] = false;
					break;
				case "a":
					this.pressedKeys["a"] = true;
					this.pressedKeys["d"] = false;
					break;
				case "d":
					this.pressedKeys["d"] = true;
					this.pressedKeys["a"] = false;
					break;
				case " ":
					this.velocidad = 0;
					break;
			}
		})
		document.addEventListener("keyup", (event) => {
			switch (event.key) {
				case "w":
					this.pressedKeys["w"] = false;
					break;
				case "s":
					this.pressedKeys["s"] = false;
					break;
				case "a":
					this.pressedKeys["a"] = false;
					break;
				case "d":
					this.pressedKeys["d"] = false;
					break;
			}
		})
	}
}

export { Coche }
