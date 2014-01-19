/*
 * net.bytedoc.UI5.JSONModelSymfony
 * 
 * Extension of sap.ui.model.json.JSONModel
 */
sap.ui.model.json.JSONModel.extend("net.bytedoc.UI5.JSONModelSymfony", {
	loadService : "",
	saveService : "",
	entity : "",
	
	oDetail : {},

	// this is needed by Book Controller (List and Detail)
	//   - oDetail
	//   - oData
	//   - deleteByIndex()
	//   - saveByIndex()
	// indirect requirements
	//   - init()
	//   - pathToIndex()
	//   - ajaxSaveRequest()
	//   - ajaxDeleteRequest()

	
	
	// initialize with the necessary information
	init : function(oParams) {
		this.entity = oParams.entity;
		this.loadService = oParams.loadService;
		this.saveService = oParams.saveService;
	},

	// save specific data entry by index
	saveByIndex : function(index) {
		index = this.pathToIndex(index);
		// alert("saving " + index);
		var arrayToSave = [];
		var oData = this.oData;
		// saveService expects an array of data entries, so send a single entry as array as well
		arrayToSave.push(oData[index]);
		var jsonString = JSON.stringify(arrayToSave);
		this.ajaxSaveRequest(jsonString);
	},

	// eine Zeile löschen
	deleteByIndex : function(indexToDelete) {
		indexToDelete = this.pathToIndex(indexToDelete);
		var jsonString = JSON.stringify(this.oData[indexToDelete]);
		this.oData.splice(indexToDelete, 1);
		this.ajaxDeleteRequest(jsonString);
	},

	ajaxDeleteRequest : function(jsonString) {
		jQuery.ajax({
			url: this.getSaveUrl(),
			type: "POST",
			data: { mode: "delete",
					json: jsonString },
			success : this.callbacks.ajaxDeleteSuccess,
			error: function(jqXHR, textStatus, errorThrown) {
				oApp.ajaxError("Deleting failed", jqXHR, textStatus, errorThrown);
			}
		});
	},

	ajaxSaveRequest : function(jsonString) {
		jQuery.ajax({
			url: this.getSaveUrl(),
			type: "POST",
			data: { mode: "entity",
					json: jsonString },
			success: this.callbacks.ajaxSaveSuccess,
			error: function(jqXHR, textStatus, errorThrown) {
				oApp.ajaxError("Saving failed", jqXHR, textStatus, errorThrown);
			}
		});
	},

	// if index is a "path", then remove the slash from it
	pathToIndex : function(index) {
		// ensure that index is treates as a string
		index = index + "";
		return index.replace(/^\//g,'');
	},


	changedPaths : [],

	// save all data from the model
	saveAll : function() {
		// only save the changed paths
		var arrayToSave = [];
		var oData = this.oData;
		var index = 0;
		jQuery.each(this.changedPaths, function(index, value) {
			index = net.bytedoc.Helper.pathToIndex(value);
			arrayToSave.push(oData[index]);
		});
		// create JSON string for the changed paths
		var jsonString = JSON.stringify(arrayToSave);
		//var jsonString = this.getJSON(); // ALL of oData
		this.ajaxSaveRequest(jsonString);
	},
	
	// load all data for this model
	loadAll : function() {
		this.loadData(this.getLoadUrl());
	},
	
	// create Save URL - currently the same for all saving possibilites
	getSaveUrl : function() {
		return this.saveService + "/" + this.entity;
	},
	
	// create Load URL
	getLoadUrl : function() {
		return this.loadService + "/" + this.entity;
	},

	// react on a change in the model data
	dataChanged : function(sPath) {
		if(sPath) {
			if(jQuery.inArray(sPath, this.changedPaths) == -1) {
				this.changedPaths.push(sPath);
			}
		}
		this.unsaved = true;
		// also restart the timer, we do not need to save every x seconds, if user keeps changing
		if(this.AutoSaveStarted) {
			this.restartAutoSave();
			// tell the app controller that data has changed
			if(jQuery.type(this.callbackDataChanged) == "function") {
				this.callbackDataChanged();
			}
			// TODO callback for non-autosave entities
		}
	},

	
	AutoSaveInterval : null,
	unsaved : false,
	AutoSaveStarted : false,
	callbackDataChanged : null,
	callbackAjaxSuccess : null,

	restartAutoSave : function() {
		this.stopAutoSave();
		this.startAutoSave();
	},
	startAutoSave : function () {
		//alert("AutoSave started");
		var that = this;
		this.AutoSaveStarted = true;
		this.AutoSaveInterval = setInterval(function() { that.checkForSave(); }, 15000);
	},
	stopAutoSave : function () {
		//alert("AutoSave stopped");
		clearInterval(this.AutoSaveInterval);
	},
	checkForSave : function() {
		//alert("check for save");
		// only check autosave-Models
		if(this.AutoSaveStarted && this.unsaved) {
			//alert("auto-saving");
			this.saveAll();
			this.unsaved = false;
			this.stopAutoSave();
		}
	}
});
