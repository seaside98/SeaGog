#pragma strict

var worldWidth : int = 512;
var worldHeight : int = 256;

private var blockObjects : GameObject[,];
private var blockArray : int[,];

var parentObject : Transform;
var blockDirt : GameObject;
var blockStone : GameObject;

static var locationX : int;
static var locationY : int;

function Awake () {
	locationX = Mathf.RoundToInt(transform.position.x) - 17;
	locationY = Mathf.RoundToInt(transform.position.y) - 10;
}

function Start () {
	blockObjects = new GameObject[worldWidth, worldHeight];
	blockArray = generateWorld.blockArray;
	SpawnBlocks();
}

function Update () {
	SpawnBlocks();
}

function SpawnBlocks () {
	//var locationXTemp : int = locationX;
	//var locationYTemp : int = locationY;
	locationX = Mathf.RoundToInt(transform.position.x) - 17; //left
	locationY = Mathf.RoundToInt(transform.position.y) - 10; //bottom
	
	//var xDiff : int = Mathf.Abs(locationX - locationXTemp);
	//var yDiff : int = Mathf.Abs(locationY - locationXTemp);
	//var xAbs : int = Mathf.Abs(xDiff);
	//var yAbs : int = Mathf.Abs(yDiff);
	
	/*for (var xTop : int = locationX + 34; xTop < locationX + 34 + xDiff; xTop++) {
		for (var y : int = locationY - yDiff; y < locationY + 34 + yDiff; y++) {
			Destroy(blockObjects[xTop]); //top
		}
	}*/

	/*Debug.Log((locationX - xDiff)+","+(locationX + 34 + xDiff));
	for (var xVal = locationX - xDiff; xVal < locationX + 34 + xDiff; xVal++) {
		for (var yVal = locationY - yDiff; yVal < locationY + 20 + yDiff; yVal++) {
			if ((xVal < locationX || xVal > locationX + 34) && (yVal < locationY || yVal > locationY + 20)) {
				Destroy(blockObjects[xVal, yVal]);
			}
		}
	}*/
	
	
	//var deathArrayX : int[] = new int[34 + xAbs];
	//var deathArrayY : int[] = new int[20 + yAbs];
	
	/*if (xDiff < 0) {
		for (var rightSide : int = locationX; rightSide < 34 + xAbs; rightSide++) {
			for (var topSide : int = location
		}
	} else {
		locationXTemp 
	}*/
	
	for (var column : int = locationX; column < locationX + 34; column++) {
		for (var row : int = locationY; row < locationY + 20; row++) {
			if (blockArray[column, row] > 0 && !blockObjects[column, row]) {
				var object = Instantiate(GetBlock( blockArray[column, row] ), Vector3 (column, row, 4), Quaternion.identity) as GameObject;
				object.transform.parent = parentObject;
				blockObjects[column, row] = object.gameObject;
			}
		}
	}
}

function GetBlock (id : int) : GameObject {
	if (id == 1) {
		return blockDirt;
	} else if (id == 2) {
		return blockStone;
	}
	return;
}