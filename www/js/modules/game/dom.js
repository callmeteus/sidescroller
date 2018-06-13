var $container 			= $("<div/>").appendTo("body");

$(document.body).tooltip({
	selector: 	"[title]",
	html: 		true
});

new WOW().init();