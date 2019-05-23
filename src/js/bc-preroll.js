var $ = require("./lib/qsa");

var makePlayer = function(id) {
  return `
<iframe src="//players.brightcove.net/1509317113/V1eCvUwO2g_default/index.html?videoId=${id}&autoplay=true" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
`;
};

$(".bc-preroll").forEach(function(vidbox) {
  var id = vidbox.getAttribute("data-id");
  var replace = function() {
    vidbox.innerHTML = makePlayer(id);
    vidbox.removeEventListener("click", replace);
  };
  vidbox.addEventListener("click", replace);
});