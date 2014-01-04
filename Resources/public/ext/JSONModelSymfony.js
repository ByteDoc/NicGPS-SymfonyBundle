/*
 * net.bytedoc.UI5.JSONModelSymfony
 * 
 * Extension of sap.ui.model.json.JSONModel
 */
sap.ui.model.json.JSONModel.extend("net.bytedoc.UI5.JSONModelSymfony", {
	loadService : "",
	saveService : "",
	entity : "",
	
	changedPaths : [],
	
	
	// initialize with the necessary information
	init : function(oParams) {
		this.entity = oParams.entity;
		this.loadService = oParams.loadService;
		this.saveService = oParams.saveService;
	},
	
	// save all data from the model
	saveAll : function() {
		// only save the changed paths
		var arrayToSave = [];
		var oData = this.oData;
		jQuery.each(this.changedPaths, function(index, value) {
			var index = value.replace(/^\//g,'');
			arrayToSave.push(oData[index]);
		});
		// create JSON string for the changed paths
		var jsonString = JSON.stringify(arrayToSave);
		//var jsonString = this.getJSON(); // ALL of oData
		jQuery.ajax({
			url: this.getSaveUrl(),
			type: "POST",
			data: { mode: "entity",
					json: jsonString },
			error: function(jqXHR, textStatus, errorThrown) {
				oApp.ajaxError("Saving failed", jqXHR, textStatus, errorThrown);
			}
		});
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
		return url = this.loadService + "/" + this.entity;
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
	
	// eine Zeile löschen
	deleteRowByIndex : function(indexToDelete) {
		var jsonString = JSON.stringify(this.oData[indexToDelete]);
		this.oData.splice(indexToDelete, 1);
		jQuery.ajax({
			url: this.getSaveUrl(),
			type: "POST",
			data: { mode: "delete",
					json: jsonString },
			error: function(jqXHR, textStatus, errorThrown) {
				oApp.ajaxError("Deleting failed", jqXHR, textStatus, errorThrown);
			}
		});
		
	},
	
	
	AutoSaveInterval : null,
	unsaved : false,
	AutoSaveStarted : false,
	callbackDataChanged : null,

	restartAutoSave : function() {
		this.stopAutoSave();
		this.startAutoSave();
	},
	startAutoSave : function () {
		//alert("AutoSave started");
		var that = this;
		this.AutoSaveStarted = true;
		this.AutoSaveInterval = setInterval(function() { that.checkForSave(); }, 5000);
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
