var expect = require('expect.js'),
    Timer = require('./index');

describe('Timer', function() {
  describe('#pause', function() {
    it('should stop ticking', function(done) {
      var t = new Timer;

      t.start();

      setTimeout(function() {

        t.pause();
        t.onTick = function() {
          throw new Error('ticked after pausing');
        };

        done();

      }, 50);
    });
  });

  describe('#onTick', function() {
    it('should work', function(done) {
      var t = new Timer,
          counter = 0;

      t.onTick = function(dt) {
        counter++;

        expect(dt)
          .to.be.a('number')
          .and.above(0);
      };

      t.start();

      setTimeout(function() {
        t.pause();

        expect(counter)
          .to.be.a('number')
          .and.above(0);

        done();
      }, 300);
    });
  });
});
