$(function() {
	var layer = new collie.Layer({
		width : 300,
		height : 300
	});
	var box2d = new collie.Box2d(layer.option("width"), layer.option("height"), 10);
	box2d.addFixture("normal", {
		density : 1.0,
		friction : 0.5,
		restitution : 0.2
	});
	box2d.createWall("right");
	box2d.createWall("left");
	box2d.createWall("top");
	box2d.createWall("bottom", "ground");
	var box = new DisplayObject({
		x : "center",
		y : "center",
		width : 100,
		height : 100,
		backgroundColor : "red"
	}).addTo(layer);
	box2d.createObject(box, {
		type : "dynamic"
	}, "normal");
	collie.Renderer.addLayer(layer);
	collie.Renderer.load(document.getElementById("contianer"));
	collie.Renderer.start();
});