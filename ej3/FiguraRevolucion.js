import * as THREE from "../libs/three.module.js";

class FiguraRevolucion extends THREE.Object3D {
  constructor(gui) {
    super();

    this.material = new THREE.MeshNormalMaterial();
    this.material.flatShading = true;

    this.createGUI(gui);

    this.createGeometry();

    this.add(this.figurarevolucion);
	this.figurarevolucion.position.x = 1.5;
	this.figurarevolucion.rotateOnAxis(new THREE.Vector3(0,0,1), Math.PI/2);
	this.rotateOnAxis(new THREE.Vector3(0,0,1), Math.PI/2);
  }

  createGUI(gui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = {
      radio: 1,
      altura: 1,
      resolucion: 3,

      reset: () => {
        this.guiControls.radio = 1;
        this.guiControls.altura = 1;
        this.guiControls.resolucion = 3;
      },
    };

    var folder = gui.addFolder("Figura de revolución");
    folder.add(this.guiControls, "radio", 0.1, 5, 0.1).name("Radio: ").listen();
    folder
      .add(this.guiControls, "altura", 0.1, 5, 0.1)
      .name("Altura: ")
      .listen();
    folder
      .add(this.guiControls, "resolucion", 3, 20, 1)
      .name("Resolución: ")
      .listen();
  }

  createGeometry() {
    // Definir la forma de la sección transversal
    this.shape = new THREE.Shape();
    this.shape.moveTo(0, 0);
    this.shape.lineTo(0.6, 0);
    this.shape.lineTo(0.6, 0.2);
    this.shape.lineTo(0.2, 0.2);
    this.shape.lineTo(0.2, 0.8);
    this.shape.lineTo(0.4, 0.8);
    this.shape.lineTo(0.4, 1);
    this.shape.lineTo(0, 1);

    const geometry = new THREE.LatheGeometry(
      this.shape.getPoints(),
      12,
      0,
      Math.PI * 2
    );

    this.figurarevolucion = new THREE.Mesh(geometry, this.material);

    this.axis = new THREE.AxesHelper(0.5);
    this.add(this.axis);
  }

  update() {}
}

export { FiguraRevolucion };
