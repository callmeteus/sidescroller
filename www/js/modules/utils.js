Number.prototype.fancyTimeFormat    = function() {
    return ((this / 60 < 10) ? "0" : "") + ~~(this / 60) + ":" + (this % 60 < 10 ? "0" : "") + this % 60;
};

jQuery.fn.serializeObject = function() {
  var arrayData, objectData;
  arrayData = this.serializeArray();
  objectData = {};

  $.each(arrayData, function() {
    var value;

    if (this.value != null)
      value = this.value;
    else
      value = "";

    if (objectData[this.name] != null) {
      if (!objectData[this.name].push) {
        objectData[this.name] = [objectData[this.name]];
      }

      objectData[this.name].push(value);
    } else
      objectData[this.name] = value;
  });

  return objectData;
};

var animationEnd = (function(el) {
  var animations = {
    animation: "animationend",
    OAnimation: "oAnimationEnd",
    MozAnimation: "mozAnimationEnd",
    WebkitAnimation: "webkitAnimationEnd",
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
})(document.createElement("div"));