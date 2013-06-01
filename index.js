var bind = require('bind');

function Timer(onTick) {
  this.last = null;
  this.paused = true;
  this.timeout = null;
  this.onTick = onTick;

  this.step = bind(this, this.step);
}

Timer.prototype.schedule = function() {
  if (this.paused) return;
  this.timeout = setTimeout(this.step, 1000 / 60);
};

Timer.prototype.unschedule = function() {
  clearTimeout(this.timeout);
};

Timer.prototype.start = function() {
  this.last = Date.now();
  this.paused = false;
  this.schedule();
};

Timer.prototype.step = function() {
  var now = Date.now(),
      dt = (now - this.last) / 1000;

  this.last = now;

  this.onTick(dt);
  this.schedule();
};

Timer.prototype.pause = function() {
  this.paused = true;
  this.unschedule();
};

module.exports = Timer;
