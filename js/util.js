function Util() {}

Util.facingAngle = function(velocity) {
	if (velocity.x > 0)
		return Math.atan(velocity.y / velocity.x) + 90 * Math.PI / 180;
	if (velocity.x < 0)
		return Math.atan(velocity.y / velocity.x) + Math.PI + 90 * Math.PI / 180;
	if (velocity.y > 0)
		return Math.PI / 2 + 90 * Math.PI / 180;
	if (velocity.y < 0)
		return -Math.PI / 2 + 90 * Math.PI / 180;
	return 0;
};