Loader.addToManifest(Loader.manifest, {

    ballot_ticket: "/assets/ballot/ballot_ticket.json",

});

function BallotTicket(config) {

    var self = this;
    self.id = config.id;
    self.config = config;
    
    // Create DOM
    self.dom = document.createElement("div");
    self.dom.className = "object";
    self.dom.style.left = config.x + "px";
    self.dom.style.top = config.y + "px";

    var app = new PIXI.Application(500, 500, { transparent: true, resolution: 2 });
    self.app = app;
    app.view.style.width = 500;
    app.view.style.height = 500;
    self.dom.appendChild(app.view);

    var ticketA = _makeMovieClip("ballot_ticket", { scale: 0.2 });
    var ticketB = _makeMovieClip("ballot_ticket", { scale: 0.2 });
    var ticketC = _makeMovieClip("ballot_ticket", { scale: 0.2 });

    self.ticketA = ticketA;
    self.ticketB = ticketB;
    self.ticketC = ticketC;
    app.stage.addChild(self.ticketA);
    app.stage.addChild(self.ticketB);
    app.stage.addChild(self.ticketC);
    self.ticketA.visible = true;
    self.ticketA.x = 251;
    self.ticketA.y = 132;
    self.ticketB.visible = true;
    self.ticketB.x = 132;
    self.ticketB.y = 343;
    self.ticketC.visible = true;
    self.ticketC.x = 370;
    self.ticketC.y = 343;

    self.play = function(pi, ws) {
        Tween_get(self[`ticket${pi}`])
            .to({ x: 251, y: 250 }, _s(2), Ease.circOut)
            .wait(_s(ws))
            .call(function () { self[`ticket${pi}`].visible = false; });
    };

    self.playAC = function (ws) {
        Tween_get(self.ticketA)
            .to({ x: 251, y: 250 }, _s(2), Ease.circOut)
            .wait(_s(ws))
            .call(function () { 
                self.ticketA.visible = false;
                Tween_get(self.ticketC)
                    .to({ x: 251, y: 250 }, _s(2), Ease.circOut)
                    .wait(_s(0))
                    .call(function () {
                        self.ticketC.visible = false;

                    });
             });
    };

    // Add & Remove
    self.add = function () { _add(self); };
    self.remove = function () {
        app.destroy();
        unlisten(self);
        _remove(self);
    };

}