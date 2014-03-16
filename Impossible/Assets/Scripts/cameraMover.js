#pragma strict

var fraction : float;
var player : Transform;

function FixedUpdate () {
	transform.position = Vector2(
		Mathf.Lerp(transform.position.x, player.position.x, fraction),
		Mathf.Lerp(transform.position.y, player.position.y, fraction));
}