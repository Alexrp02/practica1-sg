import * as THREE from '../libs/three.module.js'

class Esfera extends THREE.Object3D {
	constructor(gui) {
		super();

		// El material se usa desde varios métodos. Por eso se alamacena en un atributo
		this.material = new THREE.MeshNormalMaterial();
		this.material.flatShading = true;

		this.createGUI(gui);

		this.createGeometry();

		this.add(this.esfera);
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
			posY: 1.5,
			posZ: 0,

			radius: 0.3,
			widthSegments: 3,
			heightSegments: 3,


			// Un botón para dejarlo todo en su posición inicial Cuando se pulse se ejecutará esta función.
			reset: () => {
				this.esfera.geometry.dispose();
				this.esfera.geometry = new THREE.SphereGeometry(0.5, 3, 3);

				this.guiControls.sizeX = 1;
				this.guiControls.sizeY = 1;
				this.guiControls.sizeZ = 1;

				this.guiControls.rotX = 0.0;
				this.guiControls.rotY = 0.0;
				this.guiControls.rotZ = 0.0;

				this.guiControls.posX = 0;
				this.guiControls.posY = 1.5;
				this.guiControls.posZ = 0;

				this.guiControls.radius = 0.3;
				this.guiControls.widthSegments = 3;
				this.guiControls.heightSegments = 3;
			}
		}


		let folder = gui.addFolder('Esfera');


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

		folder.add(this.guiControls, 'radius', 0.1, 5.0, 0.1).name('Radio : ').onChange(this.changeGeometry.bind(this)).listen();
		folder.add(this.guiControls, 'widthSegments', 3, 15, 1).name('Segmentos de ancho : ').onChange(this.changeGeometry.bind(this)).listen();
		folder.add(this.guiControls, 'heightSegments', 2, 15, 1).name('Segmentos de alto : ').onChange(this.changeGeometry.bind(this)).listen();

		folder.add(this.guiControls, 'reset').name('[ Reset ]');

	}

	createGeometry() {
		this.esfera = new THREE.Mesh(new THREE.SphereGeometry(this.guiControls.radius, this.guiControls.widthSegments, this.guiControls.heightSegments), this.material);

		this.axis = new THREE.AxesHelper(0.5);
		this.add(this.axis);
	}

	changeGeometry() {
		this.esfera.geometry.dispose();
		this.esfera.geometry = new THREE.SphereGeometry(this.guiControls.radius, this.guiControls.widthSegments, this.guiControls.heightSegments);
	}

	update() {
		this.position.set(this.guiControls.posX, this.guiControls.posY, this.guiControls.posZ);
		this.guiControls.rotX += 0.01;
		this.guiControls.rotY += 0.01;
		this.guiControls.rotZ += 0.01;

		this.esfera.rotation.set(this.guiControls.rotX, this.guiControls.rotY, this.guiControls.rotZ);
		this.esfera.scale.set(this.guiControls.sizeX, this.guiControls.sizeY, this.guiControls.sizeZ);
	}
}

export { Esfera };
