// Minify string
app_minify      = function(s) {
	return s.replace(new RegExp("\n", "g"), "");
};

// Minify JS
// TODO fix minification
app_minify_js   = function(s) {
	s               = s.trim();

	const replaces  = [
        /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm,           // Comments
        /[\t\n\r]/g,                                    // Characters
        /^\s+|\s+$|\s+(?=\s)/g                          // Whitespace
    ];

    const oReplaces = {
        ")else":        ");else",                       // else final fix
        "else":         "else ",                        // else space fix
        ") {":          "){",                           // function fix
        "}$":           "};$",                          // jquery function fix
        " = ":          "=",                            // equal space fix
        ", ":           ",",                            // comma space fix
        "if ":          "if",                           // if space remove
        "}function":    "};function",                   // function final fix
        ")function":    ");function",                   // function final fix 2
        "}var":         "};var",                        // var final fix
        ")var":         ");var",                        // var final fix 2
        " || ":         "||",                           // or op. space fix
        "return (":     "return(",                      // return space fix
        "try {":        "try{",                         // try space fix
    }

    for(var r in replaces)
    	s   = s.replace(replaces[r], "");

    for(var r in oReplaces)
    	s   = s.replaceAll(r, oReplaces[r]);

    return s;
};

app_minify_css = function(s) {
    return String(s)
        .replace(/\/\*[\s\S]*?\*\//g, ' ') // Comments
        .replace(/\s+/g, ' ') // Extra spaces
        .replace(/([\(\)\{\}\:\;\,]) /g, '$1') // Extra spaces
        .replace(/ \{/g, '{') // Extra spaces
        .replace(/\;\}/g, '}') // Last semicolon
        .replace(/ ([+~>]) /g, '$1') // Extra spaces
        .replace(/([^{][,: \(\)]0)(%|px|pt|pc|rem|em|ex|cm|mm|in)([, };\(\)])/g, '$1$3') // Units for zero values
        .replace(/([: ,=\-\(])0\.(\d)/g, '$1.$2') // Lead zero for float values
        .replace(/([^\}]*\{\s*?\})/g, '') // Empty rules
        .replace(/([,: \(])#([0-9a-f]{6})/gi, function(m, pfx, clr) { // HEX code reducing
            if (clr[0] == clr[1] && clr[2] == clr[3] && clr[4] == clr[5]) return pfx + '#' + clr[0] + clr[2] + clr[4];
            return pfx + '#' + clr;
        });
}