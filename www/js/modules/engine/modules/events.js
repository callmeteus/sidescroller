(function() {
	function EngineEvent(ev) {
		return (function() { console.warn("Event", ev, "called without handler", arguments) });
	}

	Sidescroller.Events.get 	= function(ev) {
		return this[ev] || EngineEvent(ev);
	};
})();