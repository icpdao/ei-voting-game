// THE TRUST GAME - COOPERATE, YA NO?
SLIDES.push({

    id: "oneoff",

    onstart: function (self) {

        Tournament.resetGlobalVariables();
        var o = self.objects;
        // Peep Show
        self.add({ id: "peepShow", type: "PeepShow", x: 130, y: 133})

        // Legend
        self.add({
            id: 'honestLegend', type: 'Legend', x: 425, y: 170, text_id: "honest_legend",
            color: '#f6b24c'
        })
        self.add({
            id: 'greedLegend', type: 'Legend', x: 425, y: 270, text_id: "greed_legend",
            color: '#52537F'
        })
        self.add({
            id: 'oneselfLegend', type: 'Legend', x: 425, y: 370, text_id: "oneself_legend",
            color: '#4089DD'
        })

        // Words on top & bottom
        self.add({
            id: "topTitle", type: "TextBox", text_id: "coop_understand_0_title",
            x: 21, y: 5, width: 918, height: 50, align: "center"
        });

        self.add({
            id: "topWords", type: "TextBox", text_id: "coop_understand_0_top",
            x: 21, y: 54, width: 918, height: 100, align: "left"
        });

        self.add({
            id: "btmWords", type: "TextBox", text_id: "coop_understand_0_btm",
            x: 21, y: 467, width: 918, height: 300, align: "left"
        });

        // oneself input
        self.add({
            id: "oneselfInput", type: "SilderInput", text_id: "coop_understand_0_input",
            x: 275, y: 550, unit_text_id: 'coop_understand_0_unit'
        });

        // dialogue
        self.add({
            id: "honestDialogueBox", type: "DialogueBox", text_id: "coop_understand_0_honest_coin",
            x: 655, y: 170,
        })
        self.add({
            id: "greedyDialogueBox", type: "DialogueBox", text_id: "coop_understand_0_greedy_coin",
            x: 655, y: 270,
        })

        // Button
        self.add({
            id: "btnSubmit", type: "Button", x: 495, y: 550, text_id: "coop_understand_0_submit",
            uppercase: true, size: 'short',
            onclick: function () {
                _.oneselfCoin = o.oneselfInput.popAmount.innerHTML;
                publish("slideshow/next");
            }
        });

        _hide(o.btmWords); _fadeIn(o.btmWords, 1000);

        _hide(o.honestDialogueBox); _fadeIn(o.honestDialogueBox, 2000);
        _hide(o.greedyDialogueBox); _fadeIn(o.greedyDialogueBox, 2500);

        _hide(o.oneselfInput); _fadeIn(o.oneselfInput, 3000);
        _hide(o.btnSubmit); _fadeIn(o.btnSubmit, 3000);

    },
    onend: function (self) {
        self.remove("peepShow");
        self.remove("honestLegend");
        self.remove("greedLegend");
        self.remove("oneselfLegend");
        self.remove("topWords");
        self.remove("btmWords");
        self.remove("oneselfInput");
        self.remove("honestDialogueBox");
        self.remove("greedyDialogueBox");
        self.remove("btnSubmit");
    }

}, {

    onstart: function (self) {

        var o = self.objects;
        console.log(_.oneselfCoin)
        // Voter
        Tournament.resetGlobalVariables();
        Tournament.INITIAL_AGENTS = [
            { strategy: "honest", count: 1 },
            { strategy: "greedy", count: 1 },
            { strategy: "oneself", count: 1 },
        ];
        self.add({ id: "voter", type: "Tournament", x: -20, y: 20 });

    },
    onend: function (self) {
        // self.remove("btmWords");
    }

}, {

    onstart: function (self) {

        var o = self.objects;

        // Payoff
        o.iterated.oneoffHighlight2(_.answer);

        // Text
        var t = o.topWords;
        if (_.answer == "COOPERATE") {
            t.setText(Words.get("oneoff_2_cooperated") + "<br>" + Words.get("oneoff_2_top"));
        } else {
            t.setText(Words.get("oneoff_2_cheated") + "<br>" + Words.get("oneoff_2_top"));
        }
        self.add({
            id: "btmWords", type: "TextBox", text_id: "oneoff_2_btm",
            x: 130, y: 392, width: 700, height: 100, align: "center"
        });

        // Replace button
        self.remove("btnCheat");
        self.remove("btnCooperate");
        self.add({
            id: "btnNext", type: "Button", x: 304, y: 481, size: "long",
            text_id: "oneoff_button_next",
            message: "slideshow/next"
        });

        // Hide & fade
        _hide(o.topWords); _fadeIn(o.topWords, 150 + 10);
        _hide(o.btmWords); _fadeIn(o.btmWords, 150 + 600);
        _hide(o.btnNext); _fadeIn(o.btnNext, 150 + 1200);

    },

    onend: function (self) {
        self.objects.iterated.dehighlightPayoff();
        self.remove("topWords");
        self.remove("btmWords");
        self.remove("btnNext");
        _.clear();
    }

});

