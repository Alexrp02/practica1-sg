import * as THREE from '../libs/three.module.js'
import { CSG } from '../libs/CSG-v2.js';
import { Shape } from 'three';

class Lunes extends THREE.Object3D {
	constructor() {
		super();

		this.createGeometry();

		// Añadir la malla a la escena
		this.add(this.lunes);
	}

	createGeometry() {
		// Crear la geometría
		let csg = new CSG();
		let shape = new THREE.Shape();
		shape.moveTo(0, 0);
		shape.lineTo(0, 1);
		shape.lineTo(0.75, 1);
		shape.quadraticCurveTo(1, 1, 1, 0.75);
		shape.lineTo(1, 0);
		shape.closePath();

		let options = {
			depth: 1,
			steps: 20,
			bevelEnabled: true,
			bevelThickness: 0.1,
			bevelSize: 0.2,
			bevelSegments: 20
		}

		this.geometry = new THREE.ExtrudeGeometry(shape, options);

		// Crear el material
		this.material = new THREE.MeshNormalMaterial()

		// Crear la malla
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		let cortarBase = new THREE.BoxGeometry(3, 0.2, 3);
		let cortarBaseMesh = new THREE.Mesh(cortarBase);
		cortarBaseMesh.position.y = -0.1;
		cortarBaseMesh.position.x = 1;
		csg.subtract([this.mesh, cortarBaseMesh]);


		let cortarMedio2 = new THREE.Shape()
		cortarMedio2.moveTo(0, 0);
		cortarMedio2.moveTo(0, 0.2)
		cortarMedio2.lineTo(1, 0.2)
		cortarMedio2.lineTo(1, 0)
		cortarMedio2.lineTo(0, 0)
		cortarMedio2.closePath();
		options.bevelSize = 0.1;
		let cortarMedio2Extrude = new THREE.ExtrudeGeometry(cortarMedio2, options);
		cortarMedio2Extrude.rotateX(-Math.PI / 2)
		cortarMedio2Extrude.translate(0, 0.2, 0.6);
		cortarMedio2Extrude.scale(3, 1, 1)
		let cortarMedio2Mesh = new THREE.Mesh(cortarMedio2Extrude, this.material);

		csg.subtract([cortarMedio2Mesh]);

		let cortarCilindro = new THREE.CylinderGeometry(0.1, 0.1, 2, 12);
		cortarCilindro.rotateX(Math.PI / 2);
		cortarCilindro.translate(0.4, 0.4, 0.4);

		let cortarCilindroMesh = new THREE.Mesh(cortarCilindro, this.material);
		csg.subtract([cortarCilindroMesh]);

		let cortarCono = new THREE.CylinderGeometry(0.005, 0.35, 2, 30);
		cortarCono.rotateX(Math.PI);
		cortarCono.scale(1, 1, 0.75)
		cortarCono.translate(0.5, 0.8, 0.5)

		let cortarConoMesh = new THREE.Mesh(cortarCono, this.material);

		csg.subtract([cortarConoMesh]);

		this.lunes = csg.toMesh();

	}

	update() {
		this.lunes.rotation.y += 0.01;
	}
}

export { Lunes }
