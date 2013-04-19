function Bullet(position, direction) {
	this.position = position;
	this.direction = direction;
	this.bound = 2;
}

Bullet.prototype.draw = function(context) {
	context.fillStyle = "red";
	context.beginPath();
	context.arc(this.position.x, this.position.y, 2, 0, 360, true);
	context.fill();
};


Bullet.prototype.update = function() {
	this.position.x += this.direction.x * 3;
	this.position.y += this.direction.y * 3;
};

Bullet.prototype.isHitIndex = function(asteroids) {
	for (var i = 0; i < asteroids.length; i++) {
		var distance = Math.sqrt((Math.pow(this.position.x - asteroids[i].position.x, 2) + Math.pow(this.position.y - asteroids[i].position.y, 2)));
		if (distance <= this.bound + asteroids[i].radius) 
			return i;
	}
	return -1;
};