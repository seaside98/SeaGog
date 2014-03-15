#pragma strict
import System.Collections.Generic;

//static var blockValue : int[,,];
var seed : int = 0;

var imageSize : int;
var blockImages : Texture2D[];
var blockPixels : List.<Color[]>;

static var chunks : Dictionary.<int[],int[,,]>;
private static var activeLayers : int[]; //0 = NorthSouth, 1 = EastWest
private static var activeBlocks : int[]; //0 = NorthSouth, 1 = EastWest

/*var faceDepth : int;
private var lastDirection : boolean; //Right is true, left is false
private var renderedFaces : boolean[,];*/

/*var prefab : GameObject;
var parent : Transform;


var octaves : int = 8;
var frq : float = 50.0;
var amp : float = 1.0;
var size : int = 50;*/

function Awake () {
	//Store the block pixels
	blockPixels = new List.<Color[]>();
	for (var i : int = 0; i < blockImages.length; i++) {
		blockPixels.Add(blockImages[i].GetPixels());
	}
	
	//World generation
	chunks = new Dictionary.<int[],int[,,]>();
	activeLayers = new int[2];
	var perlin : PerlinNoise = new PerlinNoise(seed);
	
	/*perlin = new PerlinNoise(seed);
	blockValue = new int[216, 216, 216];
	for( var x : int = 0; x < size; x++ ) {
		for( var y : int = 0; y < size; y++ ) {
			var height : int = Mathf.RoundToInt(perlin.FractalNoise2D(x, y, octaves, frq, amp));
			var instant : GameObject = Instantiate(prefab, Vector3(x, height, y), Quaternion.identity);
			instant.transform.parent = parent;
		}
	}
	parent.transform.position = Vector3(-8, 0, -8);*/
	
	//World rendering
}