import { CatmullRomCurve3 } from 'three';
import * as THREE from '../libs/three.module.js'

class Churro extends THREE.Object3D {
	constructor(gui) {
		super();
		this.createGui(gui);
		this.createGeometry();

		this.add(this.contorno);

		setInterval(() => {
			this.rotateZ(0.01)
		}, 10)
	}

	createGeometry() {
		this.shape = new THREE.Shape();
		this.shape.moveTo(0, 0);
		this.shape.quadraticCurveTo(0.2, 0.3, 0.2, 0.4);
		this.shape.quadraticCurveTo(0.2, 0.5, 0.15, 0.5);
		this.shape.quadraticCurveTo(0.05, 0.5, 0, 0.35);
		this.shape.quadraticCurveTo(-0.05, 0.5, -0.15, 0.5);
		this.shape.quadraticCurveTo(-0.2, 0.5, -0.2, 0.4);
		this.shape.quadraticCurveTo(-0.2, 0.3, 0, 0);

		let hole = new THREE.Shape();
		hole.absellipse(0, 0.25, 0.05, 0.05, 0, Math.PI * 2, true, 0);
		let hole2 = new THREE.Shape();
		hole2.absellipse(0, 0.1, 0.03, 0.03, 0, Math.PI * 2, true, 0);
		this.shape.holes.push(hole);
		this.shape.holes.push(hole2);

		this.shape = rotateShape(this.shape, Math.PI)

		let pts = [];
		pts.push(new THREE.Vector3(0, 0, 0));
		pts.push(new THREE.Vector3(0, -0.5, 1));
		pts.push(new THREE.Vector3(0, 0.5, 2));
		pts.push(new THREE.Vector3(-1, 1, 2));

		let path = new THREE.CatmullRomCurve3(pts);
		let options = {
			steps: 50,
			curveSegments: 4,
			extrudePath: path,
		}

		let material = new THREE.MeshNormalMaterial();

		// this.geometry = new THREE.ShapeGeometry(this.shape);
		this.geometry = new THREE.ExtrudeGeometry(this.shape, options);
		this.contorno = new THREE.Mesh(this.geometry, material);
	}

	createGui(gui) {
		this.guiControls = {

		}

		let folder = gui.addFolder("Churro");
	}

	update() {
	}
};

function rotateShape(aShape, angle, res = 6, center = new THREE.Vector2(0, 0)) {
	var points = aShape.extractPoints(res).shape; // Extraemos los puntos 2D del shape
	points.forEach((p) => {
		p.rotateAround(center, angle); // Los giramos
	});

	let holes = aShape.getPointsHoles(res)
	holes.forEach((hole) => {
		hole.forEach(point => {
			point.rotateAround(center, angle);
		});
	});
	let shape = new THREE.Shape(points);
	holes.forEach(hole => {
		let holeShape = new THREE.Shape(hole)
		shape.holes.push(holeShape);
	});

	return shape; // Construimos y devolvemos un nuevo shape
}

export { Churro }
