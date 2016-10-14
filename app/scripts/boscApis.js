/*
	Used to communicate with the Bosc APIs
*/
function BoscApis(authId) {
	this.authId = Cookies.get('authId');
	if (!this.authId) {
		console.log("Poop")
	}

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
			url: BoscApis.apiRoot + "organModels",
			dataType: "json",
			success: success,
			error, error,
		});
	}

	// Upload models to the server
	this.postModel = function (data, success, error) {
		callApi({
			type: 'POST',
			url: BoscApis.apiRoot + "organModels",
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

BoscApis.apiRoot = "http://52.160.88.200:3000/";

BoscApis.testAuthId = "95565080-fb3d-4469-bc39-4acf5285abe7";

BoscApis.prototype.mock = function () {
	var thisObj = this;

	$('.loader').show()

	var callApi = function (callback) {
		setTimeout(callback, 1000);
	}

	this.getModels = function (success, error) {
		callApi(function () {
			$('.loader').hide();
			success(thisObj.testModelData);
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
						"ownerId": this.authId,
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
		"ownerId": this.authId,
		"__v": 0
	},
	{
		"_id": "57f6b8b03c9fa30a471bf4ea",
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
		"_id": "57f6b8b03c9fa30a471bf4ef",
		"name": "Test Organ",
		"shortDesc": "Test short description",
		"longDescription": "This is a test long description",
		"lastAccessed": "2016-10-05T21:27:14.757Z",
		"ownerId": this.authId,
		"__v": 0
	},
	{
		"_id": "57f6b8b03c9fa30a471bf4eb",
		"name": "Test Organ",
		"shortDesc": "Test short description",
		"longDescription": "This is a test long description",
		"lastAccessed": "2016-10-05T21:27:14.757Z",
		"ownerId": this.authId,
		"__v": 0
	},
	{
		"_id": "57f6b8b03c9fa30a471bf4ec",
		"name": "Test Organ",
		"shortDesc": "Test short description",
		"longDescription": "This is a test long description",
		"lastAccessed": "2016-10-05T21:27:14.757Z",
		"ownerId": this.authId,
		"__v": 0
	},
	{
		"_id": "57f6b8b03c9fa30a471bf4ed",
		"name": "Test Organ",
		"shortDesc": "Test short description",
		"longDescription": "This is a test long description",
		"lastAccessed": "2016-10-05T21:27:14.757Z",
		"ownerId": this.authId,
		"__v": 0
	},
];

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
