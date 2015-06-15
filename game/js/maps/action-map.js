'use strict';

module.exports = {
  type: 'ActionMap',
  deps: ['BouncingBallGame-Behaviour'],
  func: function(behaviour) {
    return {
      'button1': [{target: behaviour().changeColour, onRelease: true}]
    };
  }
};