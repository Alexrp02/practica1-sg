import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js'

class Auriculares extends THREE.Object3D {
	constructor() {
		super()

		this.material = new THREE.MeshNormalMaterial()
		this.createGeometry()

		this.add(this.auriculares)
	}

	createGeometry() {
		let auriculares = new CSG()

		// Los dos auriculares
		let auricularDerecho = this._createAuricular()
		let auricularIzquierdo = this._createAuricular()
		auricularIzquierdo.translateZ(1.5)
		auricularIzquierdo.rotateY(Math.PI)

		auriculares.union([auricularIzquierdo, auricularDerecho])

		// Diadema

		// let diademaPath = new THREE.CatmullRomCurve3(diademaPts)
		let diademaPath = new THREE.CatmullRomCurve3(
			[new THREE.Vector3(0, 0.6, 1.65),
			new THREE.Vector3(0, 0.8, 1.6),
			new THREE.Vector3(0, 1.2, 1.25),
			new THREE.Vector3(0, 1.2, 0.25),
			new THREE.Vector3(0, 0.8, -0.1),
			new THREE.Vector3(0, 0.6, -0.15)]

		)

		let diademaGeometry = new THREE.TubeGeometry(diademaPath, 20, 0.04, 20)
		let diademaMesh = new THREE.Mesh(diademaGeometry, this.material)


		let auricularesMesh = auriculares.toMesh()
		auricularesMesh.add(diademaMesh)

		this.auriculares = auricularesMesh

	}

	_createAuricular() {
		let auricular = new CSG()

		let semiesfera = new THREE.SphereGeometry(0.5, 20, 20, 0, Math.PI * 2)
		let semiesferaMesh = new THREE.Mesh(semiesfera, this.material)

		let cortarSemiesfera = new THREE.BoxGeometry(2, 2, 2)
		cortarSemiesfera.translate(0, 0, 1)
		let cortarSemiesferaMesh = new THREE.Mesh(cortarSemiesfera, this.material)

		auricular.subtract([semiesferaMesh, cortarSemiesferaMesh])

		let torus = new THREE.TorusGeometry(0.5, 0.1, 20, 20)
		let torusMesh = new THREE.Mesh(torus, this.material)

		auricular.union([torusMesh])

		let auricularMesh = auricular.toMesh()
		auricularMesh.scale.y = 1.4

		return auricularMesh;
	}
}

export { Auriculares }
