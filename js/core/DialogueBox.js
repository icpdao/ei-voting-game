function DialogueBox(config) {

    var self = this;
    self.id = config.id;

    // Create DOM
    self.dom = document.createElement("div");
    self.dom.className = "object dialogue_box";
    self.dom.style.left = config.x + "px";
    self.dom.style.top = config.y + "px";

    var t = document.createElement("div");
    if (config.align == 'right') {
        t.className = "dialgoue_box_tips_right";
    } else {
        t.className = "dialgoue_box_tips";
    }
    var b = document.createElement("div");
    b.className = "dialgoue_box_pop"
    if (config.text_id != undefined) {
        b.innerHTML = Words.get(config.text_id);
    }
    if (config.text != undefined) {
        b.innerHTML = config.text;
    }
    if (config.width != undefined) {
        b.style.width = `${config.width}px`;
    }
    if (config.align == 'right') {
        self.dom.appendChild(b);
        self.dom.appendChild(t);
    } else {
        self.dom.appendChild(t);
        self.dom.appendChild(b);
    }
    

    // Add & Remove
    self.add = function () { _add(self); };
    self.remove = function () { _remove(self); };

}