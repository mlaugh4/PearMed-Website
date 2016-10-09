var apiRoot = "http://UbuntuDev-1:3000/";

/*
	Used to communicate with the Bosc APIs
*/
function BoscApis(accountId) {
	this.accountId = accountId;

	// Executes an ajax call
	var callApi = function (options) {
		options.beforeSend = function (request) {
			request.setRequestHeader("Bosc-AuthId", accountId);
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
}

BoscApis.prototype.mock = function () {
	var callApi = function (callback) {
		setTimeout(callback, 1000);
	}

	this.getModels = function (success, error) {
		callApi(function () {
			success([
				{
					"_id": "57f6b8b03c9fa30a471bf4ee",
					"name": "Stacey Marks",
					"shortDesc": "Ventricular Septal Defect",
					"longDesc": "This patient presented a VSD and likes chocolate milk they're short of breath blah",
					"lastAccessed": "2016-10-07T21:27:14.757Z",
					"ownerId": this.accountId,
					"__v": 0
				},
				{
					"_id": "57f6b8b03c9fa30a471bf4ee",
					"name": "Ryan James",
					"shortDesc": "Kidney Stones",
					"longDesc": "This patient has a giant kidney stone...",
					"lastAccessed": "2016-10-07T20:27:14.757Z",
					"ownerId": this.accountId,
					"__v": 0
				},
				{
					"_id": "57f6b8b03c9fa30a471bf4ee",
					"name": "Mark Winslow Laughery",
					"shortDesc": null,
					"longDescription": null,
					"lastAccessed": "2016-10-07T02:27:14.757Z",
					"ownerId": this.accountId,
					"__v": 0
				},
				{
					"_id": "57f6b8b03c9fa30a471bf4ee",
					"name": "Test Organ",
					"shortDesc": "Test short description",
					"longDescription": "This is a test long description",
					"lastAccessed": "2016-10-05T21:27:14.757Z",
					"ownerId": this.accountId,
					"__v": 0
				},
				{
					"_id": "57f6b8b03c9fa30a471bf4ee",
					"name": "Introductory organ",
					"shortDesc": "This comes pre-loaded with the application to help people learn",
					"longDescription": "This is a test long description",
					"lastAccessed": "2016-10-05T21:27:14.757Z",
					"ownerId": this.accountId,
					"__v": 0
				},
			]);
		});
	}
}
