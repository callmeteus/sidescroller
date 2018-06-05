Number.prototype.fancyTimeFormat    = function() {
    return ((this / 60 < 10) ? "0" : "") + ~~(this / 60) + ":" + (this % 60 < 10 ? "0" : "") + this % 60;
}