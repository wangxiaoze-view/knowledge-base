const ID = "GTM-KJ452JQX";
export const googleGtm = `
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "${ID}");
`;

export const googleNs = `
(function () {
  var hm = document.createElement("noscript");
  var iframe = document.createElement("iframe");
  iframe.src = "https://www.googletagmanager.com/ns.html?id=${ID}";
  iframe.height = 0;
  iframe.width = 0;
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";
  hm.appendChild(iframe)
  var s = document.querySelector("#app");
  s.parentNode.insertBefore(hm, s);
})();
`;

const websiteId = "63e283e0-9946-4f12-a732-c0e74a121289";
export const baidu = `
(function() {
  let hm = document.createElement("script");
  hm.src = "https://cloud.umami.is/script.js";
  hm.setAttribute("data-website-id", "${websiteId}");
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
`;
