var expect = require('expect.js'),
    Timer = require('./index');

describe('Timer', function() {

  it('should stop ticking when paused', function(done) {
    var t = new Timer(function() {});

    t.start();

    setTimeout(function() {

      t.pause();
      t.onTick = function() {
        throw new Error('ticked after pausing');
      };

      done();

    }, 50);
  });

  it('should call onTick', function(done) {
    var counter = 0;

    var t = new Timer(function(dt) {
      counter++;

      expect(dt)
        .to.be.a('number')
        .and.above(0);
    });

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
