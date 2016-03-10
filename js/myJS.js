/**
 * Created by zhaokang on 16/2/13.
 */
var scene = null;
var camera = null;
var renderer = null;
var id = null;
// var stat = null; //stat是测试时用来统计帧数的工具
var speed = 0.005;
//var speedSpan = document.getElementById('speed');

window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;

$(document).ready(function () {
    init();
    $('#stop').click(stop);
    $('#begin').click(begin);
    $('#speedSlower').click(speedSlower);
    $('#speedFaster').click(speedFaster);
});

function init() {
    //speedSpan.innerText = speed.toFixed(3);
    $("#speed").text(speed.toFixed(3));

    //addStatsToDocument();
    addRendererToScene();
    addCameraToScene();
    addLightToScene();
    addCubeToScene();

    renderer.render(scene, camera);

    id = requestAnimationFrame(draw);
}

function stop() {
    if (id !== null) {
        cancelAnimationFrame(id);
        id = null;
    }
}
function begin() {
    if (id === null)
        id = requestAnimationFrame(draw);
}
function speedFaster() {
    speed += 0.001;
    //speedSpan.innerText = speed.toFixed(3);
    $("#speed").text(speed.toFixed(3));
}
function speedSlower() {
    if (speed > 0.001)
        speed -= 0.001;
    //speedSpan.innerText = speed.toFixed(3);
    $("#speed").text(speed.toFixed(3));
}

function draw() {
    //stat.begin();

    cube.rotation.y = (cube.rotation.y + speed) % (Math.PI * 2);
    renderer.render(scene, camera);
    id = requestAnimationFrame(draw);

    //stat.end();
}

// ======从init() 的代码中抽象出来的函数======
function addRendererToScene() {
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('mainCanvas')
    });
    renderer.setClearColor(0x000000);
    scene = new THREE.Scene();
}


// 测试时使用
function addStatsToDocument() {
    stat = new Stats();
    stat.domElement.style.position = 'absolute';
    stat.domElement.style.right = '0px';
    stat.domElement.style.top = '0px';
    document.body.appendChild(stat.domElement);
}

function addCameraToScene() {
    camera = new THREE.PerspectiveCamera(65, 4 / 3, 1, 8);
    camera.position.set(0,0,0);
    camera.lookAt(new THREE.Vector3(0, 0, -1));
    scene.add(camera);
}

function addLightToScene() {
    //var light = new THREE.PointLight(0xffffff, 1, 10);
    //light.position.set(10, 15, 20);
    //scene.add(light);

    //var light2 = new THREE.PointLight(0xffffff, 1, 10);
    //light2.position.set(0, 0, 0);
    //scene.add(light2);

    var light3 = new THREE.AmbientLight(0xffffff);
    scene.add(light3);
}

function addCubeToScene() {
    // 实验性代码, 并不能运行
    //var materials = [];
    //for (var i = 0; i < 6; ++i) {
    //    materials.push(new THREE.MeshBasicMaterial({
    //        map: THREE.ImageUtils.loadTexture('../img/' + i + '.png', {}, function() {
    //            renderer.render(scene, camera);
    //        }),
    //        overdraw: true
    //    }));
    //}
    //
    //var materials = new THREE.MeshNormalMaterial();
    //materials.side = THREE.DoubleSide;

    var materialArray = [];
    for (var i = 0; i < 6; ++i) {
        //var texture = THREE.ImageUtils.loadTexture('testImg/' + i + '.png', {}, function() {
        var texture = THREE.ImageUtils.loadTexture('img/' + i + '.jpg', {}, function() {
            renderer.render(scene, camera);
        });
        var material = new THREE.MeshLambertMaterial( { map: texture } );
        material.side = THREE.DoubleSide;
        materialArray.push(material);

    }
    var materials = new THREE.MeshFaceMaterial(materialArray);

    //var cube = new THREE.Mesh(new THREE.CubeGeometry(5, 5, 5),
    //new THREE.MeshFaceMaterial(materials));
    cube = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10), materials);
    scene.add(cube);
}
// ================END==================