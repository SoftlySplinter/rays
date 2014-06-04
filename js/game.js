function Player(x, y, direction) {
  this.x = x;
  this.y = y;
  this.direction = direction;
}

function Map(size) {
  this.size = size;
  this.wallGrid = new UInt8Array(size * size);
}

Map.prototype.cast = function(point, angle, range) {
  var self = this;
  var sin = Math.sin(angle);
  var cos = Math.cos(angle);
  var noWall = { length2: Infinity };

  return ray({x: point.x, y: point.y, height: 0, distance: 0});

  function ray(origin) {
    var stepX = step(sin, cos, origin.x, origin.y);
    var stepY = step(cos, sin, origin.y, origin.x);
    var nextStep = stepX.length2 < stepY.length2
      ? inspect(stepX, 1, 0, origin.distance, stepX.y)
      : inspect(stepY, 0, 1, origin.distance, stepY.x);

    if(nextStep.distance > range) return [origin];
    return [origin].concat(ray(nextStep));
  }

  function step(rise, run, x, y, inverted) {
    if(run === 0) return noWall;
    var dx = run > 0 ? Math.floor(x + 1) - x: Math.ceil(x - 1) - x;
    var dy = dx * (rise / run);
    return {
      x: inverted ? y + dy : x + dx,
      y: inverted ? x + dx : y + dy,
      length2: dx * dx + dy * dy;
    }
  }
}
