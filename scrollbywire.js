(function scrollbywire(){
	var touchbool = false;	
	var tickCallbacks = [];
	var docLoaded = setInterval(function () {
		if(document.readyState === "complete") {
			clearInterval(docLoaded);
			
			var wrapperElementID = "scrollbywire";
			var easingAmount = 0.4;
			var bodyelem = document.body;
			
			// see if wrapper exists and set CSS accordingly, or wrap document if it doesn't
			if (!document.getElementById(wrapperElementID)){ 
				bodyelem.innerHTML = '<div id="' + wrapperElementID + '" style="overflow:hidden;position:fixed;width:100%;top:0px;bottom:0px;">' + bodyelem.innerHTML + "</div>";
			} else { 
				document.getElementById(wrapperElementID).style.overflow = "hidden";
				document.getElementById(wrapperElementID).style.position = "fixed";
				document.getElementById(wrapperElementID).style.width = "100%";
				document.getElementById(wrapperElementID).style.top = "0px";
				document.getElementById(wrapperElementID).style.bottom = "0px";
			}
			
			var divScrollbywire = document.getElementById(wrapperElementID);
			
			function tick(){
				// request tick before processing to ensure constant speed
				requestAnimFrame(tick);
				
				// set height of body to match scrollbywire wrapper
				var h = divScrollbywire.scrollHeight;
				if (touchbool == false){
					bodyelem.style.height = h + "px";
				} else {
					bodyelem.style.height = "auto";
				}
				
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
		}
	}, 100);
	
	window.scrollbywire_addCallback = function(callback){
		tickCallbacks.push(callback);
	}
	
	var saddEventListener = function(obj, evt, fnc) {
		if (obj.addEventListener) {
			obj.addEventListener(evt, fnc, false);
			return true;
		} 
		else if (obj.attachEvent) {
			return obj.attachEvent('on' + evt, fnc);
		}	
	}
		
	// switch off scrollbywire on touchstart (ios fix)
	var body = document.body || document.documentElement;
	saddEventListener(body,'touchstart', function(event) {
		var wrapperElementID = "scrollbywire";
		document.getElementById(wrapperElementID).style.overflow = "auto";
		document.getElementById(wrapperElementID).style.position = "relative";
		document.getElementById(wrapperElementID).style.width = "auto";
		document.getElementById(wrapperElementID).style.top = "auto";
		document.getElementById(wrapperElementID).style.bottom = "auto";
		touchbool = true;
	}, false); 
	
}());