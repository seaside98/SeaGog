#pragma strict

var jumpForce : float;

private var self : Rigidbody2D;

function Start () {
	self = rigidbody2D;
	self.WakeUp();
}

function FixedUpdate () {
	var grounded : RaycastHit2D = Physics2D.Raycast(transform.position, -Vector2.up, 1.0);
	if (grounded != null/*&& Input.GetButton("Jump")*/) {
		//self.velocity = new Vector2(self.velocity.x, 0);
		self.AddForce(Vector2.up * jumpForce);
		Debug.Log("d");
	}
}