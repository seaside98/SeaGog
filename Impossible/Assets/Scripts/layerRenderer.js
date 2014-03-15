#pragma strict

private var myPosition : int;
private var isNorthSouth : boolean;
private var myIndex : int;
private var myLayer : int;
private var myChunk : int[];

private var firstLayer : int;
private var blockStart : int;
private var blockPixels : List.<Color[]>;

function Awake () {
	myPosition = transform.localPosition.z;
	var myRotation : float = transform.rotation.y;
	if (myRotation > 0.5) {
		isNorthSouth = false;
		myIndex = 1;
	} else {
		isNorthSouth = true;
		myIndex = 0;
	}
}

function Start() {
	//blockPixels = worldGenerator.blockPixels;
	//firstLayer = worldGenerator.activeLayers[myIndex];
	myLayer = firstLayer + myPosition;
	renderer.material.color.a = 0.5;
}

function Update() {
	//blockStart = worldGenerator.activeBlocks[myIndex];
	//firstLayer = worldGenerator.activeLayers[myIndex];
	/*if (myLayer < firstLayer || myLayer > firstLayer + 15) {
		
	}*/
}

function RotateLayer () {
	if (isNorthSouth) {
		
	} else {
	
	}
}

function InitializeLayer () {
	
}

function UpdateFaces (playerX : float, playerY : float) {
	
}