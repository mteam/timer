var bind = require('bind');

function Timer(onTick, interval) {
  this.onTick = onTick;
  this.interval = interval || 1000 / 60;

  this.last = null;
  this.paused = true;

  this.tick = bind(this, this.tick);
}

Timer.prototype = {

  schedule: function() {
    setTimeout(this.tick, this.interval);
  },

  start: function() {
    this.last = Date.now();
    this.paused = false;
    this.schedule();
  },

  pause: function() {
    this.paused = true;
  },

  tick: function() {
    if (this.paused) return;
    
    var now = Date.now();
    var dt = (now - this.last) / 1000;
    this.last = now;

    this.onTick(dt);
    this.schedule();
  }

};

module.exports = Timer;
