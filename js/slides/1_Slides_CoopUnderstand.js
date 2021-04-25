// THE TRUST GAME - COOPERATE, YA NO?
SLIDES.push({

    id: "coop_understand",

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
            x: 295, y: 570, unit_text_id: 'coop_understand_0_unit'
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
            id: "btnSubmit", type: "Button", x: 515, y: 570, text_id: "coop_understand_0_submit",
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
        self.add({
            id: "topWords", type: "TextBox", text_id: "coop_understand_1_top",
            x: 21, y: 54, width: 918, height: 100, align: "left"
        });
        // Voter
        Tournament.resetGlobalVariables();
        Tournament.INITIAL_AGENTS = [
            { strategy: "greedy", count: 1 },
            { strategy: "honest", count: 1 },
            { strategy: "oneself", count: 1 },
        ];
        self.add({ id: "voter", type: "Tournament", x: 130, y: 110 });
        // Ballot Box
        self.add({
            id: "ballotBox", type: "ImageBox",
            src: "assets/ballot/ballot_box.png",
            x: 330, y: 320, width: 100
        });
        // Ballot ticket
        self.add({
            id: "ballotTickets", type: "BallotTicket",
            x: 130, y: 110
        });

        // Legend
        self.add({
            id: 'honestLegend', type: 'Legend', x: 600, y: 170, text_id: "honest_legend",
            color: '#f6b24c', show_text: false
        })
        self.add({
            id: 'greedLegend', type: 'Legend', x: 600, y: 270, text_id: "greed_legend",
            color: '#52537F', show_text: false
        })
        self.add({
            id: 'oneselfLegend', type: 'Legend', x: 600, y: 370, text_id: "oneself_legend",
            color: '#4089DD', show_text: false
        })

        // vote text
        self.add({
            id: "greedyVote", type: "TextBox", text_id: "coop_understand_1_greedy_vote",
            x: 21, y: 520, align: "left"
        });
        self.add({
            id: "honestVote", type: "TextBox", text_id: "coop_understand_1_honest_vote",
            x: 21, y: 550, align: "left"
        });
        self.add({
            id: "oneselfVote", type: "TextBox", text_id: "coop_understand_1_oneself_vote",
            x: 21, y: 580, align: "left"
        });

        // buttons
        self.add({
            id: "honestBtnSubmit", type: "Button", x: 240, y: 630, text_id: "coop_understand_1_honest_button",
            uppercase: true,
            onclick: function () {
                _.oneselfVote = "HONEST";
                publish("slideshow/next");
            }
        });
        self.add({
            id: "greedyBtnSubmit", type: "Button", x: 480, y: 630, text_id: "coop_understand_1_greedy_button",
            uppercase: true,
            onclick: function () {
                _.oneselfVote = "GREEDY";
                publish("slideshow/next");
            }
        });

        _hide(o.greedyVote); _fadeIn(o.greedyVote, 0);
        _hide(o.honestVote); _fadeIn(o.honestVote, 1000);
        _hide(o.oneselfVote); _fadeIn(o.oneselfVote, 2000);
        _hide(o.honestBtnSubmit); _fadeIn(o.honestBtnSubmit, 2000);
        _hide(o.greedyBtnSubmit); _fadeIn(o.greedyBtnSubmit, 2000);
        o.ballotTickets.playAC(2);

    },
    onend: function (self) {
        self.remove("topWords");
        self.remove("voter");
        self.remove("ballotBox");
        self.remove("ballotTickets");
        self.remove("honestLegend");
        self.remove("greedLegend");
        self.remove("oneselfLegend");
        self.remove("greedyVote");
        self.remove("honestVote");
        self.remove("oneselfVote");
        self.remove("honestBtnSubmit");
        self.remove("greedyBtnSubmit");
    }

}, {

    onstart: function (self) {

        var o = self.objects;
        var honestEI = 0;
        var greedyEI = 0;
        var oneselfEI = 0;
        if (_.oneselfCoin <= 12) oneselfEI++ 
        else greedyEI++
        if (_.oneselfCoin <= 8) oneselfEI++
        else honestEI++
        if (_.oneselfVote == "HONEST") honestEI++
        else greedyEI++
        VOTERESULT = [
            { id: 'honest', color: '#f6b24c', coin: 8, ei: honestEI },
            { id: 'greed', color: '#52537F', coin: 12, ei: greedyEI },
            { id: 'oneself', color: '#4089DD', coin: _.oneselfCoin, ei: oneselfEI },
        ]

        // words
        self.add({
            id: "topWords", type: "TextBox", text_id: "coop_understand_2_top_word",
            x: 21, y: 54, width: 918, height: 100, align: "left"
        });

        self.add({
            id: "btmWords", type: "TextBox", text_id: "coop_understand_2_bottom_word",
            x: 21, y: 467, width: 970, lineHeight: 1.2, align: "left"
        });

        // continue
        self.add({
            id: "continueButton", type: "Button", x: 750, y: 600, text_id: "continue_button",
            uppercase: true, message: "slideshow/next"
        });

        // table header
        self.add({
            id: `headerVoteAchievement`, type: "TextBox", text_id: 'coop_understand_2_table_head_1',
            x: 30 + 260, y: 100, width: 100, height: 50, align: "center"
        })
        self.add({
            id: `headerVoteOffer`, type: "TextBox", text_id: `coop_understand_2_table_head_2`,
            x: 30 + 260 + 150, y: 100, width: 100, height: 50, align: "center"
        })
        self.add({
            id: `headerVoteEI`, type: "TextBox", text_id: 'coop_understand_2_table_head_3',
            x: 30 + 260 + 150 + 150, y: 100, width: 100, height: 50, align: "center",
        })
        self.add({
            id: `headerVoteEarn`, type: "TextBox", text_id: 'coop_understand_2_table_head_4',
            x: 30 + 260 + 150 + 150 + 150, y: 100, width: 150, height: 50, align: "center",
        })

        // vote result
        for (let i = 0; i < VOTERESULT.length; i++) {
            const vt = VOTERESULT[i];
            self.add({
                id: `${vt.id}VoteLegend`, type: 'Legend', x: 30, y: 170 + i * 100, text_id: `${vt.id}_legend`,
                color: vt.color,
            })
            self.add({
                id: `${vt.id}VoteAchievement`, type: "TextBox", text: '1',
                x: 30 + 260, y: 180 + i * 100, width: 100, height: 50, align: "center"
            })
            self.add({
                id: `${vt.id}VoteOffer`, type: "TextBox", text: `${vt.coin} ${Words.get('coin')}`,
                x: 30 + 260 + 150, y: 180 + i * 100, width: 100, height: 50, align: "center"
            })
            var eiColor = '#417505';
            var earn = vt.coin;
            if (vt.ei < 0.8) {
                eiColor = '#B0051A';
                earn /= 2;
            } else if (vt.ei < 2) {
                eiColor = '#4A90E2';
            }
            self.add({
                id: `${vt.id}VoteEI`, type: "TextBox", text: vt.ei,
                x: 30 + 260 + 150 + 150, y: 180 + i * 100, width: 100, height: 50, align: "center",
                color: eiColor
            })
            self.add({
                id: `${vt.id}VoteEarn`, type: "TextBox", text: earn,
                x: 30 + 260 + 150 + 150 + 150, y: 180 + i * 100, width: 150, height: 50, align: "center",
                color: '#E4A234'
            })
        }

    },

    onend: function (self) {
        self.clear();
    }

});

