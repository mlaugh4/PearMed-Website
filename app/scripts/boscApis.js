/*
	Used to communicate with the Bosc APIs
*/
function BoscApis(authId) {
	if (!BoscSettings.authId) {
		console.log("Poop")
	}
	console.log(BoscSettings.authId)

	// Executes an ajax call
	this.callApi = function (options) {
		options.beforeSend = function (request) {
			request.setRequestHeader("Bosc-AuthId", BoscSettings.authId);
		};

		$.ajax(options);
	}

	// Get all of the models linked to this user
	this.getModels = function (success, error) {
		this.callApi({
			type: "GET",
			url: BoscSettings.apiRoot + "organModels",
			dataType: "json",
			success: success,
			error, error,
		});
	}

	// Upload models to the server
	this.postModel = function (data, success, error) {
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
		});
	}
}

BoscApis.prototype.mock = function () {
	var thisObj = this;

	$('.loader').show()

	var callApi = function (callback) {
		setTimeout(callback, 1000);
	}

	this.getModels = function (success, error) {
		callApi(function () {
			$('.loader').trigger('loadedList')
			$('.loader').hide( function(){});
			success(thisObj.testModelData);
			console.log($(this))
		});
	}

	this.postModel = function (data, success, error) {
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
	// {
	// 	"_id": "57f6b8b03c9fa30a471bf4ea",
	// 	"name": "Ryan James",
	// 	"shortDesc": "Kidney Stones",
	// 	"longDesc": "This patient has a giant kidney stone...",
	// 	"lastAccessed": "2016-10-07T20:27:14.757Z",
	// 	"ownerId": BoscSettings.authId,
	// 	"__v": 0
	// },
	// {
	// 	"_id": "57f6b8b03c9fa30a471bf4ee",
	// 	"name": "Mark Winslow Laughery",
	// 	"shortDesc": null,
	// 	"longDescription": null,
	// 	"lastAccessed": "2016-10-07T02:27:14.757Z",
	// 	"ownerId": BoscSettings.authId,
	// 	"__v": 0
	// },
	// {
	// 	"_id": "57f6b8b03c9fa30a471bf4ef",
	// 	"name": "Test Organ",
	// 	"shortDesc": "Test short description",
	// 	"longDescription": "This is a test long description",
	// 	"lastAccessed": "2016-10-05T21:27:14.757Z",
	// 	"ownerId": BoscSettings.authId,
	// 	"__v": 0
	// },
	// {
	// 	"_id": "57f6b8b03c9fa30a471bf4eb",
	// 	"name": "Test Organ",
	// 	"shortDesc": "Test short description",
	// 	"longDescription": "This is a test long description",
	// 	"lastAccessed": "2016-10-05T21:27:14.757Z",
	// 	"ownerId": BoscSettings.authId,
	// 	"__v": 0
	// },
	// {
	// 	"_id": "57f6b8b03c9fa30a471bf4ec",
	// 	"name": "Test Organ",
	// 	"shortDesc": "Test short description",
	// 	"longDescription": "This is a test long description",
	// 	"lastAccessed": "2016-10-05T21:27:14.757Z",
	// 	"ownerId": BoscSettings.authId,
	// 	"__v": 0
	// },
	// {
	// 	"_id": "57f6b8b03c9fa30a471bf4ed",
	// 	"name": "Test Organ",
	// 	"shortDesc": "Test short description",
	// 	"longDescription": "This is a test long description",
	// 	"lastAccessed": "2016-10-05T21:27:14.757Z",
	// 	"ownerId": BoscSettings.authId,
	// 	"__v": 0
	// },
];

