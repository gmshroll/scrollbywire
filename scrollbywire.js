(function scrollbywire(){
	
	var wrapperElementID = "scrollbywire";
	var easingAmount = 0.4;
	var bodyelem = document.body;
	var tickCallbacks = [];
	
	// see if wrapper exists and set CSS accordingly, or wrap document if it doesn't
	if (!document.getElementById(wrapperElementID)){ 
		bodyelem.innerHTML = '<div id="' + wrapperElementID + '" style="overflow:hidden;position:fixed;width:100%;top:0px;bottom:0px;">' + bodyelem.innerHTML + "</div>";
	} else { 
		document.getElementById(wrapperElementID).style.overflow = "hidden";
		document.getElementById(wrapperElementID).style.position = "fixed";
		document.getElementById(wrapperElementID).style.left = "0px";
		document.getElementById(wrapperElementID).style.top = "0px";
		document.getElementById(wrapperElementID).style.bottom = "0px";
		document.getElementById(wrapperElementID).style.right = "0px";
	}
	
	var divScrollbywire = document.getElementById(wrapperElementID);
	
	function tick(){
		// request tick before processing to ensure constant speed
		requestAnimFrame(tick);
		
		// set height of body to match scrollbywire wrapper
		var h = divScrollbywire.scrollHeight;
		bodyelem.style.height = h + "px";
		
		// determine distance from required position
		var bodyX = (document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft;
		var bodyY = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		var scrollbywireX = divScrollbywire.scrollLeft;
		var scrollbywireY = divScrollbywire.scrollTop;
		
		var xDistance = bodyX - scrollbywireX;
		var yDistance = bodyY - scrollbywireY;
		var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
		if (distance > 1) {
			var newScrolls = {x: scrollbywireX + (xDistance * easingAmount), y: scrollbywireY + (yDistance * easingAmount) };
			divScrollbywire.scrollLeft = newScrolls.x;
			divScrollbywire.scrollTop = newScrolls.y;
			for (var i in tickCallbacks){
				tickCallbacks[i](newScrolls);
			}
		} 
	}
	
	// requestAnimFrame shim
	window.requestAnimFrame = (function(){
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
	})();
	
	// call first tick...
	tick();
	
	window.scrollbywire.addCallback = function(callback){
		tickCallbacks.push(callback);
	}
	
}());