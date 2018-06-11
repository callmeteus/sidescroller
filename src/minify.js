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