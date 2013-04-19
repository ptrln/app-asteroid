function Game(context) {
	this.NUM_ASTEROIDS = 20;

	this.context = context;
	this.width = this.context.canvas.width;
	this.height = this.context.canvas.height;
};

Game.prototype.draw = function() {
	this.context.clearRect(0, 0, this.width, this.height);
	var img = document.getElementById("starfield-img");
	this.context.drawImage(img, 0, 0, this.width, this.height);
	for(var i = 0; i < this.asteroids.length; i++) {
		this.asteroids[i].draw(this.context);
	}
	for(var i = 0; i < this.bullets.length; i++) {
		this.bullets[i].draw(this.context);
	}
	this.ship.draw(this.context);
	
};

Game.prototype.update = function() {
	for(var i = this.asteroids.length - 1; i >= 0 ; i--) {
		this.asteroids[i].update();
		if (this.offScreen(this.asteroids[i])) {
			this.asteroids.splice(i, 1);
			this.asteroids.push(Asteroid.randomAsteroid(this.width, this.height));
		}
	}
	for(var i = this.bullets.length - 1; i >= 0 ; i--) {
		this.bullets[i].update();
		if (this.offScreen(this.bullets[i])) {
			this.bullets.splice(i, 1);
		} else {
			var hit = this.bullets[i].isHitIndex(this.asteroids);
			if (hit !== -1) {
				var hitAsteroid = this.asteroids[hit];
				if (hitAsteroid.radius >= 10) {
					var a = Asteroid.randomAsteroid(this.width, this.height);
					var b = Asteroid.randomAsteroid(this.width, this.height);
					a.position = jQuery.extend({}, hitAsteroid.position);
					b.position = jQuery.extend({}, hitAsteroid.position);
					a.radius = hitAsteroid.radius / 2;
					b.radius = hitAsteroid.radius / 2;
					a.imgId = b.imgId = hitAsteroid.imgId;
					this.asteroids.push(a);
					this.asteroids.push(b);
				}
				
				this.asteroids.splice(hit, 1);
				this.bullets.splice(i, 1);
			}
		}
	}

	this.ship.update();
	if (this.ship.isHit(this.asteroids)) {
		alert("You dead!\nSurvived " + ((new Date() - this.startTime)/1000) + " seconds.\nPress [Enter] to restart.");
		clearInterval(this.intervalID);
	}
};

Game.prototype.start = function() {
	clearInterval(this.intervalID);
	this.startTime = new Date();
	this.ship = new Ship({ x: this.width / 2, y: this.height / 2 }, { x : 0, y: 0 }, this);
	this.bullets = [];

	this.asteroids = (function(){
		var asteroids = [];
		for (var i = 0; i < this.NUM_ASTEROIDS; i++)
			asteroids.push(Asteroid.randomAsteroid(this.width, this.height));
		return asteroids;
	}.bind(this))();

	this.intervalID = setInterval(function(){
		this.update();
		this.draw();
	}.bind(this), 1000 / 32);
};

Game.prototype.offScreen = function(object) {
	return object.position.x < 0 - object.bound || 
		object.position.x > this.width + object.bound ||
		object.position.y < 0 - object.bound || 
		object.position.y > this.height + object.bound;
};

Game.prototype.registerKeyBind = function() {
	var that = this;
	key('f', function(){ that.ship.autoFire = !that.ship.autoFire; });
	key('up', function(){ that.ship.power(0, -1); });
	key('down', function(){ that.ship.power(0, 1); });
	key('left', function(){ that.ship.power(-1, 0); });
	key('right', function(){ that.ship.power(1, 0); });
	key('w', function(){ that.ship.power(0, -1); });
	key('s', function(){ that.ship.power(0, 1); });
	key('a', function(){ that.ship.power(-1, 0); });
	key('d', function(){ that.ship.power(1, 0); });
	key('space', function(){ that.ship.fireBullet(); });
	key('enter', function(){ this.start(); }.bind(this));
	return this;
};

$(function(){
	new Game($("#myCanvas")[0].getContext("2d")).registerKeyBind().start();
});
