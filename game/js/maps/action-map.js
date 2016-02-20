'use strict';

module.exports = {
  type: 'ActionMap',
  deps: ['BouncingBallGame-Behaviour'],
  func: function(behaviour) {
    return {
      'primary': [{call: behaviour().changeColour, onRelease: true}]
    };
  }
};