function SizeBox(config) {

    var self = this;
    self.id = config.id;

    // Create DOM
    self.dom = document.createElement("div");
    self.dom.className = "object";
    self.dom.classList.add("sizebox");

    // Customize
    _configText(config, self.dom);
    
    // Set Size!
    self.setSize = function (size) {
        self.dom.innerHTML = `${size} ${Words.get('coin')}`;
    };

    if (config.size) self.setSize(config.size);

    if (config.background != undefined) {
        self.dom.style.backgroundColor = config.background;
    }

    // Add & Remove
    self.add = function () { _add(self); };
    self.remove = function () { _remove(self); };

}