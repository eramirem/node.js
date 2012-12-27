var nodeio = require('node.io');

var domain = process.argv[3];
var subs = [''];
var base_url = 'https://www.google.com';
var base_path = '/m/search?';
var base_query = 'site:' + domain;
var pattern = new RegExp('(\\w+):\\/\\/([\\w-.]+' + domain + ')');
var query = '';
const max_words = 32;
const max_uri = 2048;

exports.job = new nodeio.Job({ wait: 5, timeout: 10 }, {
	input: true,
	run: function () {
		full_query = base_query + query;
		start_param = '&num=50&start=0';
		query_param = 'q=' + full_query;
		params = query_param + start_param;
		full_url = base_url + base_path + params;
		console.log('Query ' + full_url);

		if (subs.lenght > max_words) this.exit('Max words limit reached');
		if (full_url.length > max_uri) this.exit();

    	this.getHtml(full_url, function (err, $) {
    		var new_domain = false;
    		//var self = this;
    		//if (err) this.exit();
    		$('h3 a').each('href', function(href) {
    			if (href.match(pattern))
    			{
    				link = href.match(pattern)[2];
    				if(subs.indexOf(link) == -1)
    		 		{
    		 			new_domain = true;
    		 			console.log('New domain found: ' + link);
    		 			query += '+-site:' + link;
    		 			subs.push(link);
    		 		}
    			}
    		});
    		if (new_domain == false) this.exit('No new domains found');
    		this.emit();
    	});
	}
});