function Asteroid(position, velocity, radius) {
	this.position = position;
	this.velocity = velocity;
	this.radius = radius;
	this.bound = radius;
	this.imgId = Math.floor(Math.random() * 2) + 1;
};

Asteroid.randomAsteroid = function(x_bound, y_bound) {
	if (Math.random() > 0.5) {
		var x = Math.random() > 0.5 ? 0 : x_bound;
		var y = Math.random() * y_bound;
		var x_offset = Math.random() * 5 * (x === 0 ? 1 : -1);
		var y_offset = Math.random() * 10 - 5;
	} else {
		var x = Math.random() * x_bound;
		var y = Math.random() > 0.5 ? 0 : y_bound;
		var x_offset = Math.random() * 10 - 5;
		var y_offset = Math.random() * 5 * (y === 0 ? 1 : -1);
	}
	
	var radius = Math.random() * 25 + 5;
	return new Asteroid({ x: x, y: y }, { x: x_offset, y: y_offset }, radius);
};

Asteroid.prototype.draw = function(context) {
	context.save();
	context.translate(this.position.x, this.position.y); 
	context.rotate(Util.facingAngle(this.velocity) + Math.PI); 

	var img = document.getElementById("asteroid" + this.imgId + "-img");
	context.drawImage(img, 0 - this.radius * 1.25, 0 - this.radius * 1.25, this.radius * 2.5, this.radius * 2.5);
// context.fillStyle = "blue";
	// if (this.velocity.x === 0 && this.velocity.y === 0)
	// 	context.fillRect(0 - 5, 0 - 5, 10, 10);
	// else
	// 	context.fillRect(0 - 5, 0 - 15, 10, 10);
	context.restore();
};

Asteroid.prototype.update = function() {
	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;
};