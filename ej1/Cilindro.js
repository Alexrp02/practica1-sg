import * as THREE from '../libs/three.module.js'

class Cilindro extends THREE.Object3D {
	constructor(gui) {
		super();

		// El material se usa desde varios métodos. Por eso se alamacena en un atributo
		this.material = new THREE.MeshNormalMaterial();
		this.material.flatShading = true;

		this.createGUI(gui);

		this.createGeometry();

		this.add(this.cilindro);
	}

	createGUI(gui) {
		this.guiControls = {
			sizeX: 1,
			sizeY: 1,
			sizeZ: 1,

			rotX: 0.0,
			rotY: 0.0,
			rotZ: 0.0,

			posX: 1,
			posY: 0,
			posZ: 1,

			height: 0.5,
			radiusTop: 0.5,
			radiusBottom: 0.5,
			radialSegments: 3,


			// Un botón para dejarlo todo en su posición inicial Cuando se pulse se ejecutará esta función.
			reset: () => {
				this.cilindro.geometry.dispose();
				this.cilindro.geometry = new THREE.CylinderGeometry(0.5, 0.5, 3);

				this.guiControls.sizeX = 1;
				this.guiControls.sizeY = 1;
				this.guiControls.sizeZ = 1;

				this.guiControls.rotX = 0.0;
				this.guiControls.rotY = 0.0;
				this.guiControls.rotZ = 0.0;

				this.guiControls.posX = 0;
				this.guiControls.posY = 0.5;
				this.guiControls.posZ = 1;

				this.guiControls.height = 0.5;
				this.guiControls.radiusTop = 0.5;
				this.guiControls.radiusBottom = 0.5;
				this.guiControls.radialSegments = 3;
			}
		}


		let folder = gui.addFolder('Cilindro');


		folder.add(this.material, 'flatShading').name('Flat Shading').onChange(() => this.changeFlatShading());
		folder.add(this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name('Tamaño X : ').listen();
		folder.add(this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name('Tamaño Y : ').listen();
		folder.add(this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name('Tamaño Z : ').listen();

		folder.add(this.guiControls, 'rotX', -180.0, 180.0, 0.1).name('Rotación X : ').listen();
		folder.add(this.guiControls, 'rotY', -180.0, 180.0, 0.1).name('Rotación Y : ').listen();
		folder.add(this.guiControls, 'rotZ', -180.0, 180.0, 0.1).name('Rotación Z : ').listen();

		folder.add(this.guiControls, 'posX', -5.0, 5.0, 0.1).name('Posición X : ').listen();
		folder.add(this.guiControls, 'posY', -5.0, 5.0, 0.1).name('Posición Y : ').listen();
		folder.add(this.guiControls, 'posZ', -5.0, 5.0, 0.1).name('Posición Z : ').listen();

		folder.add(this.guiControls, 'height', 0.1, 5.0, 0.1).name('Altura : ').onChange(this.changeGeometry.bind(this)).listen();
		folder.add(this.guiControls, 'radiusTop', 0.1, 5.0, 0.1).name('Radio arriba: ').onChange(this.changeGeometry.bind(this)).listen();
		folder.add(this.guiControls, 'radiusBottom', 0.1, 5.0, 0.1).name('Radio abajo: ').onChange(this.changeGeometry.bind(this)).listen();
		folder.add(this.guiControls, 'radialSegments', 3, 36, 1).name('Segmentos : ').onChange(this.changeGeometry.bind(this)).listen();

		folder.add(this.guiControls, 'reset').name('[ Reset ]');

	}

	createGeometry() {
		this.cilindro = new THREE.Mesh(new THREE.CylinderGeometry(this.guiControls.radiusTop, this.guiControls.radiusBottom, this.guiControls.height, this.guiControls.radialSegments), this.material);

		this.axis = new THREE.AxesHelper(0.5);
		this.add(this.axis);
	}

	changeGeometry() {
		this.cilindro.geometry.dispose();
		this.cilindro.geometry = new THREE.CylinderGeometry(this.guiControls.radiusTop, this.guiControls.radiusBottom, this.guiControls.height, this.guiControls.radialSegments);
	}

	changeFlatShading() {
		this.material.flatShading = this.flatShading;
	}

	changeSize() {
		this.cilindro.scale.set(this.guiControls.sizeX, this.guiControls.sizeY, this.guiControls.sizeZ);
	}

	changeRotation() {
		this.cilindro.rotation.set(this.guiControls.rotX, this.guiControls.rotY, this.guiControls.rotZ);
	}

	changePosition() {
		this.cilindro.position.set(this.guiControls.posX, this.guiControls.posY, this.guiControls.posZ);
	}

	update() {
		this.position.set(this.guiControls.posX, this.guiControls.posY, this.guiControls.posZ);
		this.guiControls.rotX += 0.01;
		this.guiControls.rotY += 0.01;
		this.guiControls.rotZ += 0.01;

		this.cilindro.rotation.set(this.guiControls.rotX, this.guiControls.rotY, this.guiControls.rotZ);
		this.cilindro.scale.set(this.guiControls.sizeX, this.guiControls.sizeY, this.guiControls.sizeZ);
	}
}

export { Cilindro };
