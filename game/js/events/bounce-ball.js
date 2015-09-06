'use strict';

module.exports = {
  type: 'OnPhysicsFrame',
  func: function OnPhysicsFrame () {
    return function bounceBall (state, delta) {
      var pos = state.for('bouncing-ball-game').get('ball')('position');
      var radius = state.for('bouncing-ball-game').get('ball')('radius');
      var speed = state.for('bouncing-ball-game').get('ball')('speed');
      var board = state.for('bouncing-ball-game').get('board');

      var halfWidth = board('width') / 2;
      var halfHeight = board('height') / 2;

      var newPos = {
        x: pos('x') + speed('x') * delta,
        y: pos('y') + speed('y') * delta
      };

      var newSpeed = {
        x: speed('x'),
        y: speed('y')
      };

      if ((newPos.x + radius >= halfWidth) || (newPos.x - radius <= -halfWidth)) {
        newSpeed.x = speed('x') * -1;
      }
      if ((newPos.y + radius >= halfHeight) || (newPos.y - radius <= -halfHeight)) {
        newSpeed.y = speed('y') * -1;
      }

      return {
        'bouncing-ball-game': {
          ball: {
            position: newPos,
            speed: newSpeed
          }
        }
      };
    };
  }
};