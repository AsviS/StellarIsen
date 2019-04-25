var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
var renderer = new THREE.WebGLRenderer({
  alpha: false,
  antialias: true
});
var mouse;
var raycaster;
var objects = [];
var controls = new THREE.OrbitControls(camera);
controls.minDistance = 10;
controls.maxDistance = 300;

renderer.setSize(window.innerWidth, window.innerHeight);

var objTo = document.getElementById('wrapper');
objTo.appendChild(renderer.domElement);



mouse = new THREE.Vector2();
raycaster = new THREE.Raycaster();


var starField = new StarField();

// Planets creation
var planets = {
  sun: new Planet('sun', {
    x: 0,
    y: 0,
    z: 0
  }, 'sun', 0.2, 8),
  mercury: new Planet('mercury', {
    x: 20,
    y: 0,
    z: 0
  }, 'mercury', 0.2, 1),
  venus: new Planet('venus', {
    x: 45,
    y: 0,
    z: 0
  }, 'venus', 0.2, 1.6),
  earth: new Planet('earth', {
    x: 65,
    y: 0,
    z: 0
  }, 'earth', (1.2 * (Math.PI / 180)) % 360 * 0.4, 1.5),
  mars: new Planet('mars', {
    x: 80,
    y: 0,
    z: 0
  }, 'mars', 0.4, 1),
  jupiter: new Planet('jupiter', {
    x: 100,
    y: 0,
    z: 0
  }, 'jupiter', 0.2, 4),
  saturn: new Planet('saturn', {
    x: 120,
    y: 0,
    z: 0
  }, 'saturn', 0.2, 3.8),
  uranus: new Planet('uranus', {
    x: 140,
    y: 0,
    z: 0
  }, 'uranus', 0.2, 2.8),
  neptune: new Planet('neptune', {
    x: 160,
    y: 0,
    z: 0
  }, 'neptune', 0.2, 2.7)

}

//  planets['earth'].addAtmosphere(0xFFFFFF);
planets['earth'].addSatellite('moon', {
  x: 2.5,
  y: 0,
  z: 0
}, 'moon', ((2 * Math.PI / 180)) % 360 * 0.4, 0.3);
planets['saturn'].addRing(0xb28d59, 1.5, 1.3, 360);
planets['saturn'].addRing(0x9c6314, 1.8, 1.7, 360);

// Events listeners
controls.addEventListener('change', render);
document.addEventListener("keydown", onDocumentKeyDown, true);
document.addEventListener('mousedown', onDocumentMouseDown, true);

var boxes = {
  login: false,
  bookmarks: false,
  searchbar: false,
  register: false
}

function onBoxKeyDown(event) {
  if (event.key === 'Escape') {
    hideBox();
    alterListeners(revoke = true);
  }
};


function onDocumentKeyDown(event) {
  if (event.key === 'c') { // 13 is enter
    displayConstellations();
  }
  if (event.key === 't') { // 13 is enter
    for (var elt in planets) {
      if (planets[elt].planet.visible == true)
        CelestatialObject.prototype.toggleVisibily.call(planets[elt]);
    }
  }
  if (event.key === 'l') {
    displayLogin();
  }
  if (event.key === 's') {
    displaySearch();
  }
  if (event.key === 'b') {
    boxes.bookmarks = true;
    displayBookmarks();
  }
};

function alterListeners(revoke = false) {
  if (revoke) {
    document.addEventListener('keydown', onDocumentKeyDown, true);
    document.addEventListener('mousedown', onDocumentMouseDown, true);
    document.removeEventListener('keydown', onBoxKeyDown, true);
  } else {
    document.removeEventListener('mousedown', onDocumentMouseDown, true);
    document.removeEventListener('keydown', onDocumentKeyDown, true);
    document.addEventListener('keydown', onBoxKeyDown, true);
  }
}


var actual_planet = {
  name: ""
};

function onDocumentMouseDown(event) {
  event.preventDefault();
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    var from = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };
  }
  if (intersects[0].object.obj instanceof Planet) {

    var to = {
      x: intersects[0].object.position.x,
      y: intersects[0].object.position.y,
      z: intersects[0].object.position.z + (5 * (intersects[0].object.obj.scalar + 2))
    };
    var tween = new TWEEN.Tween(from)
      .to(to, 3000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function() {
        camera.position.set(this.x, this.y, this.z);
        controls.target = intersects[0].object.position;
        controls.update();
      })
      .onComplete(function() {
        controls.update();
        for (var key in planets) {
          CelestatialObject.prototype.toggleVisibily.call(planets[key], toggle = false, visible = false);
          if (key != intersects[0].object.obj.name) {
            planets[key].planet.visible = false;
          } else {
            planets[key].returnButton.visible = true;
            if (actual_planet.name != intersects[0].object.obj.name) {
              planets[key].infoButton.visible = true;
              actual_planet = intersects[0].object.obj;
            }

          }
        }
      }).start();
  } else if (intersects[0].object.name == "returnButton") {
    var to = {
      x: 50,
      y: 20,
      z: 50
    };
    var tween = new TWEEN.Tween(from)
      .to(to, 1500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function() {
        $("#informations").fadeOut();
        $("#picture").fadeOut();
        camera.position.set(this.x, this.y, this.z);
        controls.update();
      })
      .onComplete(function() {
        controls.update();
        for (var elt in planets) {

          CelestatialObject.prototype.toggleVisibily.call(planets[elt], toggle = false, visible = true);

          planets[elt].returnButton.visible = false;
          planets[elt].infoButton.visible = false;
          planets[elt].planet.visible = true;
          actual_planet = {
            name: ""
          };


        }
      }).start();

  } else if (intersects[0].object.name == "infoButton") {
    actual_planet.getInformations();
    var to = {
      x: camera.position.x + 20,
      y: camera.position.y + 10,
      z: camera.position.z
    };
    var tween = new TWEEN.Tween(from)
      .to(to, 1500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function() {
        camera.position.set(this.x, this.y, this.z);
      })
      .onComplete(function() {
        for (var elt in planets) {
          planets[elt].infoButton.visible = false;
        }

        $('#box').load('app/view/infosBox.html', function() {

          $("#informations .card-header")[0].innerText = "Système solaire";
          $(" #informations .card-title")[0].innerText = actual_planet.informations.planet_name;
          $("#informations .card-text")[0].innerText = actual_planet.informations.text;
          $("#informations #tags")[0].innerText = actual_planet.informations.tags;
        }).hide().fadeIn();
      }).start();
  }
}

camera.position.z = 50;
camera.position.x = 0;
camera.position.y = 0;
 controls.target = planets['earth'].planet.position;
controls.enableKeys =false;
controls.enablePan = false;
controls.update();

function animate(time) {
  TWEEN.update(time);
  requestAnimationFrame(animate);
  render();
  update();
}

function update() {
  controls.update();
  planets['earth'].planet.rotation.y += planets['earth'].rotation;
  planets['earth'].satellite.rotation.y += 0.02;
}

function render() {
  renderer.render(scene, camera);
}

requestAnimationFrame(animate);
animate();


window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
