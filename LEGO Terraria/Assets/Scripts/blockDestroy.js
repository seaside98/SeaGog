#pragma strict

function Update () {
	var diffX : float = Mathf.Abs(renderWorld.locationX - transform.position.x + 17);
	var diffY : float = Mathf.Abs(renderWorld.locationY - transform.position.y + 10);
	if (diffX > 19 || diffY > 12) {
		Destroy(gameObject);
	}
}