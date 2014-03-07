#pragma strict

static var blockValue : int[,,];

var prefab : GameObject;
var parent : Transform;

var seed : int = 0;
var octaves : int = 8;
var frq : float = 50.0;
var amp : float = 1.0;
var size : int = 50;

private var perlin : PerlinNoise;

function Awake () {
	perlin = new PerlinNoise(seed);
	blockValue = new int[216, 216, 216];
	for( var x : int = 0; x < size; x++ ) {
		for( var y : int = 0; y < size; y++ ) {
			var height : int = Mathf.RoundToInt(perlin.FractalNoise2D(x, y, octaves, frq, amp));
			var instant : GameObject = Instantiate(prefab, Vector3(x, height, y), Quaternion.identity);
			instant.transform.parent = parent;
		}
	}
	parent.transform.position = Vector3(-8, 0, -8);
}