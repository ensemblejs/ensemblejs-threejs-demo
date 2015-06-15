'use strict';

module.exports = {
  type: 'StateSeed',
  func: function() {
    return {
      'bouncing-ball-game': {
        ball: {
          position: { x: 100, y: 50 },
          speed: { x: 100, y: 50 },
          radius: 25,
          demeanour: 'happy'
        },
        board: {
          width: 500,
          height: 500
        }
      }
    };
  }
};