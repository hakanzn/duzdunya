var scene;
var camera;
var renderer;
var spotlight;
function createScene(){

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight,1, 10000);
    camera.position.x = 1;
    camera.position.y = 1000;
    camera.position.z = 1;
    camera.lookAt(new THREE.Vector3(0,0,0));



    renderer = new THREE.WebGLRenderer({physicallCorrectLights:true, antialias:true, powerPreference:"high-performance"});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.renderReverseSided = false;
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("webgl").appendChild(renderer.domElement);

    var ambientlight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientlight);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();




    createBox("box1", 20,20,20,1, 100, 1, 0xffffff, "floor");
    createBox("box2", 20,20,20,1, 200, 1, 0xffffff, "gunes");
    createPlane("plane1", 1000,1000);
    createSpotLight();
    milkway();

    render();

}

function render(){
    renderer.render(scene, camera);
    date = Date.now() * 0.001;
    date2 = Date.now() * 0.0011;
    orbitRadius = 200;
    scene.getObjectByName("box1").position.set(
  Math.cos(date) * orbitRadius,
  200,
  Math.sin(date) * orbitRadius
);
scene.getObjectByName("box2").position.set(
  Math.cos(date2) * 250,
  200,
  Math.sin(date2) * 250
);

x = scene.getObjectByName("box2").position.x;
    y = scene.getObjectByName("box2").position.y;
    z = scene.getObjectByName("box2").position.z;
    spotLight.position.set(x,y,z);



    //scene.getObjectByName("box1").rotation.y += 0.01;
    requestAnimationFrame(render);
}
function createBox(name, r, hs, ws, w,h,d,color, texture){
    var geometry = new THREE.SphereGeometry(r, hs, ws);
    var material = new THREE.MeshStandardMaterial({color:color});
    var loader = new THREE.TextureLoader();
    material.map = loader.load("https://hakanzn.github.io/kuredunya/textures/"+texture+".jpg");
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(w,h,d);

    mesh.name = name;
    scene.add(mesh);

}

function createPlane(name, w,h){
    var geometry = new THREE.PlaneGeometry(w,h);
    var material = new THREE.MeshStandardMaterial({color:0xffffff});
    var loader = new THREE.TextureLoader();
    material.map = loader.load("https://hakanzn.github.io/kuredunya/textures/duz.jpg");
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(1,1,1);
    mesh.rotation.x = -Math.PI / 2;
    mesh.name = name;
    //mesh.rotateX( Math.PI / 2 );

    scene.add(mesh);

}

function createSpotLight(){
    spotLight = new THREE.PointLight(0xffffff,4,400);

    spotLight.position.set(1,1000,1);
    spotLight.castShadow = true;
    scene.add(spotLight);

}

function milkway(){
    const loader = new THREE.CubeTextureLoader();
loader.setPath( 'https://hakanzn.github.io/kuredunya/textures/MilkyWay/' );

const textureCube = loader.load( [
	'dark-s_px.jpg', 'dark-s_nx.jpg',
	'dark-s_py.jpg', 'dark-s_ny.jpg',
	'dark-s_pz.jpg', 'dark-s_nz.jpg'
] );

scene.background=textureCube;
scene.add(textureCube);

}

createScene();
