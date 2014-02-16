#pragma strict

var worldWidth : int = 512;
var worldHeight : int = 256;

var xScale : float = 3.0;
var yScale : float = 30.0;

static var blockArray : int[,];

private var seed : float;

function Awake () {
	blockArray = new int[worldWidth, worldHeight];
	seed = Random.Range(0.0, 1000000.0);
	xScale = xScale / 100;
	
	for (var column : int; column < worldHeight; column++) {
		//terrain
		var height2 : float = yScale * Mathf.PerlinNoise((column + 1.0) * xScale + seed, 0.0) + 150.0;
		var height : int = Mathf.RoundToInt( height2 - (yScale / 4.0 * Mathf.PerlinNoise( 0.0, (column + 1.0) * xScale * 3.0 + seed) ) );
		var random : int = Random.Range(4, 6);
		for (var row : int = 0; row < height; row++) {
			blockArray[column, row] = 1; //dirt
			if (row < height - random) {
				blockArray[column, row] = 2; //stone
			}
			if (row < height - 10) {
				if (Mathf.PerlinNoise((column + 1.0) * 0.15 + seed, (row + 1.0) * 0.15 + seed) <= 0.35) {
					blockArray[column, row] = 0; //caves (lower)
				}
			} else {
				if (Mathf.PerlinNoise((column + 1.0) * 0.05 + seed, (row + 1.0) * 0.05 + seed) <= 0.25) {
					blockArray[column, row] = 0; //caves (higher)
				}
			}
		}
	}
}