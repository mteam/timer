function Timer() {
  this.last = null;
  this.pause = true;
  this.timeout = null;

  this.step = this.step.bind(this);
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
      dt = now - this.last;

  this.last = now;

  this.onTick(dt);
  this.schedule();
};

Timer.prototype.pause = function() {
  this.paused = true;
  this.unschedule();
};

Timer.prototype.onTick = function() {};

module.exports = Timer;
