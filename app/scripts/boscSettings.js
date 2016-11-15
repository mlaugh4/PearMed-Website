BoscSettings = {
	apiRoot: "http://52.160.88.200:3000/",
	authId: Cookies.get('authId'),

	setAuthId: function ( authId ) {
		if(!authId)
			Cookies.remove("authId");
		else
			Cookies.set("authId", authId);

		BoscSettings.authId = Cookies.get("authId");

		this.ensureAuthId();
	},

	ensureAuthId: function () {
		// If authid is not set go to the login page
		// if(!BoscSettings.authId)
		// 	window.location.href = 'login.html';
	},

	mock: function () {
		BoscSettings.apiRoot = "http://localhost:3000/";
	}
}

// BoscSettings.mock()
