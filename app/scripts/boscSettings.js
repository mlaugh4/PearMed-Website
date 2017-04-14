BoscSettings = {
	apiRoot: "http://35.161.194.241:3000/",
	authLoginUrl: 'http://35.161.194.241:3000/auth/google/',
	authId: Cookies.get('idToken'),

	setAuthId: function ( authId ) {
		if(!authId)
			Cookies.remove("idToken");
		else
			Cookies.set("idToken", authId);

		BoscSettings.authId = Cookies.get("idToken");

		this.ensureAuthId();
	},

	ensureAuthId: function () {
		// If authid is not set go to the login page
		if(!BoscSettings.authId)
			window.location.href = 'login.html';
	},

	mock: function () {
		BoscSettings.apiRoot = "http://localhost:3000/";
		BoscSettings.authLoginUrl = "http://localhost:3000/auth/google/";
	}

}
