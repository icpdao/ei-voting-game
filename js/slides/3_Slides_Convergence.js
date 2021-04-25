SLIDES.push({
    id: "convergence",
    onjump: function (self) {
        Tournament.resetGlobalVariables();
    },
    onstart: function (self) {
        // WORDS
        self.add({
            id: "topTitle", type: "TextBox", text_id: "convergence_title",
            x: 21, y: 5, width: 960, height: 50, align: "center"
        });
        self.add({
            id: "text1", type: "TextBox",
            x: 0, y: 54, width: 960, height: 42, align: "left",
            text_id: "convergence_0_intro"
        });
        self.add({
            id: "text2", type: "TextBox",
            x: 0, y: 320, width: 287, height: 117, align: "center",
            text_id: "convergence_0_1"
        });
        self.add({
            id: "text3", type: "TextBox",
            x: 336, y: 320, width: 287, height: 117, align: "center",
            text_id: "convergence_0_2"
        });
        self.add({
            id: "text4", type: "TextBox",
            x: 669, y: 320, width: 287, height: 117, align: "center",
            text_id: "convergence_0_3"
        });

        // IMAGE
        self.add({
            id: "img", type: "ImageBox",
            src: "assets/evolution/evolution_intro.png",
            x: 0, y: 130, width: 960, height: 170
        });

        // Button
        self.add({
            id: "button", type: "Button", x: 330, y: 456,
            text_id: "convergence_0_button", size: "long",
            onclick: function () {
                publish("slideshow/next");
            }
        });

    },
    onend: function (self) {
        self.clear();
    }
});


SLIDES.push({
    
    onstart: function (self) {
        self.add({ id: "tournament", type: "Tournament", x: -20, y: 50 });
        self.add({
            id: "topTitle", type: "TextBox", text_id: "convergence_title",
            x: 21, y: 5, width: 960, height: 50, align: "center"
        });
        var o = self.objects;

        // Reset Tournament
        _.resetTournament = function () {
            Tournament.resetGlobalVariables();
            Tournament.INITIAL_AGENTS = [
                { strategy: "honest", count: 10 },
                { strategy: "greedy", count: 10 },
                { strategy: "oneself", count: 10 }
            ];
            Tournament.NUM_TURNS = 1;
            o.tournament.reset();
        };
        _.resetTournament();

        // Words to the side
        self.add({
            id: "text", type: "TextBox", 
            x: 520, y: 100, width: 450, height: 500,
            text_id: "convergence_1_intro"
        });
        _hide(o.text); _fadeIn(o.text, 600);

        var x = 168;
        var y = 205;
        var dy = 70;
        self.add({
            id: "playButton", type: "Button", size: "short",
            x: x, y: y, text_id: "start_button",
            onclick: function () {
                if (o.tournament.isAutoPlaying) {
                    publish("tournament/autoplay/stop");
                } else {
                    publish("tournament/autoplay/start");
                }
            }
        });
        listen(_, "tournament/autoplay/stop", function () {
            o.playButton.setText("start_button");
        });
        listen(_, "tournament/autoplay/start", function () {
            o.playButton.setText("stop_button");
        });
        self.add({
            id: "stepButton", type: "Button", size: "short",
            x: x, y: y + dy, text_id: "step_button", message: "tournament/step"
        });
        self.add({
            id: "resetButton", type: "Button", size: "short",
            x: x, y: y + dy * 2, text_id: "reset_button", message: "tournament/reset"
        });
        _hide(o.playButton); _fadeIn(o.playButton, 800);
        _hide(o.stepButton); _fadeIn(o.stepButton, 900);
        _hide(o.resetButton); _fadeIn(o.resetButton, 1000);

        ///////////

        _.misc = {};
        listen(_.misc, "tournament/step/completed", function (step) {
            if (step == "reproduce") {
                publish("slideshow/next");
            }
        });


    },
    onend: function (self) {
        unlisten(_.misc);
    }
});

SLIDES.push({
    onstart: function (self) {

        var o = self.objects;

        // Words
        o.text.setTextID("convergence_1_process");
        _hide(o.text); _fadeIn(o.text, 100);

        _.misc = {};
        // Continue...
        self.add({
            id: "continueButton", type: "Button",
            x: 630, y: 570, 
            text_id: "continue_button",
            message: "slideshow/next"
        });
        _hide(o.continueButton); _fadeIn(o.continueButton, 100);
    },
    onend: function (self) {
        unlisten(_.misc);
        var o = self.objects;
        if (o.continueButton) self.remove("continueButton");
    }
});

SLIDES.push({
    onstart: function (self) {

        var o = self.objects;

        // Words
        o.text.setTextID("convergence_1_conclusion");
        _hide(o.text); _fadeIn(o.text, 100);

        // Worse...
        self.add({
            id: "next", type: "Button",
            x: 630, y: 470, 
            text_id: "continue_button",
            message: "slideshow/next"
        });
        _hide(o.next); _fadeIn(o.next, 400);

    },
    onend: function (self) {
        self.clear();
    }
});


SLIDES.push({
    onstart: function (self) {

        var o = self.objects;

        // Words
        self.add({
            id: "text", type: "TextBox",
            text_id: "convergence_2_page"
        });
        _hide(o.text); _fadeIn(o.text, 100);

        // Worse...
        self.add({
            id: "next", type: "Button",
            x: 390, y: 500,
            text_id: "continue_button",
            message: "slideshow/next"
        });
        _hide(o.next); _fadeIn(o.next, 400);
    },
    onend: function (self) {
        self.clear();
    }
});
