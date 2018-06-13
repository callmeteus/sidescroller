String.prototype.replaceAll = String.prototype.replaceAll || function(needle, replacement) {
	return this.split(needle).join(replacement);
};

// Remove HTML
String.prototype.htmlEntities   = function() {
    return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

// Base 64 decode
global.atob = function(str) {
    return new Buffer(str, "base64").toString("utf8");
};

// Base 64 encode
global.btoa = function(str) {
    return new Buffer(str).toString("base64");
};

app_is_object 					= function(obj) {
	return Object.prototype.toString.call(obj) === "[object Object]"
}

app_object_addPrefix			= function(object, prefix) {
	for(var key in object) {
		if (app_is_object(object[key]))
			app_object_addPrefix(object[key], prefix);
		else {
			object[prefix + key] 	= object[key];
			delete(object[key]);
		}
	}
};

app_object_removePrefix			= function(object, prefix) {
	for(var key in object) {
		if (app_is_object(object[key]))
			app_object_removePrefix(object[key], prefix);
		else {
			object[key.replace(prefix, "")] 	= object[key];
			delete(object[key]);
		}
	}
};

app_treat_output 				= function(obj) {
	var output 	= "";

	if (typeof obj === "boolean" || typeof obj === "number") 
		output = obj.toString();

	if (typeof obj === "string")
		output = '"' + obj + '"';

	return output;
}