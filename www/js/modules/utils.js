Number.prototype.fancyTimeFormat    = function() {
    return ((this / 60 < 10) ? "0" : "") + ~~(this / 60) + ":" + (this % 60 < 10 ? "0" : "") + this % 60;
};

var animationEnd = (function(el) {
  var animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
})(document.createElement('div'));