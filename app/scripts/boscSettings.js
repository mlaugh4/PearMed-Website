BoscSettings = {
	apiRoot: "http://52.160.88.200:3000/",
	authId: null,
	mock: function () {
		BoscSettings.apiRoot = "http://localhost:3000/";
        BoscSettings.authId = "95565080-fb3d-4469-bc39-4acf5285abe7";
	}
}