'use strict';

var THREE = require('ensemblejs-threejs');

function updateBall (current, prior, ball) {
  ball.position.set(current.x, current.y, ball.position.z );
}

function updateColour (current, prior, ball) {
  if (current === 'happy') {
    ball.material.color.setHex(0xffffff);
  } else {
    ball.material.color.setHex(0xff0000);
  }

  ball.material.needsUpdate = true;
}

function theBallPosition (state) {
  return state['bouncing-ball-game'].ball.position;
}

function theBallDemeanour (state) {
  return state['bouncing-ball-game'].ball.demeanour;
}

function theBallRadius (state) {
  return state['bouncing-ball-game'].ball.radius;
}

function theBoardDimensions (state) {
  return state['bouncing-ball-game'].board;
}

module.exports = {
  type: 'OnClientReady',
  deps: ['Config', 'StateTracker', 'DefinePlugin', 'CurrentState', '$'],
  func: function OnReady (config, tracker, define, currentState, $) {
    var camera;
    var renderer;

    function createCamera (dims) {
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
    }

    function createCircle () {
      var material = new THREE.MeshBasicMaterial();

      var geometry = new THREE.CircleGeometry(currentState().get(theBallRadius), 100);
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0,0,-100);

      return mesh;
    }

    function createBoard () {
      var material = new THREE.MeshBasicMaterial();
      material.color.setHex(0x55ff55);

      var geometry = new THREE.PlaneBufferGeometry(currentState().get(theBoardDimensions).width, currentState().get(theBoardDimensions).height);
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0,0,-101);

      return mesh;
    }

    return function setup (dims) {
      camera = createCamera(dims);
      var scene = new THREE.Scene();
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(dims.usableWidth, dims.usableHeight);
      $()('#' + config().client.element).append(renderer.domElement);

      var ball = createCircle();
      var board = createBoard();
      scene.add(board);
      scene.add(ball);

      tracker().onChangeOf(theBallPosition, updateBall, ball);
      tracker().onChangeOf(theBallDemeanour, updateColour, ball);

      define()('OnRenderFrame', function OnReady () {
        return function () {
          renderer.render(scene, camera);
        };
      });

      define()('OnResize', function OnReady () {
        return function (dims) {
          renderer.setSize(dims.usableWidth, dims.usableHeight);
          camera.aspect = dims.ratio;
          camera.updateProjectionMatrix();
        };
      });

    };
  }
};