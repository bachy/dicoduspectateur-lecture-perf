
function StageApp(){

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
  }

  // create an image element and add it to _stage
  var img_title = document.getElementById('img-title');
  var imgTitleInstance = new fabric.Image(img_title, {
    left: _stage.width/2,
    top: _stage.height/2,
    opacity: 0.10,
    scaleX:1,
    scaleY:1,
    width:800,
    height:800,
    originX: 'center',
    originY: 'center'
  });
  _stage.add(imgTitleInstance);
  imgTitleInstance.sendToBack();

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

    // prototypes
    if (typeof Word.initialized == "undefined") {

      Word.prototype.init = function(){
        this.resetPosition();

        this.view = new fabric.Text(this.text, {
          left: this.pos.left,
          top: this.pos.top,
          fontFamily: 'amiri',
          fill: '#0000d2',
          fontSize:this.fontSize,
          opacity:this.opacity,
          originX: 'center',
          originY: 'center'
        });
        _stage.add(this.view);
      }

      Word.prototype.move = function(){
        if(this.opacity < 0.8){
          this.opacity *=1.005;
          this.view.set('opacity', this.opacity);
        }

        this.pos.left += this.dir * this.speed;
        this.view.set('left', this.pos.left);

        if (this.pos.left > _stage.width + 300
          || this.pos.left < -300){
            this.resetPosition();
          }
      };

      Word.prototype.resetPosition = function(){
        this.fontSize = 20 + Math.random()*40;
        this.opacity = 0.01;
        this.pos = {
          left: Math.random()*_stage.width,
          top: Math.random()*_stage.height,
        };
        this.dir = Math.random() > 0.5 ? 1 : -1;
        this.speed = 0.1+Math.random()/2;
      }

      Word.initialized = true;
    };

    this.init();
  };


  /*
  SOCKET IO
  */

  // var serverBaseUrl = document.domain;
  // console.log(serverBaseUrl);
  var socket = io.connect();
  var sessionId = '';

  /* sockets */
  socket.on('connect', onSocketConnect);
  socket.on('error', onSocketError);
  socket.on('focusWord', onFocusWord);

  function onSocketConnect() {
    // sessionId = socket.socket.sessionid;
    console.log('socket io Connected');
    // socket.emit('newUser', {id: sessionId, name: $('#name').val()});
  };

  function onSocketError(reason) {
    console.log('Unable to connect to server', reason);
  };

  function onFocusWord(data){
    console.log('focus word', data);
  }

};

function RemoteApp(){
  console.log("remote");

  // var serverBaseUrl = document.domain;
  // console.log(serverBaseUrl);
  var socket = io.connect();
  var sessionId = '';

  /**
  * Events
  */
  /* sockets */
  socket.on('connect', onSocketConnect);
  // socket.on('incomingLine', onIncomingLine);
  socket.on('error', onSocketError);

  /* dom */
  $('li.word a').on('click', onClickWord);

  function onClickWord(event){
    event.preventDefault();
    console.log(this);

    socket.emit('focusWord', {test:"hello"});

    return false;
  };

  /* sockets */
  function onSocketConnect() {
    // sessionId = socket.socket.sessionid;
    console.log('socket io Connected');
    // socket.emit('newUser', {id: sessionId, name: $('#name').val()});
  };

  function onSocketError(reason) {
    console.log('Unable to connect to server', reason);
  };

};

if(document.body.className.match('stage')){
  StageApp();
}else if(document.body.className.match('remote')){
  RemoteApp();
}
