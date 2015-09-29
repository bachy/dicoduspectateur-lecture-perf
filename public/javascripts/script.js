
var root = document.getElementById('root');
console.log("root : "+root.clientWidth+" / "+root.clientHeight);

var canvas = document.getElementById('stage');

canvas.width = root.clientWidth;
canvas.height = root.clientHeight;
console.log("canvas : "+canvas.width+" / "+canvas.height);

var stage = new fabric.Canvas('stage');
// create a rectangle object
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20
});

// "add" rectangle onto canvas
stage.add(rect);

var text = new fabric.Text('hello world', { left: 800, top: 400 });
stage.add(text);

var imgElement = document.getElementById('image');
var imgInstance = new fabric.Image(imgElement, {
  left: 100,
  top: 100,
  // angle: 30,
  opacity: 0.85,
  width:40,
  height:50
});
stage.add(imgInstance);
