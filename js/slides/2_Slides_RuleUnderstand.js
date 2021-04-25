SLIDES.push({

    id: "rule_understand",

    onstart: function (self) {

        var o = self.objects;

        // Words on top & bottom

        self.add({
            id: "topTitle", type: "TextBox", text_id: "rule_understand_0_title",
            x: 21, y: 5, width: 918, height: 50, align: "center"
        });

        self.add({
            id: "topWords", type: "TextBox", text_id: "rule_understand_0_top_word",
            x: 21, y: 54, width: 918, height: 100, align: "left"
        });

        self.add({
            id: "btmWords", type: "TextBox", text_id: "rule_understand_0_bottom_word",
            x: 21, y: 500, width: 918, height: 300, align: "left"
        });

        // Button
        self.add({
            id: "beginButton", type: "Button", x: 320, y: 550, uppercase: true, size: "long",
            text_id: "rule_understand_0_button",
            onclick: function () {
                publish("slideshow/next");
            }
        });

        // Hide & fade
        _hide(o.topWords); _fadeIn(o.topWords, 150 + 10);
        _hide(o.btmWords); _fadeIn(o.btmWords, 150 + 600);
        _hide(o.beginButton); _fadeIn(o.beginButton, 150 + 1200);

        // peep
        self.add({ id: "peepShow", type: "PeepShow", x: 21, y: 170, offsetX: [0, 0, 0] })
        _hide(o.peepShow);
        const pair = {};
        const peep = [
            { i: 1, sourceSize: { "x": 10, "y": 10 }, background: '#F6C06F' },
            { i: 2, sourceSize: { "x": 427, "y": 10 }, background: '#52547C' },
            { i: 3, sourceSize: { "x": 160, "y": 10 }, background: '#5088D7' },
        ];
        peep.forEach((p, i) => {
            const issueNum = getRandomIntInclusive(2, 4);
            let issuesSize = [];
            for (let i = 0; i < issueNum; i++) {
                const size = getRandomIntInclusive(3, 5);
                issuesSize.push(size);
            }
            pair[p.i] = issuesSize;
            peep[i].size = issuesSize;
        })
        _.pair = pair;
        var animated = [];
        for (let i = 0; i < peep.length; i++) {
            const p = peep[i];
            for (let j = 0; j < p.size.length; j++) {
                const size = p.size[j]
                self.add({
                    id: `${i}${j}SizeBox`, type: "SizeBox", size: size,
                    x: 400 + j*80, y: 200 + i*100, align: "center", background: p.background
                })
                animated.push({
                    id: `${i}${j}SizeBox`, wait: j * 80
                })
                _hide(o[`${i}${j}SizeBox`]);
            }
            self.add({
                id: `${i}DialogueBox`, type: "DialogueBox", align: 'right', width: 250,
                text: Words.get('rule_understand_0_dialogue').replace('${size_num}', p.size.length),
                x: 25, y: 205 + i * 100,
            })
            _hide(o[`${i}DialogueBox`]);
            animated.push({
                id: `${i}DialogueBox`, wait: p.size.length * 80
            })
        }
        setTimeout(function() {
            _fadeIn(o.peepShow, 0);
            o.peepShow.move({
                x: 80, w: 0
            });
            for (let i = 0; i < animated.length; i++) {
                const ani = animated[i];
                _fadeIn(o[ani.id], ani.wait);
            }
        }, 650)

    },
    onend: function (self) {
        self.clear();
    }

});

SLIDES.push({

    onstart: function (self) {

        var o = self.objects;

        self.add({
            id: "topTitle", type: "TextBox", text_id: "rule_understand_0_title",
            x: 21, y: 5, width: 918, height: 50, align: "center"
        });
        self.add({
            id: "topWords", type: "TextBox", text_id: "rule_understand_1_top_word",
            x: 21, y: 54, width: 918, height: 100, align: "left"
        });
        self.add({
            id: "btmWords", type: "TextBox", text_id: "rule_understand_1_bottom_word",
            x: 21, y: 500, width: 918, height: 300, align: "left"
        });

        // Button
        self.add({
            id: "continueButton", type: "Button", x: 750, y: 600, text_id: "continue_button",
            uppercase: true, message: "slideshow/next"
        });

        var paired = kmSimplePair(_.pair);
        console.log(paired);

        const color = { 1: '#5088D7', 2: '#52547C', 3: '#F6C06F' };
        var tmpOffset = 0;
        var peepOffsetX = [];
        var preX = 0;
        var pairedObject = [];
        for (let i = 0; i < paired.length; i++) {
            const p = paired[i];
            for (let j = 0; j < p.length; j++) {
                const pair = p[j];
                var nextJ = j;
                if (j >= 3) {
                    nextJ = j % 3;
                    if (nextJ == 0) tmpOffset ++;
                }
                pairedObject = pairedObject.concat([
                    {
                        id: `${i}${j}SizeBoxCircel`, type: "ImageBox", width: 170,
                        x: 5 + tmpOffset * 180 + i * 200, y: 182 + nextJ * 100, src: "assets/ui/sizebox_circle.png",
                    },
                    {
                        id: `${i}${j}SizeBoxA`, type: "SizeBox", size: pair[0].p,
                        x: 20 + tmpOffset * 180 + i * 200, y: 200 + nextJ * 100, align: "center", background: color[pair[0].i]
                    },
                    {
                        id: `${i}${j}SizeBoxB`, type: "SizeBox", size: pair[1].p,
                        x: 20 + tmpOffset * 180 + 80 + i * 200, y: 200 + nextJ * 100, align: "center", background: color[pair[1].i]
                    }
                ]);
            }
            peepOffsetX.push(preX + (20 + tmpOffset * 180 + 80 + i * 200 + 70 - preX) / 2);
            preX = 20 + tmpOffset * 180 + 80 + i * 200 + 70;
        }
        // Peeps
        pairedObject.unshift({
            id: "peepRow", type: "PeepShow", x: 21, y: -60, offsetX: peepOffsetX, offsetY: [0, 0, 0], scale: [0.2, 0.2, 0.2], width: 950
        });
        var fillX = 0;
        if (preX < 900) {
            fillX = (900 - preX) / 2;
        }
        var animationDelay = 0;
        pairedObject.forEach((p) => {
            p.x += fillX;
            self.add(p);
            _hide(o[p.id]);
            _fadeIn(o[p.id], animationDelay);
            animationDelay += 100;
        });

    },

    onend: function (self) {
        self.clear();
    }

});
