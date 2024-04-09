import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Tuerca extends THREE.Object3D {
	constructor() {
		super()
		this.material = new THREE.MeshNormalMaterial()
		this.HENDIDURAS = 7

		this.createGeometry()
		this.add(this.tuerca)
	}

	createGeometry() {
		let csg = new CSG()

		let cilindro = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 6)
		let cilindroMesh = new THREE.Mesh(cilindro, this.material)

		let cortarCentro = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 100)
		let cortarCentroMesh = new THREE.Mesh(cortarCentro)

		csg.subtract([cilindroMesh, cortarCentroMesh]);

		// Añadimos las hendiduras en el centro
		let hendidura = new THREE.CylinderGeometry(0.4, 0.4, 0.03, 100)
		let hendiduraMesh = new THREE.Mesh(hendidura)
		hendiduraMesh.translateY(0.15 - 0.03 / 2)

		for (let i = 1; i < this.HENDIDURAS; i += 2) {
			let hendiduraClone = hendiduraMesh.clone()
			hendiduraClone.translateY(-i * 0.3 / this.HENDIDURAS)
			csg.subtract([hendiduraClone])
		}

		// Añadimos las hendiduras que tiene en los lados
		let hendiduraLateral = new THREE.BoxGeometry(0.2, 2, 1)
		let hendiduraLateralMesh = new THREE.Mesh(hendiduraLateral)
		hendiduraLateral.rotateZ(Math.PI / 4)
		hendiduraLateral.translate(0.42, 0.3, 0)
		hendiduraLateral.rotateY(Math.PI / 6)

		for (let i = 0; i < 6; i++) {
			let hendiduraLateralClone = hendiduraLateral.clone()
			hendiduraLateralClone.rotateY(i * Math.PI / 3)
			csg.subtract([new THREE.Mesh(hendiduraLateralClone)])
			hendiduraLateralClone.rotateY(-i * Math.PI / 3)
			hendiduraLateralClone.rotateZ(-Math.PI / 2)
			hendiduraLateralClone.rotateY(i * Math.PI / 3)
			csg.subtract([new THREE.Mesh(hendiduraLateralClone)])

		}

		this.tuerca = csg.toMesh(this.material)
	}
}

export { Tuerca }
