'use strict';

module.exports = {
  type: 'BouncingBallGame-Behaviour',
  deps: ['StateAccess'],
  func: function (state) {
    return {
      changeColour: function () {
        var current = state().get('bouncing-ball-game')('ball')('colour');
        var newColour = (current === 0xffffff ? 0xff0000 : 0xffffff);

        return {
          'bouncing-ball-game': {
            ball: {
              colour: newColour
            }
          }
        };
      }
    };
  }
};