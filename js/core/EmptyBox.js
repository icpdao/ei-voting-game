function EmptyBox(config) {

    var self = this;
    self.id = config.id;

    // Create DOM
    self.dom = document.createElement("div");
    self.dom.className = "object";
    self.dom.classList.add("emptybox");

    // Customize
    _configText(config, self.dom);

    // Add & Remove
    self.add = function () { _add(self); };
    self.remove = function () { _remove(self); };

}