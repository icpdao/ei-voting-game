function DialogueBox(config) {

    var self = this;
    self.id = config.id;

    // Create DOM
    self.dom = document.createElement("div");
    self.dom.className = "object dialogue_box";
    self.dom.style.left = config.x + "px";
    self.dom.style.top = config.y + "px";

    var t = document.createElement("div");
    t.className = "dialgoue_box_tips";
    self.dom.appendChild(t);
    var b = document.createElement("div");
    b.className = "dialgoue_box_pop"
    b.innerHTML = Words.get(config.text_id);
    self.dom.appendChild(b);

    // Add & Remove
    self.add = function () { _add(self); };
    self.remove = function () { _remove(self); };

}