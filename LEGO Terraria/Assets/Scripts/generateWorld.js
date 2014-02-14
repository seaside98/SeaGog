#pragma strict

var maxHeight : int = 8;
var dirt_block : Transform;
var parentObject : Transform;

function Start () {
	//This will eventually be converted a random world generator based off of a seed.
	//Sizes are static for this demo
	/*var blockArray = new int[16];
	var maxHeight : int = 8;
	
	for (var a : int = 0; a < 16; a++) {
		blockArray[a] = new int[32];
	}
	
	for (var b : int in blockArray) {
		for (var bb : int in blockArray[b]) {
			if (bb <= maxHeight) {
				blockArray[b][bb] = 1;
			} else {
				blockArray[b][bb] = 0;
			}
		}
	}
	
	for (var c : int in blockArray) {
		for (var cc : int in blockArray[c]) {
			if (blockArray[c][cc] == 1) {
				Instantiate(dirt_block, Vector2 (c-8, cc), Quaternion.identity);
			}
		}
	}*/
	for (var a : int = 0; a < 16; a++) {
		for (var aa : int = 0; aa < 32; aa++) {
			if (aa <= maxHeight) {
				var object = Instantiate(dirt_block, Vector3 (a-8, aa, 4), Quaternion.identity) as Transform;
				object.transform.parent = parentObject;
			}
		}
	}
}

function Update () {

}