/*
	Used to communicate with the Bosc APIs
*/
function BoscApis() {
	console.log(BoscSettings.authId)

	// Executes an ajax call
	this.callApi = function (options) {
		options.beforeSend = function (request) {
			request.setRequestHeader("Bosc-AuthId", BoscSettings.authId);
		};

		$.ajax(options);
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
}

BoscApis.prototype.mock = function () {
	var thisObj = this;

	var callApi = function (callback) {
		setTimeout(callback, 1000);
	}

	this.getModels = function (success, error, complete) {
		callApi(function () {
			success(thisObj.testModelData);
			console.log($(this))
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

