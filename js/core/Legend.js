function Legend(config) {

    var self = this;
    self.id = config.id;
    self.config = config;

    // Create DOM
    var button = document.createElement("div");
    button.className = "object";
    button.classList.add("button");
    if (config.size) button.setAttribute("size", config.size);
    self.dom = button;

    // TOOLTIP?
    if (config.tooltip) {
        self.dom.style.width = 190;
        self.dom.style.height = 55;
        self.dom.style.position = "absolute";
        self.dom.setAttribute("data-balloon-length", "large");
        self.dom.setAttribute("data-balloon", Words.get(config.tooltip));
        self.dom.setAttribute("data-balloon-pos", "left");
    }

    // BG
    var bg = document.createElement("div");
    bg.id = "background";
    var text = document.createElement("div");
    text.id = "text";
    var hitbox = document.createElement("div");
    hitbox.id = "hitbox";

    button.appendChild(bg);
    button.appendChild(text);
    button.appendChild(hitbox);

    // Customize DOM
    button.style.left = config.x + "px";
    button.style.top = config.y + "px";
    self.setText = function (text_id) {
        var words = Words.get(text_id);
        if (config.uppercase) words = words.toUpperCase();
        self.setText2(words);
    };
    self.setText2 = function (words) {
        text.innerHTML = words;
    };
    self.setText(config.text_id);

    if (config.color) text.style.color = config.color

    // Add & Remove
    self.add = function () { _add(self); };
    self.remove = function () {
        unlisten(self);
        _remove(self);
    };

}