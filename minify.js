String.prototype.replaceAll = String.prototype.replaceAll || function(needle, replacement) {
    return this.split(needle).join(replacement);
};

// Minify string
app_minify      = function(s) {
    return s.replace(new RegExp("\n", "g"), "");
};

// Minify JS
app_minify_js   = function(s) {
    const replaces  = [
        /\/\*(.|[\r\n])*?\*\//gmi,
        /\/\/.*/gmi,
        new RegExp("  ", "gmi"),
        new RegExp("\t", "gmi"),
        new RegExp("\r\n", "gmi")
    ];
   
    for(var r in replaces)
        s   = s.replace(replaces[r], "");

    s       = s.replaceAll(")else", ");else");
    s       = s.replaceAll("else", "else ");
    s       = s.replaceAll(") {", "){");

    s       = s.replaceAll(" = ", "=");
    s       = s.replaceAll(", ", ",");
    s       = s.replaceAll("if ", "if");

    s       = s.replaceAll("}function", "};function");
    s       = s.replaceAll("}var ", "};var ");
    s       = s.replaceAll(" || ", "||");

    return s;
};