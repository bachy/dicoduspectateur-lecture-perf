
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

  var current_visage = false;
  var next_visage_time = Date.now() + Math.random()*20*1000;

  /*
  requestAnimationFrame
  */
  function startAnimation(){
    window.requestAnimationFrame(Animate);
  };

  function Animate(){
    // console.log("Animate");

    window.requestAnimationFrame(Animate);

    // move _texts
    for (var i = 0; i < _texts.length; i++) {
      // console.log(_texts[i].get('left'));
      _texts[i].move();
      // _texts[i].set('top', _texts[i].top+2);
    }

    if(!current_visage){
      if(Date.now() > next_visage_time){
        current_visage = new Visage();
      }
    }else{
      current_visage.move();
    }

    _stage.renderAll();
  };

  startAnimation();

  var focused_word_id = false;
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
        this.view.set('top', this.pos.top);
        this.view.set('fontSize', this.fontSize);

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
      };

      Word.prototype.focus = function(){
        focused_word_id = this.index;
        this.fontSize = 150 + Math.random()*50;
        this.opacity = 0.5;
        this.pos = {
          left: _stage.width/2,
          top: _stage.height/2,
        };
        this.dir = Math.random() > 0.5 ? 1 : -1;
        this.speed = 0.1+Math.random()/2;
      };


      Word.initialized = true;
    };

    this.init();
  };


  function Visage() {
    // this.index = i;
    this.id = "visage-"+parseInt(Math.random()*30);
    this.bornTime = Date.now();
    this.lifeTime = 10+Math.random()*20; // in sec
    console.log('New Visage '+this.id+' for '+parseInt(this.lifeTime)+'sec');
    this.scale = 0.5+Math.random()/2;
    this.opacity = 0.01;
    this.pos = {
      left: _stage.width/2 + Math.random()*_stage.width/2 - _stage.width/4,
      top: _stage.height/2 + Math.random()*_stage.height/2 - _stage.height/3,
    };
    this.dir = Math.random() > 0.5 ? 1 : -1;
    this.speed = 0.1+Math.random()/2;


    // prototypes
    if (typeof Visage.initialized == "undefined") {

      Visage.prototype.init = function(){
        // console.log('Visage init');

        // create an image element and add it to _stage
        this.img = document.getElementById(this.id);
        this.view = new fabric.Image(this.img, {
          left: this.pos.left,
          top: this.pos.top,
          opacity: 0.01,
          scaleX:this.scale,
          scaleY:this.scale,
          width:600,
          height:600,
          originX: 'center',
          originY: 'center'
        });
        _stage.add(this.view);
        this.view.bringForward(true);//sendToBack();

      }

      Visage.prototype.move = function(){
        this.pos.left += this.dir * this.speed;
        this.view.set('left', this.pos.left);
        this.view.set('top', this.pos.top);

        if(Date.now() < this.bornTime+this.lifeTime*1000){
          if(this.opacity < 0.7)
            this.opacity *=1.015;
        }else{
          if(this.opacity > 0.005){
            this.opacity *=0.995;
          }else{
            this.kill();
          }
        }
        this.view.set('opacity', this.opacity);
      };

      Visage.prototype.kill = function(){
        this.view.remove();
        var nvt = 5+Math.random()*30;
        next_visage_time = Date.now() + nvt*1000;
        console.log("visage killed, next visage in "+parseInt(nvt)+"sec");
        current_visage = false;
      };

      Visage.initialized = true;
    };

    this.init();
  };



  /*
   _____            _        _     _____ ____
  / ____|          | |      | |   |_   _/ __ \
 | (___   ___   ___| | _____| |_    | || |  | |
  \___ \ / _ \ / __| |/ / _ \ __|   | || |  | |
  ____) | (_) | (__|   <  __/ |_   _| || |__| |
 |_____/ \___/ \___|_|\_\___|\__| |_____\____/


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
    if(focused_word_id !== false){
      _texts[focused_word_id].resetPosition();
    }

    for (var i = 0; i < _texts.length; i++) {
      if(_texts[i].text == data.word){
        _texts[i].focus();
        break;
      }
    }

  }

};


/*
  _____                      _
 |  __ \                    | |         /\
 | |__) |___ _ __ ___   ___ | |_ ___   /  \   _ __  _ __
 |  _  // _ \ '_ ` _ \ / _ \| __/ _ \ / /\ \ | '_ \| '_ \
 | | \ \  __/ | | | | | (_) | ||  __// ____ \| |_) | |_) |
 |_|  \_\___|_| |_| |_|\___/ \__\___/_/    \_\ .__/| .__/
                                             | |   | |
                                             |_|   |_|
*/

function RemoteApp(){

  // var serverBaseUrl = document.domain;
  console.log("remote");
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

    socket.emit('focusWord', {word:$(this).text()});

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
