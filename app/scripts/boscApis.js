var apiRoot = "http://localhost:3000/";

/*
	Used to communicate with the Bosc APIs
*/
function BoscApis(authId) {
	this.authId = authId;
	
	// Executes an ajax call
	var callApi = function (options) {
		options.beforeSend = function (request) {
			request.setRequestHeader("Bosc-AuthId", authId);
		};
		
		$.ajax(options);
	}

	// Get all of the models linked to this user
	this.getModels = function (success, error) {
		callApi({
			type: "GET",
			url: apiRoot + "organModels",
			dataType: "json",
			success: success,
			error, error,
		});
	}

	// Upload models to the server
	this.postModel = function (data, success, error) {
		callApi({
			type: 'POST',
			url: apiRoot + "organModels",
			data: data,
			async: true,
			cache: false,
			contentType: false,
			processData: false,
			success: success,
			error: error,
		});
	}
}

BoscApis.testAuthId = "95565080-fb3d-4469-bc39-4acf5285abe7";

BoscApis.prototype.mock = function () {
	var thisObj = this;

	var callApi = function (callback) {
		setTimeout(callback, 1000);
	}
	
	this.getModels = function (success, error) {
		callApi(function () {
			success(thisObj.testModelData);
		});
	}

	this.postModel = function (data, success, error) {
		callApi(function () {
			success(data);
		})
	}
}

BoscApis.prototype.testModelData = [
	{
		"_id": "57f6b8b03c9fa30a471bf4ee",
		"name": "Stacey Marks",
		"shortDesc": "Ventricular Septal Defect",
		"longDesc": "This patient presented a VSD...",
		"lastAccessed": "2016-10-07T21:27:14.757Z",
		"ownerId": this.authId,
		"__v": 0
	},
	{
		"_id": "57f6b8b03c9fa30a471bf4ee",
		"name": "Ryan James",
		"shortDesc": "Kidney Stones",
		"longDesc": "This patient has a giant kidney stone...",
		"lastAccessed": "2016-10-07T20:27:14.757Z",
		"ownerId": this.authId,
		"__v": 0
	},
	{
		"_id": "57f6b8b03c9fa30a471bf4ee",
		"name": "Mark Winslow Laughery",
		"shortDesc": null,
		"longDescription": null,
		"lastAccessed": "2016-10-07T02:27:14.757Z",
		"ownerId": this.authId,
		"__v": 0
	},
	{
		"_id": "57f6b8b03c9fa30a471bf4ee",
		"name": "Test Organ",
		"shortDesc": "Test short description",
		"longDescription": "This is a test long description",
		"lastAccessed": "2016-10-05T21:27:14.757Z",
		"ownerId": this.authId,
		"__v": 0
	},
];