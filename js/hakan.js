var scene;
var camera;
var renderer;
var spotlight;
var camera2;
function createScene(){

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/(window.innerHeight/2),1, 10000);
    camera.position.x = 1;
    camera.position.y = 1000;
    camera.position.z = 1;
    camera.lookAt(new THREE.Vector3(0,0,0));

    //ikinci kamera

    camera2 = new THREE.PerspectiveCamera(24, window.innerWidth/(window.innerHeight/2),1, 600);
    camera2.position.x = 80;
    camera2.position.y = 1;
    camera2.position.z = 120;


    camera2.lookAt(new THREE.Vector3(0,0,0));

    var cameraHelper = new THREE.CameraHelper(camera2);
    scene.add(cameraHelper);

    //3.kamera

    camera3 = new THREE.PerspectiveCamera(10, window.innerWidth/window.innerHeight,1, 600);
    camera3.position.x = 200;
    camera3.position.y = 1;
    camera3.position.z = -200;


    camera3.lookAt(new THREE.Vector3(0,0,0));

    cameraHelper2 = new THREE.CameraHelper(camera3);
    scene.add(cameraHelper2);



    renderer = new THREE.WebGLRenderer({physicallCorrectLights:true, antialias:true, powerPreference:"high-performance"});
    
      renderer2 = new THREE.WebGLRenderer({physicallCorrectLights:true, antialias:true, powerPreference:"high-performance"});
    
    renderer2.shadowMap.enabled = true;
    //renderer.shadowMap.renderReverseSided = false;
    renderer2.setSize(window.innerWidth, window.innerHeight/2);
    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.renderReverseSided = false;
    
    
    
    renderer.setSize(window.innerWidth, window.innerHeight/2);

    document.getElementById("webgl").appendChild(renderer.domElement);
    
    document.getElementById("webgl").appendChild(renderer2.domElement);
    
    //const stats = Stats()
//document.body.appendChild(stats.dom);

    var ambientlight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientlight);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.update();




    createBox("box1", 20,30,30,1, 100, 1, 0xffffff, "floor", false, 0);
    createBox("box2", 20,20,20,1, 200, 1, 0xffffff, "gunes", false, 0);
    //createBox("stars", 500,100,100,1,1,1, 0xaaaa00, "stars", true, 0.1);
    createPlane("plane1", 1000,1000);
    createSpotLight();
    milkway();
    addGui();

    //ızgara
    //gridHelper = new THREE.GridHelper(10,100);
    //scene.add(gridHelper);

    render();

}

function render(){
    renderer.render(scene, camera);
     renderer2.render(scene, camera2);
    
    date = Date.now() * 0.001;
    date2 = Date.now() * 0.0011;
    orbitRadius = 200;
    xay = Math.cos(date);
    yay = Math.sin(date);
    scene.getObjectByName("box1").position.set(
  xay * orbitRadius,  200, yay * orbitRadius
);

//rotate ay

scene.getObjectByName("box1").geometry.center();

    
scene.getObjectByName("box2").position.set(Math.cos(date2) * 250,200,  Math.sin(date2) * 250);

    

x = scene.getObjectByName("box2").position.x;
    y = scene.getObjectByName("box2").position.y;
    z = scene.getObjectByName("box2").position.z;
    spotLight.position.set(x,y,z);

    //camera2 position
    camera2.lookAt(new THREE.Vector3(Math.cos(date) * orbitRadius,
  200,
  Math.sin(date) * orbitRadius));

    camera3.lookAt(new THREE.Vector3(Math.cos(date) * orbitRadius,
  200,
  Math.sin(date) * orbitRadius));



    //scene.getObjectByName("box1").rotation.y += 0.01;
    requestAnimationFrame(render);
}
function createBox(name, r, hs, ws, w,h,d,color, texture, bool, deger){
    var geometry = new THREE.SphereGeometry(r, hs, ws);
    var material = new THREE.MeshStandardMaterial({color:color, transparent:bool, opacity:deger});
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

function addGui(){
	const gui = new dat.GUI();

	const cameraFolder = gui.addFolder('Kamera2');
	cameraFolder.add(camera2.position, 'z', 0, 500);
	cameraFolder.add(camera2.position, 'x', 0, 500);
	cameraFolder.open();
	var sunfolder = gui.addFolder("Gunes");
	sunfolder.add(scene.getObjectByName("box2").position, "z", 0, 10000);
	sunfolder.open();
	
}

createScene();

