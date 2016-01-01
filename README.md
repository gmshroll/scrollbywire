# scrollbywire.js
Smooth scroll web pages by disconnecting user input from scroll position - with tick callbacks for animation (i.e. parallax)

Scrollbywire.js works by taking the user's 'scroll request', whether mouse wheel, touchstart or scrollbar and keeping this disconnected from the actual scroll position of the page (in both axes). The requested position is then eased towards to give a smooth scroll effect. 

You can receive tick callbacks by calling ```scrollbywire.addCallback(callback);``` e.g.

```
	scrollbywire.addCallback(function(obj){
		// do something with obj.x and obj.y
		var parallax = obj.y * 0.5;
	});
```

Scrollbywire.js will look for a wrapper element with an ID of 'scrollbywire' or create one and put all body content inside it.  As such, note that any scripts inline in the <body> will potentially be run twice by the browser if you do not create a wrapper div in the HTML doc.