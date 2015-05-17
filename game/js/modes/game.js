'use strict';

module.exports = {
  type: 'BouncingBallGame',
  deps: ['DefinePlugin', 'BouncingBallGame-Behaviour'],
  func: function(define, behaviour) {
    return function() {
      define()('StateSeed', function () {
        return {
          'bouncing-ball-game': {
            ball: {
              position: {
                x: 100,
                y: 50
              },
              speed: {
                x: 100,
                y: 50
              },
              colour: 0xffffff
            }
          }
        };
      });

      define()('ServerSideUpdate', ['StateAccess'], function(state) {
        return function (delta) {
          var pos = state().get('bouncing-ball-game')('ball')('position');
          var speed = state().get('bouncing-ball-game')('ball')('speed');

          var newPos = {
            x: pos('x') + speed('x') * delta,
            y: pos('y') + speed('y') * delta
          };

          var newSpeed = {
            x: speed('x'),
            y: speed('y')
          };

          if ((newPos.x > 500) || (newPos.x < 0)) {
            newSpeed.x = speed('x') * -1;
          }
          if ((newPos.y > 500) || (newPos.y < 0)) {
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
      });

      define()('ActionMap', function () {
        return {
          'button1': [{target: behaviour().changeColour, onRelease: true}]
        };
      });
    };
  }
};