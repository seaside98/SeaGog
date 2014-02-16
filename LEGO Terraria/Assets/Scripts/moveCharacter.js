#pragma strict

var speed : float = 6.0;
var jumpSpeed : float = 8.0;
var gravity : float = 20.0;

private var moveDirection : Vector3 = Vector3.zero;
private var grounded : boolean = true;
private var contacts : ContactPoint2D[];

// "Bobbing" animation from 1D Perlin noise.

// Range over which height varies.
var heightScale = 1.0;

// Distance covered per second along X axis of Perlin plane.
var xScale = 1.0;

function Update() {
	moveDirection = Vector3(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"), 0);
	moveDirection = transform.TransformDirection(moveDirection);
	moveDirection *= speed;
	
	if (Input.GetButton ("Jump") && grounded) {
		grounded = false;
		moveDirection.y = jumpSpeed;
	}
	// Apply gravity
	if (!grounded) {
		//moveDirection.y -= gravity * Time.deltaTime;
	} else {
		moveDirection.y = 0.0;
	}
	
	// Move the controller
	transform.Translate(moveDirection * Time.deltaTime);
	
	/*var height = heightScale * Mathf.PerlinNoise(Time.time * xScale, 0.0);
	var height2 = heightScale * Mathf.PerlinNoise(0.0, height);
	var pos = transform.position;
		Debug.Log(height+", "+height2);
	pos.y = height2 + 9.6;
	transform.position = pos;*/
}

function OnCollisionEnter2D(col : Collision2D) {
	for (var point : ContactPoint2D in contacts) {
		Debug.Log(point);
	}
	grounded = true;
}