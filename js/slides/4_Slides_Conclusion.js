SLIDES.push({
    id: "conclusion",
    onstart: function (self) {

        var o = self.objects;

        // Words
        self.add({
            id: "text", type: "TextBox", text_id: "conclusion", align: "center", size: '1.3em'
        });
        _hide(o.text); _fadeIn(o.text, 100);

        // Worse...
        self.add({
            id: "next", type: "Button",
            x: 750, y: 450,
            text_id: "continue_button",
            message: "slideshow/next"
        });
        _hide(o.next); _fadeIn(o.next, 400);

    },
    onend: function (self) {
        self.clear();
    }
});
