import * as THREE from '../libs/three.module.js'

class Robot extends THREE.Object3D {

	constructor() {
		super();

		this.createCuerpo();
		this.add(this.cuerpoMesh);
	}

	createGeometry() {

	}

	createBrazos() {
		let brazo1 = new THREE.BoxGeometry(0.2, 1, 0.2);
		let brazo2 = new THREE.BoxGeometry(0.2, 1, 0.2);
		brazo1.translate(0, -0.4, 0);
		brazo2.translate(0, -0.4, 0);


		this.brazo1Mesh = new THREE.Mesh(brazo1, new THREE.MeshNormalMaterial());
		this.brazo2Mesh = new THREE.Mesh(brazo2, new THREE.MeshNormalMaterial());
	}

	createCuerpo() {
		let cuerpo = new THREE.BoxGeometry(1, 1, 1);
		this.cuerpoMesh = new THREE.Mesh(cuerpo, new THREE.MeshNormalMaterial());

		this.createBrazos();
		let brazosMesh = new THREE.Object3D();
		this.brazo1Mesh.position.x = -0.6;
		this.brazo2Mesh.position.x = 0.6;
		brazosMesh.add(this.brazo1Mesh);
		brazosMesh.add(this.brazo2Mesh);
		brazosMesh.position.y = 0.2;
		this.cuerpoMesh.add(brazosMesh);

		this.createCabeza();
		this.cabezamesh = new THREE.Object3D();
		this.cabezamesh.add(this.cabezaMesh);
		this.cabezamesh.position.y = 0.4;
		this.cuerpoMesh.add(this.cabezamesh);
		setInterval(() => {
			// this.cuerpoMesh.rotation.y += 0.01;
			this.brazo1Mesh.rotation.x += 0.01;
			this.brazo2Mesh.rotation.x -= 0.01;
			if (this.cabezaizquierda) {
				this.cabezamesh.rotation.z += 0.01;
				if (this.cabezamesh.rotation.z > 0.5) {
					this.cabezaizquierda = false;
				}
			} else {
				this.cabezamesh.rotation.z -= 0.01;
				if (this.cabezamesh.rotation.z < -0.5) {
					this.cabezaizquierda = true;
				}
			}
		}, 1000 / 60)
	}

	createCabeza() {
		let cabeza = new THREE.SphereGeometry(0.4);
		this.cabezaizquierda = true;
		let cuello = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
		cuello.translate(0, -0.5, 0);
		this.cabezaMesh = new THREE.Mesh(cabeza, new THREE.MeshNormalMaterial());
		let cuelloMesh = new THREE.Mesh(cuello, new THREE.MeshNormalMaterial());
		this.cabezaMesh.add(cuelloMesh);

		let ojo1 = new THREE.SphereGeometry(0.1);
		let ojo2 = new THREE.SphereGeometry(0.1);
		ojo1.translate(0.2, 0.2, 0.35);
		ojo2.translate(-0.2, 0.2, 0.35);
		let ojo1Mesh = new THREE.Mesh(ojo1, new THREE.MeshNormalMaterial());
		let ojo2Mesh = new THREE.Mesh(ojo2, new THREE.MeshNormalMaterial());
		this.cabezaMesh.add(ojo1Mesh);
		this.cabezaMesh.add(ojo2Mesh);
		this.cabezaMesh.position.y = 0.6;
	}

	createPierna() {

	}

	createPie() {

	}
}
export { Robot };
