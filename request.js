var request = require('request');
var jsdom = require('jsdom');
var url = require('url');
var jquery = require('jquery');


function site_map(uri) {
  var home =  url.parse(uri).href;
  var site = {};

  jsdom.env({
    html: uri,
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (errors, window) {
      var $ = window.$;
      $("a").each(function() {
        var page = url.parse(url.resolve(home,$(this).attr('href')));
        
      });
    }
  });
}

site_map('http://www.onswipe.com');

/*request('http://www.onswipe.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	jsdom.env({
  		html: "http://www.onswipe.com/",
  		scripts: ["http://code.jquery.com/jquery.js"],
  		done: function (errors, window) {
    		var $ = window.$;
    		console.log("Onswipe Sitemap");
    		$("a").each(function() {
      			console.log($(this).attr('href'));
    		});
  		}
	});
  }
})
*/