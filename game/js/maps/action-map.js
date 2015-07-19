'use strict';

module.exports = {
  type: 'ActionMap',
  deps: ['BouncingBallGame-Behaviour'],
  func: function(behaviour) {
    return {
      'primary': [{target: behaviour().changeColour, onRelease: true}]
    };
  }
};