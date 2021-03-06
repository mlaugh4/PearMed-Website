var Utils = {

	// Read a page's GET URL variables and return them as an associative array
	getUrlVars: function () {
		var vars = [],
			hash;
		var query = window.location.href
		if (query.endsWith('#'))
			query = query.slice(0, -1);
		var hashes = query.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},
	
}