(function () {
	var hm = document.createElement("noscript");
	var iframe = document.createElement("iframe");
	iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-KJ452JQX";
	iframe.height = 0;
	iframe.width = 0;
	iframe.style.display = "none";
	iframe.style.visibility = "hidden";
	hm.appendChild(iframe);
	var s = document.querySelector("#app");
	s.parentNode.insertBefore(hm, s);
})();
