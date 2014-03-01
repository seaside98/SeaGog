#pragma strict
import System.Collections.Generic;

var characterObject : Transform;

//Deminsions of the world
var worldWidth : int;
var worldHeight : int;

var containerWidth : int;
var containerHeight : int;

//Total types of blocks
private var blockTotal : int;

//Block arrays
private var blockObjects : GameObject[,];
private var blockArray : int[,];

//Location of the Render
static var locationX : int;
static var locationY : int;
private var locationXTemp : int;
private var locationYTemp : int;

//Prefabs
var parentObject : Transform;
var blockDirt : GameObject;
var blockStone : GameObject;
private var blockPrefabs : GameObject[];

//Pools
private var block1Pool : List.<GameObject> = new List.<GameObject>();
private var block2Pool : List.<GameObject> = new List.<GameObject>();
private var blockPools : List.<GameObject>[];

//Block Destroyers
private var destroyColumns : List.<int> = new List.<int>();
private var destroyRows : List.<int> = new List.<int>();

//Set location
function Awake () {
	locationX = Mathf.RoundToInt(transform.position.x) - containerWidth / 2;
	locationY = Mathf.RoundToInt(transform.position.y) - containerHeight / 2;
	
	blockObjects = new GameObject[worldWidth, worldHeight];
	blockTotal = 2;
	
	blockPrefabs = new GameObject[blockTotal];
	blockPrefabs[0] = blockDirt;
	blockPrefabs[1] = blockStone;
	
	blockPools = new List.<GameObject>[blockTotal];
	blockPools[0] = block1Pool;
	blockPools[1] = block2Pool;
	
	for (var i : int = 0; i < 4; i++) {
		destroyColumns.Add(0);
		destroyRows.Add(0);
	}
}

//Create arrays
function Start () {
	blockArray = generateWorld.blockArray;
	HandleBlocks();
}

function Update () {
	HandleBlocks();
	//Debug.Log(blockPools[1].Count);
	
}

function FollowCharacter () {
	var characterPosition = characterObject.position;
	//if (characterPosition.x < 
}

function HandleBlocks () {
	locationXTemp = locationX;
	locationYTemp = locationY;
	locationX = Mathf.RoundToInt(transform.position.x) - containerWidth / 2; //left
	locationY = Mathf.RoundToInt(transform.position.y) - containerHeight / 2; //bottom
	
	destroyColumns[0] = locationX;
	destroyColumns[1] = locationX + containerWidth;
	destroyColumns[2] = locationXTemp;
	destroyColumns[3] = locationXTemp + containerWidth;
	destroyRows[0] = locationY;
	destroyRows[1] = locationY + containerHeight;
	destroyRows[2] = locationYTemp;
	destroyRows[3] = locationYTemp + containerHeight;
	
	destroyColumns.Sort();
	destroyRows.Sort();
	
	for (var width : int = destroyColumns[0]; width <= destroyColumns[3]; width++) {
		for (var height : int = destroyRows[0]; height <= destroyRows[3]; height++) {
			if (width < worldWidth && width > -1 && height < worldHeight && height > -1) {
				if (blockObjects[width, height] != null && !(width >= locationX && width < locationX + containerWidth && height >= locationY && height < locationY + containerHeight)) {
					UnloadBlock(blockArray[width, height], width, height);
				}
			}
		}
	}

	for (var column : int = locationX; column < locationX + containerWidth; column++) {
		for (var row : int = locationY; row < locationY + containerHeight; row++) {
			if (column < worldWidth && column > -1 && row < worldHeight && row > -1) {
				if (blockArray[column, row] > -1 && blockObjects[column, row] == null) {
					LoadBlock(blockArray[column, row], column, row);
				}
			}
		}
	}
}

/*function GetBlock (id : int) : GameObject {
	if (id == 1) {
		if (block1.length > 0) {
			return block1.Pop();
		}
		return blockDirt;
	} else if (id == 2) {
		if (block2.length > 0) {
			return block2.Pop();
		}
		return blockStone;
	}
	return;
}*/

function LoadBlock (id : int, column : int, row : int) {
	var currentPool : List.<GameObject> = blockPools[id];
	var block : GameObject;
	if (currentPool.Count > 0) {
		block = currentPool[0];
		currentPool.RemoveAt(0);
		block.transform.position = Vector3(column, row, 4);
		block.SetActive(true);
		blockObjects[column, row] = block;
	} else {
		block = Instantiate(blockPrefabs[id], Vector3(column, row, 4), Quaternion.identity) as GameObject;
		block.transform.parent = parentObject;
		blockObjects[column, row] = block;
	}
	/*var object = Instantiate(GetBlock( blockArray[column, row] ), Vector3 (column, row, 4), Quaternion.identity) as GameObject;
	object.transform.parent = parentObject;
	blockObjects[column, row] = object.gameObject;*/
}

function UnloadBlock (id : int, column : int, row : int) {
	var block : GameObject = blockObjects[column, row];
	if (block != null) {
		block.SetActive(false);
		blockPools[id].Add(block);
		blockObjects[column, row] = null;
	}
}