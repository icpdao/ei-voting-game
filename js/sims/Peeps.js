
function PeepShow(config) {

    var self = this;
    self.id = config.id;

    // DOM
    self.dom = document.createElement("div");
    self.dom.className = "object";
    self.dom.style.left = config.x + "px";
    self.dom.style.top = config.y + "px";

    var width = config.width || 700;
    var height = config.height || 330;

    // APP
    var app = new PIXI.Application(width, height, { transparent: true, resolution: 2 });
    self.app = app;
    app.view.style.width = width;
    app.view.style.height = height;
    self.dom.appendChild(app.view);

    ///////////////////////////////////////////////
    //////////////// THE GRAPHICS /////////////////
    ///////////////////////////////////////////////
    var offsetX = config.offsetX || [230, 230, 230];
    var offsetY = config.offsetY || [100, 200, 300];
    var scale = config.scale || [0.3, 0.3, 0.3];

    // Peep
    self.playerHonest = new PeepStand({ id: 'honest', x: offsetX[0], scale: scale[0], y: offsetY[0] });
    app.stage.addChild(self.playerHonest.graphics);
    self.playerGreedy = new PeepStand({ id: 'greedy', x: offsetX[1], scale: scale[1], y: offsetY[1] });
    app.stage.addChild(self.playerGreedy.graphics);
    self.playerOneself = new PeepStand({ id: 'oneself', x: offsetX[2], scale: scale[2], y: offsetY[2] });
    app.stage.addChild(self.playerOneself.graphics);

    app.ticker.add(function (delta) {
        Tween.tick();
        self.playerHonest.update(delta);
        self.playerGreedy.update(delta);
        self.playerOneself.update(delta);
    });

    ///////////////////////////////////////////////
    ///////////////// LISTENERS ///////////////////
    ///////////////////////////////////////////////

    // self.chooseOpponent = function (id) {
    //     // var LogicClass = window["Logic_" + id];
    //     // self.opponentLogic = new LogicClass();
    //     self.playerHonest.chooseHat(id);
    // };
    // self.chooseOpponent("honest");

    ///////////////////////////////////////////////
    ///////////// ADD, REMOVE, KILL ///////////////
    ///////////////////////////////////////////////

    self.move = function (loc) {
        self.playerHonest.move(loc);
        self.playerGreedy.move(loc);
        self.playerOneself.move(loc);
    };

    // Add...
    self.add = function () {
        _add(self);
    };

    // Remove...
    self.remove = function () {
        app.destroy();
        unlisten(self);
        self.playerHonest.kill();
        self.playerGreedy.kill();
        self.playerOneself.kill();
        _remove(self);
    };

}


function PeepStand(config) {
    var self = this;
    self.config = config;
    var scale = config.scale || 0.3;

    // Peep
    self.graphics = new PIXI.Container();
    var g = self.graphics;

    // Animation
    self.animated = new PIXI.Container();
    g.addChild(self.animated);

    // Body
    self.body = _makeMovieClip("iterated_peep", { scale, anchorX: 0.5, anchorY: 0.95 });
    self.animated.addChild(self.body);

    // Hat
    self.hat = _makeMovieClip("iterated_peep", { scale, anchorX: 0.5, anchorY: 0.95 });
    self.animated.addChild(self.hat);
    self.hat.gotoAndStop(12);
    self.hat.gotoAndStop(13 + PEEP_METADATA[config.id].frame);

    // Face
    self.face = _makeMovieClip("iterated_peep", { scale, anchorX: 0.5, anchorY: 0.95 });
    self.animated.addChild(self.face);
    self.face.gotoAndStop(1);
    self.restingFace = true;

    // Eyebrows
    self.eyebrows = _makeMovieClip("iterated_peep", { scale, anchorX: 0.5, anchorY: 0.95 });
    self.eyebrows.visible = false;
    self.animated.addChild(self.eyebrows);

    // RESET FACE
    self.resetFace = function () {
        self.eyebrows.visible = false;
        self.face.gotoAndStop(1);
        self.restingFace = true;
    };

    // Position & Flip?
    g.y = config.y || 236;
    g.x = config.x || 230;
    //g.rotation = 1;

    /////////////////////////////////////////////
    /////// ACTUALLY ANIMATING THE MOVES ////////
    /////////////////////////////////////////////

    var _isTripping = false;
    var _isHopping = false;
    var _faceTripped = false;
    var _hopTimer = 0;
    var _faceTimer = 0;
    self.update = function (delta) {

        // Blinking
        if (self.restingFace) {
            if (self.face.currentFrame > 2) self.face.gotoAndStop(1);
            if (self.face.currentFrame == 2 && Math.random() < 0.20) self.face.gotoAndStop(1);
            if (self.face.currentFrame == 1 && Math.random() < 0.01) self.face.gotoAndStop(2);
        }

        // Face Tripped
        if (_faceTripped) {
            _faceTimer += 0.25;
            var frame = 18 + (Math.floor(_faceTimer) % 5);
            self.face.gotoAndStop(frame);
        }

        // Hopping
        if (!_isTripping) {
            if (_isHopping) {
                _hopTimer += delta;
                self.animated.y = -Math.abs(Math.sin(_hopTimer * 0.4)) * 6;
            } else {
                self.animated.y = 0;
                _hopTimer = 0;
            }
        }
    };
    self.move = function (loc) {
        Tween_get(self.animated)
            .to({ x: loc.x }, _s(2), Ease.circOut)
            .wait(_s(loc.w))
            .call(function () { });
    };
    // KILL
    self.kill = function () {
        // Remove ALL tweens
        Tween.removeTweens(self.animated);
    };

}

