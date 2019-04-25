
function CelestatialObject(name, position, size=1) {
  this.name = name;
  this.position = position;
  this.label = null;
  this.size = size;
  this.returnButton = null;
  this.infoButton = null;
  if(size >= CelestatialObject.max_size || CelestatialObject.max_size == undefined ){
    CelestatialObject.max_size = size
  };
  CelestatialObject.prototype.addLabel.call(this);
  CelestatialObject.prototype.returnButton.call(this)
  CelestatialObject.prototype.infoButton.call(this)

}

CelestatialObject.prototype.capitalize = function(){
  return this.name.charAt(0).toUpperCase() + this.name.slice(1);
};

CelestatialObject.prototype.returnButton = function(){
  var spriteMap = new THREE.TextureLoader().load( "assets/images/return.png" );
var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
var sprite = new THREE.Sprite( spriteMaterial );
sprite.position.y = this.position.y + 1 * (this.size * 1.2);
sprite.position.x = this.position.x + 1 * (this.size * 2);
sprite.visible = false;
  sprite.scale.set(this.size*0.5, this.size*0.5, 1)

sprite.name = "returnButton"
this.returnButton = sprite;
  scene.add( this.returnButton );
}

CelestatialObject.prototype.infoButton = function(){
  var spriteMap = new THREE.TextureLoader().load( "assets/images/see.png" );
  var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
  var sprite = new THREE.Sprite( spriteMaterial );
  sprite.position.y = this.position.y + 0.3 * (this.size * 1.4);
  sprite.position.x = this.position.x + 1 * (this.size * 2);
  sprite.visible = false;
  sprite.scale.set(this.size*0.5, this.size*0.5, 1)
  sprite.name = "infoButton"
  this.infoButton = sprite;
  scene.add( this.infoButton );
}

CelestatialObject.prototype.toggleVisibily = function(toggle=true,visible=true){
      if(toggle){
      if (this.label.visible) this.label.visible = false;
      else this.label.visible = true;
      }
    else{
      this.label.visible  = visible;
    }
};

CelestatialObject.prototype.addLabel = function(){
     var _this = this;
     var loader = new THREE.FontLoader();
    loader.load( 'assets/fonts/helvetiker_regular.typeface.json', function ( font ) {
      var xMid, text;
      var color = 0xFFFFFF;
      var matDark = new THREE.LineBasicMaterial( {
        color: color,
        side: THREE.DoubleSide
      } );
      var matLite = new THREE.MeshBasicMaterial( {
        color: color,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      } );
      var message = _this.name;
      var shapes = font.generateShapes(CelestatialObject.prototype.capitalize.call(_this), 3);
      var geometry = new THREE.ShapeBufferGeometry( shapes );
      geometry.computeBoundingBox();
      xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
      geometry.translate( xMid, 0, 0 );
      // make shape ( N.B. edge view not visible )
      text = new THREE.Mesh( geometry, matLite );
      text.position.x= _this.position.x;
      text.position.y= _this.position.y-(1.5*CelestatialObject.max_size);
      text.position.z = _this.position.z;


      _this.label = text;
       scene.add(_this.label);
    });
  };


function Planet(name,position, texture=name, rotation = 0.004, scalar = 1) {
  CelestatialObject.call(this, name, position, scalar );
  this.rotation = rotation;
  this.informations = null;


  this.getInformations = function(){
    parent = this;
    $.ajax({
           type: "POST",
           url: "api.php",
           crossDomain: true,
          data: 'planet=&name='+parent.name,
           success: function (data) {
             var text = data[0].description;
             var name = data[0].planet_name;
             var tags = "planet"; //TODO
            parent.informations = {planet_name:name, text:text, tags:tags};
           },
           error: function (result) {
               console.log("Erreur de communication avec l’API")
           }
       });
  }


  this.addAtmosphere = function(color) {
    var customMaterial = new THREE.ShaderMaterial({
      uniforms: {
        "c": {
          type: "f",
          value: 1.0
        },
        "p": {
          type: "f",
          value: 1.4
        },
        glowColor: {
          type: "c",
          value: new THREE.Color(color)
        },
        viewVector: {
          type: "v3",
          value: camera.position
        }
      },
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    var geometry = new THREE.SphereGeometry(1, 32, 32)
    var glow = new THREE.Mesh(geometry.clone(), customMaterial.clone());
    // glow.position.x = this.planet.position.x;
    // glow.position.z = this.planet.position.z;
    // glow.position.y = this.planet.position.y;
    glow.scale.multiplyScalar(this.scalar * 1.2);
    glow.rotation =0;
    this.atmosphere = glow;
    this.planet.add(glow);
  }

  this.makePlanet = function(texture, scalar) {
    var geometry = new THREE.SphereGeometry(1, 32, 32)
    var material = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF
    });
    material.map = THREE.ImageUtils.loadTexture('assets/textures/' + texture + '.svg')
    var planet = new THREE.Mesh(geometry, material)
    planet.scale.multiplyScalar(scalar);
    planet.rotation.y = rotation;
    this.scalar = scalar;

    return planet;
  }

  this.addSatellite = function(name, position, texture, rotation = 0.004, scalar = 1){
    this.satellite = this.makePlanet(texture, scalar);
    this.satellite.position.x = position.x;
    this.satellite.position.y = position.y;
    this.satellite.position.z = position.z;
    this.planet.add(this.satellite);
  }

  this.addRing = function(color, inner,outer,rotation){
    var geometry = new THREE.RingGeometry( inner, outer, 32 );
    var material = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide } );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.x = rotation;
    this.planet.add(mesh)
  }

  this.getPosition = function(){
    var position = {x: this.position[0], y: this.position[1], z: this.position[2] + 30};
    return position;
  }


  this.planet = this.makePlanet(texture, scalar);
  //texts.add(this);



  this.planet.position.x = position.x;
  this.planet.position.y = position.y;
  this.planet.position.z = position.z;
  this.planet.obj = this;


  scene.add(this.planet);
  objects.push(this.planet);

}
