/*
 * net.bytedoc.UI5.JSONModelSymfony
 * 
 * Extension of sap.ui.model.json.JSONModel
 */
sap.ui.model.json.JSONModel.extend("net.bytedoc.UI5.JSONModelSymfony", {
	loadService : "",
	saveService : "",
	entity : "",
	// Save Optionen:
	//   - einzelnes Attribut (TODO)
	//   - einen einzelnen Datensatz (TODO)
	//   - alle Datensätze des Models
	autoSaveMode : "",
	AutoSaveAll : "All",
	AutoSaveSingle : "Single",
	AutoSaveAttribute : "Attribute",
	
	
	// initialize with the necessary information
	init : function(oParams) {
		this.entity = oParams.entity;
		this.loadService = oParams.loadService;
		this.saveService = oParams.saveService;
		this.autoSaveMode = oParams.autoSaveMode;
	},
	
	// save all data from the model
	saveAll : function() { 
		jQuery.ajax({
			url: this.getSaveUrl(),
			type: "POST",
			data: { mode: "entity",
					json: this.getJSON() }
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
	dataChanged : function(oEvent) {
		if(oEvent) {
			var sPath = oEvent.getBindingContext().sPath;
			var sId = oEvent.getBindingContext().getProperty("id");
		}
		switch (this.autoSaveMode) {
		case this.AutoSaveAll:
			this.unsaved = true;
			// also restart the timer, we do not need to save every x seconds, if user keeps changing
			this.restartAutoSave();
			// tell the app controller that data has changed
			if(jQuery.type(this.callbackDataChanged) == "function") {
				this.callbackDataChanged();
			}	
			break;
			
		case this.AutoSaveSingle:
			
			break;
			
		case this.AutoSaveAttribute:
			
			break;
		default:
			
		}
		
	},
	
	
	AutoSaveInterval : null,
	unsaved : false,
	callbackDataChanged : null,

	restartAutoSave : function() {
		this.stopAutoSave();
		this.startAutoSave();
	},
	startAutoSave : function () {
		var that = this;
		this.AutoSaveInterval = setInterval(function() { that.checkForSave(); }, 5000);
	},
	stopAutoSave : function () {
		clearInterval(this.AutoSaveInterval);
	},
	checkForSave : function() {
		if(this.unsaved) {
			//alert("auto-saving");
			this.saveAll();
			this.unsaved = false;
			this.stopAutoSave();
		}
	}
});
