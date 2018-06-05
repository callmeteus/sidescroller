var app_mustache_cache 	= {};

/**
 * Function to render already loaded Mustache templates into [target]
 * @param  {[type]}   template [the template string]
 * @param  {[type]}   target   [render target]
 * @param  {[type]}   data     [data object]
 * @param  {[type]}   append   [if it's an append or replace]
 * @param  {Function} callback [the callback]
*/
function app_mustache_render(template, target, data, append, callback) {
	Mustache.parse(template);
	template 			= Mustache.render(template, Object.assign({}, app_config, data));

	if (target != null) {
		var $target 	= $(target);

		if (!append)
			$target.html(template);
		else
			$target.append(template);
	}

	if (typeof callback === "function")
		callback(template);
};

/**
 * Function to load and render Mustache templates into [target]
 * @param  {[type]} file   [file to render]
 * @param  {[type]} target [render target]
 * @param  {[type]}   data     [data object]
 * @param  {[type]}   append   [if it's an append or replace]
 * @param  {Function} callback [the callback]
*/
function app_mustache_load(file, target, data, append, callback) {
	if (typeof app_mustache_cache[file] === "undefined")
		$.get("inc/" + file + ".mustache", function(template) {
			app_mustache_render(template, target, data, append, function(tpl) {
				if (!append)
					document.currentPage 	= file;

				$(window).trigger("pageload");
				

				if (typeof callback === "function")
					callback(tpl);
			});

			// Cache template
			app_mustache_cache[file] 	= template;
		})
	else
		app_mustache_render(app_mustache_cache[file], target, data, append, callback);
}