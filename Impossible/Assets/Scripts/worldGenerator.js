#pragma strict

static var blockValue : int[,,];

var seed : int = 0;
var octaves : int = 8;
var frq : float = 50.0;
var amp : float = 1.0;

private var perlin : PerlinNoise;

function Awake () {
	perlin = new PerlinNoise(seed);
	blockValue = new int[216, 216, 216];
	
}