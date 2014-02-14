#pragma strict

var speed : float = 6.0;
var jumpSpeed : float = 50.0;

private var moveDirection : Vector3 = Vector3.zero;
private var grounded;

function Update() {
	moveDirection = Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
	moveDirection = transform.TransformDirection(moveDirection);
	moveDirection *= speed;
	
	if (Input.GetButton ("Jump") && grounded) {
		grounded = false;
		moveDirection.y = jumpSpeed;
	}
	// Apply gravity
	//moveDirection.y -= gravity * Time.deltaTime;
	
	// Move the controller
	transform.Translate(moveDirection * Time.deltaTime);
}

function OnCollisionEnter2D(col : Collision2D) {
	grounded = true;
}