var scene;
var camera;
var renderer;
function createScene(){

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,1, 1000);
    camera.position.x = 15;
    camera.position.y = 40;
    camera.position.z = 40;
    camera.lookAt(new THREE.Vector3(0,0,0));



    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("webgl").appendChild(renderer.domElement);

    var ambientlight = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambientlight);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();




    createBox("box1", 30,32,32,1, 1, 1, 0xfffff);

    render();

}

function render(){
    renderer.render(scene, camera);
    //scene.getObjectByName("box1").rotation.x += 0.01;
    //scene.getObjectByName("box1").rotation.y += 0.01;
    requestAnimationFrame(render);
}
function createBox(name, r, hs, ws, w,h,d,color){
    var geometry = new THREE.SphereGeometry(r, hs, ws);
    var material = new THREE.MeshBasicMaterial({color:color});
    var loader = new THREE.TextureLoader();
    material.map = loader.load("https://hakanzn.github.io/kuredunya/textures/vahdet.jpeg");
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(w,h,d);
    mesh.name = name;
    scene.add(mesh);

}

createScene();
