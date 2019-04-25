  var myriades = {};
  createConstellations();


  /**
   * Class allowing to create constellation.
   * @param name constellation's name
   * @param ids stars identifers
   * @param links Links beetween all stars
   */
  function Myriade(name, ids, links) {
    this.name = name;
    this.stars = new THREE.Geometry();
    this.lines = []
    this.stars_ = [];
    this.ids = ids;
    this.links = links;
    Myriade.prototype.addStars.call(this);
  }

  /**
   * Caps on first letter
   */
  Myriade.prototype.capitalize = function() {
    return this.name.charAt(0).toUpperCase() + this.name.slice(1);
  };


  /**
   * Add a text next to the constellation.
   * NOT IMPLEMENTED  because problems with reversed texts.
   */
  Myriade.prototype.addLabel = function() {
    var _this = this;
    var loader = new THREE.FontLoader();
    loader.load('assets/fonts/helvetiker_regular.typeface.json', function(font) {
      var xMid, text;
      var color = 0xFFFFFF;
      var matDark = new THREE.LineBasicMaterial({
        color: color,
        side: THREE.DoubleSide
      });
      var matLite = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      var message = _this.name;
      var shapes = font.generateShapes(Myriade.prototype.capitalize.call(_this), 0.1 * _this.stars_[0].position.x);
      var geometry = new THREE.ShapeBufferGeometry(shapes);
      geometry.computeBoundingBox();
      xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      geometry.translate(xMid, 0, 0);
      // make shape ( N.B. edge view not visible )
      text = new THREE.Mesh(geometry, matLite);
      text.lookAt(camera.position);
      text.position.x = _this.stars_[0].position.x;
      text.position.y = _this.stars_[0].position.y;
      text.position.z = _this.stars_[0].position.z;

      _this.label = text;
      scene.add(_this.label);
    });
  };

  /**
   * Algorithm allowing to draw lines beetween constellation’s stars
   */
  Myriade.prototype.drawLine = function() {
    for (var e = 0; e < this.links.length - 1; e++) {
      if (this.links[e] != this.links[e + 1]) {
        for (var i in this.stars_) {
          if (this.stars_[i].hip == this.links[e + 1]) {
            var s2 = this.stars_[i].position;
          }
          if (this.stars_[i].hip == this.links[e]) {
            var s1 = this.stars_[i].position;
          }

        }
        Myriade.prototype.addLine.call(this, s1, s2);
      }

    }
    // Myriade.prototype.addLabel.call(this); // TODO Labels retournés...
  };

  /**
   * Allows to hide constellations
   */
  Myriade.prototype.toggleVisibily = function() {
    this.lines.forEach(function(obj) { // loop through array of objects
      if (obj.visible) obj.visible = false;
      else obj.visible = true;
    });
  };


  /**
   * Add a mesh point.
   */
  Myriade.prototype.addPoint = function(position) {

    var star = new THREE.Vector3();
    var starsMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF
    });
    star = position;
    this.stars.vertices.push(star);
    var point = new THREE.Points(this.stars, starsMaterial);
    scene.add(point);
  };

  /**
   * Add line beetween to stars
   */
  Myriade.prototype.addLine = function(star1, star2) {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(star1.x, star1.y, star1.z));
    geometry.vertices.push(new THREE.Vector3(star2.x, star2.y, star2.z));
    var material = new THREE.LineBasicMaterial({
      color: 0x4286f4
    });
    var line = new THREE.Line(geometry, material);
    this.lines.push(line);
    Myriade.lines = []
    scene.add(line);
  };

  /**
   * Get and add stars belonging to a constellation
   */
  Myriade.prototype.addStars = function() {
    var _this = this;
    $.ajax({
      type: "POST",
      url: "api.php",
      crossDomain: true,
      data: 'stars=&hip=' + _this.ids,
      success: function(data) {
        for (var s in data) {
          _this.index = 1;
          _this.stars_.push({
            hip: data[s].hip,
            position: {
              x: data[s].x * 200,
              y: data[s].y * 200,
              z: data[s].z * 200
            }
          });
          Myriade.prototype.addPoint.call(_this, {
            x: data[s].x * 200,
            y: data[s].y * 200,
            z: data[s].z * 200
          });
        }
        Myriade.prototype.drawLine.call(_this);
      },
      error: function(err) {
        console.log("Erreur communication avec l’API")
      }
    });
  };


  /**
   * Create a starfield with stars at random positons.
   */
  function StarField() {
    this.create = function() {
      starsGeometry = new THREE.Geometry();
      for (var i = 0; i < 10000; i++) {
        var star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread(2000);
        star.y = THREE.Math.randFloatSpread(2000);
        star.z = THREE.Math.randFloatSpread(2000);
        starsGeometry.vertices.push(star);
      }

      var starsMaterial = new THREE.PointsMaterial({
        color: 0x888888
      });
      starField = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(starField);
    }

    this.create();
  }



  /**
   * Delete identical values in an array
   */
  function unique(array) {
    return $.grep(array, function(el, index) {
      return index === $.inArray(el, array);
    });
  }



  /**
   * Create all the constellations
   */
  function createConstellations() {
    $.ajax({
      type: "POST",
      url: "api.php",
      crossDomain: true,
      data: 'constellations=',
      success: function(data) {
        for (var identifer in data) {
          var constellation = data[identifer];
          var links = constellation.liaison.split(' ');
          var ids = unique(links);
          var stars_number = ids.length;
          ids = ids.join();
          myriades[constellation.identifiant] = new Myriade(constellation.name, ids, links)
        }
      },
      error: function(err) {
        console.log("Erreur communication avec l’API")
      }
    });
  }
