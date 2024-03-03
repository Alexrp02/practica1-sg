import * as THREE from '../libs/three.module.js'

class Cono extends THREE.Object3D {
	constructor(gui) {
		super();

		// El material se usa desde varios métodos. Por eso se alamacena en un atributo
		this.material = new THREE.MeshNormalMaterial();
		this.material.flatShading = true;

		this.createGUI(gui);

		this.createGeometry();

		this.add(this.cono);
	}

	createGUI(gui) {
		this.guiControls = {
			sizeX: 1,
			sizeY: 1,
			sizeZ: 1,

			rotX: 0.0,
			rotY: 0.0,
			rotZ: 0.0,

			posX: 0,
			posY: 0.5,
			posZ: 1,


			// Un botón para dejarlo todo en su posición inicial Cuando se pulse se ejecutará esta función.
			reset: () => {
				this.guiControls.sizeX = 1;
				this.guiControls.sizeY = 1;
				this.guiControls.sizeZ = 1;

				this.guiControls.rotX = 0.0;
				this.guiControls.rotY = 0.0;
				this.guiControls.rotZ = 0.0;

				this.guiControls.posX = 0;
				this.guiControls.posY = 0.5;
				this.guiControls.posZ = 1;
			}
		}


		let folder = gui.addFolder('Cono');


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

		folder.add(this.guiControls, 'reset').name('[ Reset ]');

	}

	createGeometry() {
		this.cono = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.5, 3), this.material);

		this.axis = new THREE.AxesHelper(0.5);
		this.add(this.axis);
	}

	changeFlatShading() {
		this.material.flatShading = this.flatShading;
	}

	changeSize() {
		this.cono.scale.set(this.guiControls.sizeX, this.guiControls.sizeY, this.guiControls.sizeZ);
	}

	changeRotation() {
		this.cono.rotation.set(this.guiControls.rotX, this.guiControls.rotY, this.guiControls.rotZ);
	}

	changePosition() {
		this.cono.position.set(this.guiControls.posX, this.guiControls.posY, this.guiControls.posZ);
	}

	update() {
		this.position.set(this.guiControls.posX, this.guiControls.posY, this.guiControls.posZ);
		this.guiControls.rotX += 0.01;
		this.guiControls.rotY += 0.01;
		this.guiControls.rotZ += 0.01;
		this.cono.rotation.set(this.guiControls.rotX, this.guiControls.rotY, this.guiControls.rotZ);
		this.cono.scale.set(this.guiControls.sizeX, this.guiControls.sizeY, this.guiControls.sizeZ);
	}
}

export { Cono };
