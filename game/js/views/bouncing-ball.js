'use strict';

var $ = require('zepto-browserify').$;
var THREE = require('ensemblejs-threejs');

module.exports = {
  type: 'View',
  deps: ['Element', 'StateTracker', 'DefinePlugin'],
  func: function (element, tracker, define) {
    var camera;
    var renderer;

    var createCamera = function (dims) {
      var camera = new THREE.OrthographicCamera(
        dims.usableWidth / -2,
        dims.usableWidth / 2,
        dims.usableHeight / 2,
        dims.usableHeight / -2,
        -2000,
        1000
      );

      camera.position.set(camera.position.x, camera.position.y, 1);
      camera.aspect = dims.ratio;
      camera.updateProjectionMatrix();

      return camera;
    };

    var updateBall = function(current, prior, ball) {
      ball.position.set(current.x, current.y, ball.position.z );
    };

    var updateColour = function (current, prior, ball) {
      if (current === 'happy') {
        ball.material.color.setHex(0xffffff);
      } else {
        ball.material.color.setHex(0xff0000);
      }

      mesh.material.needsUpdate = true;
    };

    var theBallPosition = function (state) {
      return state['bouncing-ball-game'].ball.position;
    };

    var theBallDemeanour = function (state) {
      return state['bouncing-ball-game'].ball.demeanour;
    };

    var mesh;
    var material;
    var geometry;
    var createCircle = function () {
      material = new THREE.MeshBasicMaterial();

      geometry = new THREE.CircleGeometry(50, 100);
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0,0,-100);

      return mesh;
    };

    return function (dims) {
      camera = createCamera(dims);
      var scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(dims.usableWidth, dims.usableHeight);
      $('#' + element()).append(renderer.domElement);

      var ball = createCircle();
      scene.add(ball);

      tracker().onChangeOf(theBallPosition, updateBall, ball);
      tracker().onChangeOf(theBallDemeanour, updateColour, ball);

      define()('OnEachFrame', function () {
        return function () {
          renderer.render(scene, camera);
        };
      });
      define()('OnResize', function () {
        return function (dims) {
          renderer.setSize(dims.usableWidth, dims.usableHeight);
          camera.aspect = dims.ratio;
          camera.updateProjectionMatrix();
        };
      });
    };
  }
};