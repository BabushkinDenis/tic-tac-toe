"use strict";
var eventMixin = require("../mixins/event");


function RegForm(wrap) {
    this.wrap = wrap;
    this.wrap.getElementsByTagName("button")[0].addEventListener("click", this.clickBtnHandler.bind(this));
}

RegForm.prototype.clickBtnHandler = function() {
    var self = this;
    this.wrap.classList.add("_hidden");
    this.trigger("form-submited", {
        pleerName: this.wrap.getElementsByTagName("input")[0].value || "noName"
    });
   
}


for (var key in eventMixin) {
    RegForm.prototype[key] = eventMixin[key];
}


module.exports = RegForm;