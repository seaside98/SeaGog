#pragma strict

var fractionX : float;
var fractionY : float;
var spaceX : float;
var spaceY : float;
var player : Transform;
var playerMover : playerMover;
private var newPos : Vector2;
private var x : int;
private var y : int;

function Update () {
	transform.position = newPos;
    playerMover.Move(x, y);
}

function FixedUpdate () {
	var me : Vector2 = transform.position;
	newPos = new Vector2(
		Mathf.Lerp(me.x, player.position.x, fractionX),
		Mathf.Lerp(me.y, player.position.y, fractionY));
	if (player.position.x - me.x > spaceX) {
		newPos.x = player.position.x - spaceX;
	} else if (me.x - player.position.x > spaceX) {
		newPos.x = player.position.x + spaceX;
	}
	if (Mathf.Abs(player.position.y - me.y) > spaceY) {
		newPos.y = spaceY;
	}
	//Limit the movements to one block
	x = 0;
	y = 0;
	if (newPos.x > 1) {
    	newPos.x -= 1;
    	x = -1;
    } else if (newPos.x < 0) {
    	newPos.x += 1;
    	x = 1;
    }
    if (newPos.y > 1) {
    	newPos.y -= 1;
    	y = -1;
    } else if (newPos.y < 0) {
    	newPos.y += 1;
    	y = 1;
    }
}