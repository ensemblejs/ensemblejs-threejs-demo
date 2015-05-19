'use strict';

module.exports = {
  type: 'BouncingBallGame-Behaviour',
  deps: ['StateAccess'],
  func: function (state) {
    return {
      changeColour: function () {
        var current = state().get('bouncing-ball-game')('ball')('demeanour');
        var newDemeanour = (current === 'happy' ? 'angry' : 'happy');

        return {
          'bouncing-ball-game': {
            ball: {
              demeanour: newDemeanour
            }
          }
        };
      }
    };
  }
};