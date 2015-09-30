
var myapp = function(){

  var _root = document.getElementById('root');
  var _canvas = document.getElementById('stage');

  // console.log(list);

  function setCanvasSize(){
    // dynamicly set width and height of canvas to full screen
    console.log("root : "+_root.clientWidth+" / "+_root.clientHeight);

    _canvas.width = _root.clientWidth;
    _canvas.height = _root.clientHeight;
    console.log("_canvas : "+_canvas.width+" / "+_canvas.height);
  }

  setCanvasSize();

  // create the fabric.js canvas object, here called "_stage"
  var _stage = new fabric.StaticCanvas('stage', {
    // renderOnAddRemove:false
  });

  // create a new text object and add it to _stage
  var _texts = [];
  for (var i = 0; i < list.length; i++) {
    _texts.push(new Word(i, list[i]));
    // _texts[i] = new fabric.Text(list[i], {
    //   left: Math.random()*_stage.width,
    //   top: Math.random()*_stage.height,
    //   fontFamily: 'amiri',
    //   fill: '#0000d2',
    //   fontSize:15 + Math.random()*15
    // });
    // _stage.add(_texts[i]);
  }
  // _stage.renderTop();

  // create an image element and add it to _stage
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
  _stage.add(imgInstance);
  imgInstance.sendToBack();

  /*
  requestAnimationFrame
  */
  function startAnimation(){
    window.requestAnimationFrame(Animate);
  };

  function Animate(){
    console.log("Animate");

    window.requestAnimationFrame(Animate);

    // move _texts
    for (var i = 0; i < _texts.length; i++) {
      // console.log(_texts[i].get('left'));
      _texts[i].move();
      // _texts[i].set('top', _texts[i].top+2);
    }
    _stage.renderAll();
  };

  startAnimation();

  /*
 __          __           _
 \ \        / /          | |
  \ \  /\  / /__  _ __ __| |
   \ \/  \/ / _ \| '__/ _` |
    \  /\  / (_) | | | (_| |
     \/  \/ \___/|_|  \__,_|
  */
  function Word(i,txt) {
    this.index = i;

    this.text = txt;
    this.pos = {
      left: Math.random()*_stage.width,
      top: Math.random()*_stage.height,
    };
    this.view = new fabric.Text(list[i], {
      left: this.pos.left,
      top: this.pos.top,
      fontFamily: 'amiri',
      fill: '#0000d2',
      fontSize:20 + Math.random()*40
    });
    _stage.add(this.view);

    this.dir = Math.random() > 0.5 ? 1 : -1;
    this.speed = 0.1+Math.random()/2;

    // prototypes
    if (typeof Word.initialized == "undefined") {

      Word.prototype.move = function(){
        this.pos.left += this.dir * this.speed;
        this.view.set('left', this.pos.left);
      };

      Word.initialized = true;
    };

    // this.init();
  };

}();
