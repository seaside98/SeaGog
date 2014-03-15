#pragma strict

var jumpForce : float;
var speed : float;
private var extraJump : boolean;

private var self : Rigidbody2D;
private var facingRight : boolean;
private var grounded : boolean;

function Awake () {
	self = rigidbody2D;
	facingRight = true;
	grounded = true;
	extraJump = true;
}

function Start () {
	self.WakeUp();
}

function Update () {
	var playerPos : Vector2 = new Vector2(transform.position.x, transform.position.y);
	var hit : RaycastHit2D = Physics2D.Raycast(playerPos, -Vector2.up, 0.9, 1 << LayerMask.NameToLayer("World"));
	if (hit.collider != null) {
		grounded = true;
	}
	
	var key : float = Input.GetAxis("LeftRight"); 
	if ((facingRight && key < 0) || (!facingRight && key > 0)) {
	    Flip();
	}
	rigidbody2D.velocity = new Vector2(speed * key, rigidbody2D.velocity.y); 

	if (Input.GetButtonDown("Jump") && extraJump) {
  		extraJump = false;
  		rigidbody2D.velocity = new Vector2(rigidbody2D.velocity.x, 0);
        rigidbody2D.AddForce(new Vector2(0f, jumpForce));
    } else if (Input.GetButtonDown("Jump") && grounded) {
    	grounded = false;
        rigidbody2D.velocity = new Vector2(rigidbody2D.velocity.x, 0);
        rigidbody2D.AddForce(new Vector2(0f, jumpForce));
        extraJump = true;
        
    }
    
    if (transform.position.x > 1) {
    	transform.position.x = 1 - transform.position.x;
    } else if (transform.position.x < 0) {
    	transform.position.x = transform.position.x + 1;
    }
}

function Flip () {
    // Switch the way the player is labelled as facing.
    facingRight = !facingRight;

    // Multiply the player's x local scale by -1.
    var theScale : Vector3 = transform.localScale;
    theScale.x *= -1;
    transform.localScale = theScale;
}