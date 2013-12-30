/*
 * net.bytedoc.UI5.JSONModelPHPFile
 * 
 * Extension of sap.ui.model.json.JSONModel
 */
sap.ui.model.json.JSONModel.extend("net.bytedoc.UI5.JSONModelPHPFile", {
	loadService : "", //"/TestSymfony/web/app_dev.php/read/", //"get_dataset_json.php",
	saveService : "save_dataset_json.php",
	hasServerScript : function() {
		if (window.location.hostname != "www.bytedoc.net" &&
			window.location.hostname != "localhost") {
				return false;
		} else {
			return true;
		}
	},
	saveMe : function() { 
		// alert("saving");
		// only save if called from server or local development environment
		if(!this.hasServerScript()) {
			return;
		}
		jQuery.ajax({
			url: this.getSaveUrl(),
			type: "POST",
			data: { dataset: this.dataset,
					json: this.getJSON() }
		});
	},
	getDataset : function() {
		return this.dataset;
	},
	loadDataFromFile : function(sDataset) {
		this.dataset = sDataset;
		this.loadData(this.getLoadUrl());
	},
	getSaveUrl : function() {
		return this.saveService;
	},
	getLoadUrl : function() {
		//var url = this.loadService + "?dataset=" + this.dataset;
		var url = this.loadService + "/" + this.dataset;
		//alert(oApp.readDataService);
		if(!this.hasServerScript()) {
			url = 'data/' + this.dataset + ".json";
		}
		return url;
	},
	AutoSaveInterval : null,
	unsaved : false,
	callbackDataChanged : null,
	dataChanged : function() {
		this.unsaved = true;
		//oApp.buttonSaveNowActivate();
		// also restart the timer, we do not need to save every x seconds, if user keeps changing
		this.restartAutoSave();
		// tell the app controller that data has changed
		if(jQuery.type(this.callbackDataChanged) == "function") {
			this.callbackDataChanged();
		}
	},
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
			this.saveMe();
			this.unsaved = false;
			this.stopAutoSave();
		}
	}
});
