function SilderInput(config) {

    var self = this;
    self.id = config.id;
    self.slideshow = config.slideshow;

    // Create DOM
    self.dom = document.createElement("div");
    self.dom.className = "object";
    self.dom.style.left = config.x + "px";
    self.dom.style.top = config.y + "px";
    var dom = self.dom;

    var sliders = [];
    var _makePopulationControl = function (x, y, peepID, defaultValue) {

        // DOM
        var popDOM = document.createElement("div");
        popDOM.className = "silder_input";
        popDOM.style.left = x;
        popDOM.style.top = y;
        dom.appendChild(popDOM);

        // Message
        var message = "sandbox/pop/" + peepID;


        // Label: Name
        var popName = document.createElement("div");
        popName.className = "silder_input_label";
        popName.innerHTML = Words.get(config.text_id);
        popName.style.textAlign = "left";
        popDOM.appendChild(popName);

        // Label: Amount
        var popAmount = document.createElement("div");
        popAmount.className = "silder_input_amount";
        popAmount.style.textAlign = "center";
        popAmount.style.color = PEEP_METADATA[peepID].color;
        popDOM.appendChild(popAmount);
        listen(self, message, function (value) {
            popAmount.innerHTML = value;
        });
        self.popAmount = popAmount;

        // Label: unit
        var popUnit = document.createElement("div");;
        popUnit.className = "silder_input_unit";
        popUnit.style.textAlign = "left";
        popUnit.style.color = PEEP_METADATA[peepID].color;
        popUnit.innerHTML = Words.get(config.unit_text_id);
        popDOM.appendChild(popUnit);

        // Slider
        (function (peepID) {
            var popSlider = new Slider({
                x: 0, y: 35, width: 200,
                min: 1, max: 20, step: 1,
                message: message,
                onchange: function (value) {
                    _adjustPopulation(peepID, value);
                }
            });
            sliders.push(popSlider);
            popSlider.slideshow = self.slideshow;
            popDOM.appendChild(popSlider.dom);
        })(peepID);

        // Default value!
        publish(message, [defaultValue]);

    };
    var yOff = 40;
    _makePopulationControl(0, yOff + 0, "tft", 10);

    // Adjust the WHOLE population...
    /******************************

    Adjust by SCALING. (and in the edge case of "all zero", scale equally)
    Round to integers. (if above or below 25 in total, keep adding/subtracting 1 down the line)

    ******************************/
    var _population;
    var _remainder;
    var _adjustPopulation = function (peepID, value) {


        // Adjust everyone to scale, ROUNDING.
        var total = value;

        // Difference... 
        var diff = 25 - total;
        // If negative, remove one starting from BOTTOM, skipping anchor.
        // (UNLESS IT'S ZERO)
        if (diff < 0) {
            for (var i = Voter.INITIAL_AGENTS.length - 1; i >= 0 && diff < 0; i--) {
                // do NOT adjust anchor.
                var conf = Voter.INITIAL_AGENTS[i];
                if (conf.strategy == peepID) continue;
                if (conf.count == 0) continue; // DON'T DO IT IF IT'S ZERO
                conf.count--; // REMOVE
                diff++; // yay
            }
        }
        // If positive, add one starting from TOP, skipping anchor.
        // (UNLESS IT'S ZERO)
        var everyoneElseWasZero = true;
        if (diff > 0) {
            for (var i = 0; i < Voter.INITIAL_AGENTS.length && diff > 0; i++) {
                // do NOT adjust anchor.
                var conf = Voter.INITIAL_AGENTS[i];
                if (conf.strategy == peepID) continue;
                if (conf.count == 0) continue; // DO NOT ADD IF ZERO
                everyoneWasZero = false;
                conf.count++; // ADD
                diff--; // yay
            }
        }
        // ...edge case. fine w/e
        if (everyoneElseWasZero) {
            for (var i = 0; i < Voter.INITIAL_AGENTS.length && diff > 0; i++) {
                // do NOT adjust anchor.
                var conf = Voter.INITIAL_AGENTS[i];
                if (conf.strategy == peepID) continue;
                // if(conf.count==0) continue; // DO NOT ADD IF ZERO
                // everyoneWasZero = false;
                conf.count++; // ADD
                diff--; // yay
            }
        }

        // NOW adjust UI
        for (var i = 0; i < Voter.INITIAL_AGENTS.length; i++) {
            // do NOT adjust anchor.
            var conf = Voter.INITIAL_AGENTS[i];
            if (conf.strategy == peepID) continue;
            publish("sandbox/pop/" + conf.strategy, [conf.count]);
        }

        // Reset!
        publish("Voter/reset");

    };

    // Add...
    self.add = function () {
        _add(self);
    };

    // Remove...
    self.remove = function () {
        //for(var i=0;i<numbers.length;i++) unlisten(numbers[i]);
        for (var i = 0; i < sliders.length; i++) unlisten(sliders[i]);
        unlisten(self);
        _remove(self);
    };

}