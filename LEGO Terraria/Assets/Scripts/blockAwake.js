#pragma strict

var cID : float;
var rID : float;

function Start() {
	cID = transform.position.x;
	rID = transform.position.y;
	generateWorld.blockObjects[cID, rID] = gameObject;
}