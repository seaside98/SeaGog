#pragma strict

var worldWidth : int = 512;
var worldHeight : int = 256;

var parentObject : Transform;
var xScale : float = 3.0;
var yScale : float = 30.0;

static var blockObjects : GameObject[,];

private var blockArray : int[,]; 
private var passNumber : float = 0.0;
private var seed : float;
private var random : float;

function Awake () {
	blockObjects = new GameObject[worldWidth, worldHeight];
}

function Start () {
	blockArray = new int[worldWidth, worldHeight];
	seed = Random.Range(0.0, 1000000.0);
	xScale = xScale / 100;
	
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
	/*for (var a : int = 0; a < 16; a++) {
		for (var aa : int = 0; aa < 32; aa++) {
			if (aa <= maxHeight) {
				var object = Instantiate(dirt_block, Vector3 (a-8, aa, 4), Quaternion.identity) as Transform;
				object.transform.parent = parentObject;
			}
		}
	}*/
}

function Update () {
	if (passNumber < worldWidth - 470) {
		Generate(passNumber);
		passNumber++;
	}
	//if (passNumber % 16 < 2) {
	//	random = Mathf.PerlinNoise(passNumber * xScale + seed, 0.0) / 10.0 + 0.9;
	//	Debug.Log(random);
	//}
}

function Generate (column : float) {
	//Terrain
	var height2 : float = yScale * Mathf.PerlinNoise((column + 1.0) * xScale + seed, 0.0) + 150.0;
	var height : int = Mathf.RoundToInt( height2 - (yScale / 4.0 * Mathf.PerlinNoise( 0.0, (column + 1.0) * xScale * 6.0 + seed) ) );
	var random : int = Random.Range(4, 6);
	for (var row : int = 0; row < height; row++) {
		blockArray[column, row] = 1;
		if (row < height - random) {
			blockArray[column, row] = 2;
		}
		if (row < height - 10) {
			if (Mathf.PerlinNoise((column + 1.0) * 0.15 + seed, (row + 1.0) * 0.15 + seed) <= 0.35) {
				blockArray[column, row] = 0;
			}
		} else {
			if (Mathf.PerlinNoise((column + 1.0) * 0.05 + seed, (row + 1.0) * 0.05 + seed) <= 0.25) {
				blockArray[column, row] = 0;
			}
		}
	}
	SpawnBlocks(column);
}

function SpawnBlocks (column : int) {
	for (var row : int = 0; row < worldHeight; row++) {
		if (blockArray[column, row] > 0) {
			var object = Instantiate(GetBlock( blockArray[column, row] ), Vector3 (column, row, 4), Quaternion.identity) as GameObject;
			object.transform.parent = parentObject;
			blockObjects[column, row] = object.gameObject;
		}
	}
}

var blockDirt : GameObject;
var blockStone : GameObject;

function GetBlock (id : int) : GameObject {
	if (id == 1) {
		return blockDirt;
	} else if (id == 2) {
		return blockStone;
	}
	return;
}