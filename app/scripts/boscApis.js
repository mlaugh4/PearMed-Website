/*
	Used to communicate with the Bosc APIs
*/
function BoscApis(id_token) {
	this.id_token = id_token || BoscSettings.authId;
	console.log(this.id_token)

	// Executes an ajax call
	this.callApi = function (options) {
		var authHeaderVal = this.id_token;
		options.beforeSend = function (request) {
			request.setRequestHeader("Authorization", authHeaderVal);
		};

		$.ajax(options);
	}

	// Get all of the models linked to this user
	this.getUserInfo = function (success, error, complete) {
		this.callApi({
			type: "GET",
			url: BoscSettings.apiRoot + "users/me",
			dataType: "json",
			success: success,
			error: error,
			complete: complete,
		});
	}

	// Get all of the models linked to this user
	this.getModels = function (success, error, complete) {
		this.callApi({
			type: "GET",
			url: BoscSettings.apiRoot + "organModels",
			dataType: "json",
			success: success,
			error: error,
			complete: complete,
		});
	}

	// Get all of the models linked to this user
	this.getSingleModel = function (modelId, success, error, complete) {
		this.callApi({
			type: "GET",
			url: BoscSettings.apiRoot + "organModels/" + modelId,
			dataType: "json",
			success: success,
			error: error,
			complete: complete,
		});
	}

	// Upload models to the server
	this.postModel = function (data, success, error, complete) {
		this.callApi({
			type: 'POST',
			url: BoscSettings.apiRoot + "organModels",
			data: data,
			async: true,
			cache: false,
			contentType: false,
			processData: false,
			success: success,
			error: error,
			complete: complete,
		});
	}

	// Update model on server
	this.putModel = function (data, success, error, complete) {
		this.callApi({
			type: 'PUT',
			url: BoscSettings.apiRoot + "organModels/" + data._id + "/",
			data: data,
			success: success,
			error: error,
			complete: complete,
		});
	}

	// Get accoung info
	this.getAccounts = function (accountId, success, error, complete) {
		this.callApi({
			type: 'GET',
			url: BoscSettings.apiRoot + "accounts/",
			success: success,
			error: error,
			complete: complete,
		});
	}

	// Get accoung info
	this.getAccountInfo = function (accountId, success, error, complete) {
		this.callApi({
			type: 'GET',
			url: BoscSettings.apiRoot + "accounts/" + accountId + "/",
			success: success,
			error: error,
			complete: complete,
		});
	}
}

BoscApis.prototype.mock = function () {
	var thisObj = this;

	var callApi = function (callback) {
		setTimeout(callback, 1000);
	}

	this.getUserInfo = function (success, error, complete) {
		callApi(function () {
			success({
				'name' : 'Test Account',
				'authId': this.id_token,
			});
			console.log($(this))
		});
	}

	this.getModels = function (success, error, complete) {
		callApi(function () {
			success(thisObj.testModelData);
			console.log($(this))
		});
	}

	this.getSingleModel = function (modelId, success, error, complete) {
		callApi(function () {
			var model = null;
			BoscApis.prototype.testModelData.forEach( function (m) {
				if( m._id == modelId )
					model = m;
			})

			if(model)
				success( model );
			else
				error();

			complete();
		});
	}

	this.postModel = function (data, success, error, complete) {
		callApi(function () {
			thisObj.testModelData.unshift(
					{
						"_id": "57f6b8b03c9fa30a471bf4aa",
						"name": 'name',
						"shortDesc": "Herminal Por Favor Hanger",
						"longDesc": "This description is pretty long extra text to test the div flexibility",
						"lastAccessed": "2016-10-07T21:27:14.757Z",
						"ownerId": BoscSettings.authId,
						"__v": 0
					}
				);
			success(thisObj.testModelData[0]);
		})
	}

	this.putModel = function (data, success, error, complete) {
		callApi(function () {
			thisObj.testModelData.forEach( function ( model ) {
				if( model._id == data._id ) {
					model.name = data.name;
					model.shortDesc = data.shortDesc;
					model.longDesc = data.longDesc;
				}
			});

			success(data);
		})
	}

	this.getAccounts = function (success, error, complete) {
		callApi(function () {
			success([
				{ '_id': '1234', 'name' : 'Test Account 1'},
				{ '_id': '4321', 'name' : 'Test Account 2'},
			]);

			complete();
			console.log($(this))
		});
	}

	this.getAccountInfo = function (accountId, success, error, complete) {
		callApi(function () {
			success({
				'_id': accountId,
				'name' : 'Test Account',
				'members': [ 
					{ google: { name: "Ryan James", email: "rcjames1004@gmail.com" } },
					{ google: { name: "Aria James", email: "love@gmail.com" } },
				],
				'invitations': [
					"danielle.hayden@gmail.com",
					"test@gmail.com",
				],
			});

			complete();
			console.log($(this))
		});
	}
}

BoscApis.prototype.testModelData = [
	{
		"_id": "57f6b8b03c9fa30a471bf4e3",
		"name": "Stacey Marks",
		"shortDesc": "Ventricular Septal Defect",
		"longDesc": "This patient presented a VSD...",
		"lastAccessed": "2016-10-07T21:27:14.757Z",
		"ownerId": BoscSettings.authId,
		"__v": 0
	},
	{
		"_id": "57f6b8b03c9fa30a471bf4ea",
		"name": "Ryan James",
		"shortDesc": "Kidney Stones",
		"longDesc": "This patient has a giant kidney stone...",
		"lastAccessed": "2016-10-07T20:27:14.757Z",
		"ownerId": BoscSettings.authId,
		"__v": 0
	},
	{
		"_id": "57f6b8b03c9fa30a471bf4ee",
		"name": "Mark Winslow Laughery",
		"shortDesc": null,
		"longDesc": null,
		"lastAccessed": "2016-10-07T02:27:14.757Z",
		"ownerId": BoscSettings.authId,
		"__v": 0
	},
	{
		"_id": "57f6b8b03c9fa30a471bf4ef",
		"name": "Test Organ",
		"shortDesc": "Test short description",
		"longDesc": "This is a test long description",
		"lastAccessed": "2016-10-05T21:27:14.757Z",
		"ownerId": BoscSettings.authId,
		"__v": 0
	},
	{
		"_id": "57f6b8b03c9fa30a471bf4eb",
		"name": "Test Organ",
		"shortDesc": "Test short description",
		"longDesc": "This is a test long description",
		"lastAccessed": "2016-10-05T21:27:14.757Z",
		"ownerId": BoscSettings.authId,
		"__v": 0
	},
	{
		"_id": "57f6b8b03c9fa30a471bf4ec",
		"name": "Test Organ",
		"shortDesc": "Test short description",
		"longDesc": "This is a test long description",
		"lastAccessed": "2016-10-05T21:27:14.757Z",
		"ownerId": BoscSettings.authId,
		"__v": 0
	},
	{
		"_id": "57f6b8b03c9fa30a471bf4ed",
		"name": "Test Organ",
		"shortDesc": "Test short description",
		"longDesc": "This is a test long description",
		"lastAccessed": "2016-10-05T21:27:14.757Z",
		"ownerId": BoscSettings.authId,
		"__v": 0
	},
];

