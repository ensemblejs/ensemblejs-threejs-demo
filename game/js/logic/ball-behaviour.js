'use strict';

module.exports = {
  type: 'BouncingBallGame-Behaviour',
  func: function () {
    return {
      changeColour: function (state) {
        var current = state.for('bouncing-ball-game').get('ball')('demeanour');
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