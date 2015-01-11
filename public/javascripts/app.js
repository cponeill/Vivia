	var g_access_token = '';
	var g_username = '';

	var client_id = '';
	var redirect_uri = '';


	if (location.host == 'localhost:8000') {
		client_id = 'd37a9e88667b4fb3bc994299de2a52bd';
		redirect_uri = 'http://localhost:3000/callback';
	} else {
		client_id = '6f9391eff32647baa44b1a700ad4a7fc';
		redirect_uri = 'http://lab.possan.se/playlistcreator-example/callback.html';
	}

	var doLogin = function(callback) {
		var url = 'https://accounts.spotify.com/authorize?client_id=' + client_id +
			'&response_type=token' +
			'&scope=playlist-read-private%20playlist-modify%20playlist-modify-private' +
			'&redirect_uri=' + encodeURIComponent(redirect_uri);
		localStorage.setItem('createplaylist-tracks', JSON.stringify(g_tracks));
		localStorage.setItem('createplaylist-name', g_name);
		var w = window.open(url, 'asdf', 'WIDTH=400,HEIGHT=500');
	}

	var refreshtimer = 0;
	var queueRefreshText = function() {
		if (refreshtimer) {
			clearTimeout(refreshtimer);
		}
		refreshtimer = setTimeout(function() {
			refreshText();
		}, 1000);
	}

	exports.startApp = function() {
		setStatus('');
		console.log('start app.');
		$('#conversation').keyup(function() {
			queueRefreshText();
		});
		$('#conversation').change(function() {
			queueRefreshText();
		});
		$('#start').click(function() {
			doLogin(function() {});
		});
		resolveOneWord();
}