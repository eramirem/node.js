var httpAgent = require('http-agent');
var $ = require('jquery');
var url = require('url');

var subdomains = ['onswipe.com','blog.onswipe.com','support.onswipe.com'];
$.each(subdomains, function(index,value) {
  var urls = [''];
  var agent = httpAgent.create(value, urls);
  var addPage = true;
  agent.addListener('next', function (e, agent) {
    console.log('********** ' + value + ' **********' + agent.url);
    $(agent.body).find('a').each(function() {
      var page = url.parse(url.resolve('http://'+ value, $(this).attr("href")));
      console.log(page.href);
      if (addPage && page.hostname == value && page.pathname != '/') {
        agent.addUrl(page.pathname);
      }
    });
    addPage = false;
    agent.next();
  });

  agent.addListener('stop', function (e, agent) {
    console.log('Crawler has completed visiting all urls on subdomain ' + agent.host);
  });
  agent.start();
});