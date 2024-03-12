import * as THREE from '../libs/three.module.js'

class Rubi extends THREE.Object3D {
	constructor(gui) {
		super();

		this.createGeometry();

		this.createGui(gui)

		this.add(this.rubi);
		setInterval(() => {
			this.rubi.rotation.y += 0.01;
		}, 1);
	}

	createGeometry() {
		this.rubi = new THREE.Object3D();

		this.shape = new THREE.Shape();
		this.shape.moveTo(0, 0);
		this.shape.lineTo(0.5, 0.5);
		this.shape.lineTo(0, 1)
		this.shape.lineTo(-0.5, 0.5);
		this.shape.lineTo(0, 0);


		let options = {
			depth: 0.01, steps: 1, curveSegments: 4, bevelThickness: 0.1,
			bevelSize: 0.2, bevelSegments: 8
		};


		let geometry = new THREE.ExtrudeGeometry(this.shape, options);
		let material = new THREE.MeshNormalMaterial();
		let mesh = new THREE.Mesh(geometry, material);
		this.rubi.add(mesh);
		this.rubi.scale.set(0.5, 1, 1);
		this.rubi.position.y = 0.2;
	}

	createGui(gui) {
		this.guiControls = {
			depth: 0.01,
			steps: 1,
			curveSegments: 4,
			bevelThickness: 0.1,
			bevelSize: 0.2,
			bevelSegments: 8,
			reset: () => {
				this.guiControls.depth = 0.01;
				this.guiControls.steps = 1;
				this.guiControls.curveSegments = 4;
				this.guiControls.bevelThickness = 0.1;
				this.guiControls.bevelSize = 0.2;
				this.guiControls.bevelSegments = 8;
			}
		}

		let folder = gui.addFolder('Rubi');
		folder.add(this.guiControls, 'depth', 0.01, 0.5, 0.01).name('Profundidad').listen();
		folder.add(this.guiControls, 'steps', 1, 5, 1).name('Pasos').listen();
		folder.add(this.guiControls, 'curveSegments', 1, 20, 1).name('Segmentos').listen();
		folder.add(this.guiControls, 'bevelThickness', 0.01, 0.5, 0.01).name('Grosor').listen();
		folder.add(this.guiControls, 'bevelSize', 0.01, 0.5, 0.01).name('Tamaño').listen();
		folder.add(this.guiControls, 'bevelSegments', 1, 20, 1).name('Segmentos bisel').listen();
		folder.add(this.guiControls, 'reset').name('Reset');
	}

	update() {
		let options = {
			depth: this.guiControls.depth, steps: this.guiControls.steps, curveSegments: this.guiControls.curveSegments,
			bevelThickness: this.guiControls.bevelThickness, bevelSize: this.guiControls.bevelSize, bevelSegments: this.guiControls.bevelSegments
		};

		let geometry = new THREE.ExtrudeGeometry(this.shape, options);
		this.rubi.children[0].geometry.dispose();
		this.rubi.children[0].geometry = geometry;
		this.rubi.children[0].geometry.needsUpdate = true;
	}
}

export { Rubi };
