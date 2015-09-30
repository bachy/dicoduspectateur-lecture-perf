
var myapp = function(){

  var root = document.getElementById('root');
  var canvas = document.getElementById('stage');

  console.log(list);

  function setCanvasSize(){
    // dynamicly set width and height of canvas to full screen
    console.log("root : "+root.clientWidth+" / "+root.clientHeight);

    canvas.width = root.clientWidth;
    canvas.height = root.clientHeight;
    console.log("canvas : "+canvas.width+" / "+canvas.height);
  }

  setCanvasSize();

  // create the fabric.js canvas object, here called "stage"
  var stage = new fabric.StaticCanvas('stage');

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

  // create a new text object and add it to stage
  var text = new fabric.Text('hello world', { left: 800, top: 400 });
  stage.add(text);

  // create an image element and add it to stage
  var imgElement = document.getElementById('image');
  var imgInstance = new fabric.Image(imgElement, {
    left: 200,
    top: 300,
    // angle: 30,
    opacity: 0.85,
    scale:0.4
    // width:330,
    // height:50
  });
  stage.add(imgInstance);

}();
