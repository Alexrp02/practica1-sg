import * as THREE from '../libs/three.module.js';
import { CSG } from '../libs/CSG-v2.js';

class Taza extends THREE.Object3D {
	constructor() {
		super();

		this.createGeometry();

		this.add(this.taza);
	}

	createGeometry() {
		let csg = new CSG();

		let material = new THREE.MeshNormalMaterial();

		let innerCylinder = new THREE.CylinderGeometry(0.5, 0.3, 1, 32);
		let outerCylinder = new THREE.CylinderGeometry(0.52, 0.32, 1, 32);
		let handle = new THREE.TorusGeometry(0.2, 0.03, 16, 100);

		innerCylinder.translate(0, 0.02, 0);
		handle.translate(-0.5, 0, 0);

		let innerMesh = new THREE.Mesh(innerCylinder, material);
		let outerMesh = new THREE.Mesh(outerCylinder, material);
		let handleMesh = new THREE.Mesh(handle, material);

		csg.union([outerMesh, handleMesh]);
		csg.subtract([innerMesh]);

		this.taza = csg.toMesh();
	}
}

export { Taza };
