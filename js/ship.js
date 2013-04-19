function Ship(position, velocity, game) {
	this.position = position;
	this.velocity = velocity;
	this.game = game;
	this.bound = 20;
	this.autoFire = false;
}

Ship.prototype.draw = function(context) {
	context.save();
	context.translate(this.position.x, this.position.y); 
	context.rotate(Util.facingAngle(this.velocity)); 
 // 	context.fillStyle = "red";
	// context.beginPath();
	// context.arc(0, 0, 20, 0, 360, true);
	// context.stroke();
	//context.fillStyle = "black";
	//context.fillRect(0 - 15, 0 - 15, 30, 30);
	var img = document.getElementById("fighter-img");
	context.drawImage(img, 0 - 25, 0 - 25, 50, 50);
	// context.fillStyle = "blue";
	// if (this.velocity.x === 0 && this.velocity.y === 0)
	// 	context.fillRect(0 - 5, 0 - 5, 10, 10);
	// else
	// 	context.fillRect(0 - 5, 0 - 15, 10, 10);
	context.restore();
};

Ship.prototype.facingAngle = function() {
	if (this.velocity.x > 0)
		return Math.atan(this.velocity.y / this.velocity.x) + 90 * Math.PI / 180;
	if (this.velocity.x < 0)
		return Math.atan(this.velocity.y / this.velocity.x) + Math.PI + 90 * Math.PI / 180;
	if (this.velocity.y > 0)
		return Math.PI / 2 + 90 * Math.PI / 180;
	if (this.velocity.y < 0)
		return -Math.PI / 2 + 90 * Math.PI / 180;
	return 0;
};

Ship.prototype.isHit = function(asteroids) {
	for (var i = 0; i < asteroids.length; i++) {
		var distance = Math.sqrt((Math.pow(this.position.x - asteroids[i].position.x, 2) + Math.pow(this.position.y - asteroids[i].position.y, 2)));
		if (distance <= this.bound + asteroids[i].radius) 
			return true;
	}
	return false;
};

Ship.prototype.update = function() {
	var x_bound = this.game.width;
	var y_bound = this.game.height;
	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;

	if (this.position.x <= this.bound)
		this.position.x = this.bound;
	else if (this.position.x >= x_bound - this.bound)
		this.position.x = x_bound - this.bound;

	if (this.position.y <= this.bound)
		this.position.y = this.bound;
	else if (this.position.y >= y_bound - this.bound)
		this.position.y = y_bound - this.bound;

	if (this.autoFire)
		this.fireBullet();
};

Ship.prototype.power = function(dx, dy) {
	this.velocity.x = Math.max(-3, Math.min(3, this.velocity.x + dx));
	this.velocity.y = Math.max(-3, Math.min(3, this.velocity.y + dy));
};

Ship.prototype.fireBullet = function() {
	if (this.velocity.x === 0 && this.velocity.y === 0) { return; }
	var bullet = new Bullet(jQuery.extend({}, this.position), jQuery.extend({}, this.velocity));
	this.game.bullets.push(bullet);
};