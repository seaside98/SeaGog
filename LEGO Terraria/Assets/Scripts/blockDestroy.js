#pragma strict

private var timePassed : float;

function Update () {
	if (gameObject.activeInHierarchy) {
		timePassed = 0.0;
	} else {
		timePassed += Time.deltaTime;
		if (timePassed > 1.0) {
			Destroy(gameObject);
		}
	}
}