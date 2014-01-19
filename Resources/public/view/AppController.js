/* net.bytedoc.nicgps.AppController
 * Controller for App/oApp
 */

// Basis-Objekt deklarieren, falls noch nicht vorhanden
if(!net) { var net = {}; }
if(!net.bytedoc) { net.bytedoc = {}; }
if(!net.bytedoc.nicgps) { net.bytedoc.nicgps = {}; }

// Helper-Klasse deklarieren
net.bytedoc.nicgps.AppController = {
	
	dataSaved : true,
	init : function() {
		var app = this;
		this.modelTimer = setInterval(function() { app.checkAllModels(); }, 5000);
	},
	// buttonSaveNow : null,
	checkAllModels : function () {
		var counterAll = 0;
		var counterSaved = 0;
		jQuery.each(oModels, function(key, model) {
			// only check autosave-Models
			if(model.AutoSaveStarted)
			{
				if(!model.unsaved) {
					counterSaved++;
				}
				counterAll++;
			}
		});
		if(counterAll == counterSaved) {
			if(!this.dataSaved) {
				this.buttonSaveNowDeactivate();
			}
		} else {
			this.buttonSaveNowActivate();
		}
	},
	buttonSaveNowTimeout : null,
	buttonSaveNowActivate : function() {
		this.buttonSaveNow.setText("auto-save open changes now");
		this.buttonSaveNow.setEnabled(true);
		clearTimeout(this.buttonSaveNowTimeout);
		$("#buttonSaveNow").fadeIn();
		this.dataSaved = false;
	},
	buttonSaveNowDeactivate : function () {
		this.buttonSaveNow.setText("all changes saved");
		this.buttonSaveNow.setEnabled(false);
		this.dataSaved = true;
		this.buttonSaveNowTimeout = setTimeout(function() { $("#buttonSaveNow").fadeOut(); }, 1000);
	},
	saveAllModels : function() {
		jQuery.each(oModels, function(key, item) {
			item.checkForSave();
		});
		this.checkAllModels();
	},
	eventDataChanged : function() {
		var app = oApp;
		app.buttonSaveNowActivate();
	},
	ajaxError : function(actionMessage, jqXHR, textStatus, errorThrown) {
		alert(actionMessage);
	},
	createModelsViewsNavigation : function (shellWorksetItems) {
		// create Models, Views and Workitems
		jQuery.each(shellWorksetItems, function(key, item) {
			// first create all necessary included items
			if(typeof item.includedWorksetItems !== "undefined") {
				oApp.createModelsViewsNavigation(item.includedWorksetItems);
			}
			if(item.entity !== null) {
				oApp.createModel(item.entity, item.autoSave);
			}
			if(item.viewName !== null) {
				item.view = oApp.createView(item.entity, item.viewName);
			}
			if(item.entity !== null) {
				oApp.registerCallbacks(item.entity);
			}
			if(item.defaultContent) {
				oApp.setShellDefaultContent(oViews[item.entity], key);
			}
			if(item.inNavigation) {
				oApp.addNavigationItem(key, item.key, item.text);
			}
		});
	},
	createModel : function(entity, autoSave) {
		oModels[entity] = new net.bytedoc.UI5.JSONModelSymfony();
		oModels[entity].init({
			entity : entity,
			loadService : oApp.readDataService,
			saveService : oApp.writeDataService
		});
		oModels[entity].loadAll();
		if(autoSave) {
			oModels[entity].startAutoSave();
			// callback only for autosave models
			oModels[entity].callbackDataChanged = oApp.eventDataChanged;
		}
	},
	createView : function(entity, viewName) {
		oViews[entity] = sap.ui.view({
			type : sap.ui.core.mvc.ViewType.JS,
			viewName : viewName
		});
		oViews[entity].setModel(oModels[entity]);
		return oViews[entity];
	},
	registerCallbacks : function(entity) {
		oModels[entity].callbacks = oViews[entity].callbacks;
	},
	setShellDefaultContent : function(content, item) {
		oApp.defaultShellContent = content;
		oApp.defaultShellSelectedWorksetItem = item;
	},
	addNavigationItem : function(key, item, text) {
		aNavigationItems.push(new sap.ui.ux3.NavigationItem(key, { item : item, text : text }));
	},
	defaultShellContent : null,
	buttonSaveNow : new sap.ui.commons.Button({
		id : "buttonSaveNow",
		text : "",
		enabled : false,
		press : function() {
			oApp.saveAllModels();
		}
	}),
	createShell : function(mSettings) {
		if(!mSettings.id) { mSettings.id = "myShell"; }
		if(!mSettings.appTitle) { mSettings.appTitle = "fehlender AppTitle"; }
		if(!mSettings.logoutPath) { mSettings.logoutPath = "/logout"; }
		
		return new sap.ui.ux3.Shell(mSettings.id, {
			designType: sap.ui.ux3.ShellDesignType.Crystal,
				// ShellDesignType: Standard, Crystal, Light
			headerType: sap.ui.ux3.ShellHeaderType.SlimNavigation,
				// ShellHeaderType: Standard, BrandOnly, NoNavigation, SlimNavigation
			showPane: true,
			showTools: true,
			showFeederTool: false,
			showSearchTool: false,
			appTitle: mSettings.appTitle,
			worksetItems: aNavigationItems,
			content: oApp.defaultShellContent,
			selectedWorksetItem: oApp.defaultShellSelectedWorksetItem,
			worksetItemSelected: function(oEvent) {
				var sId = oEvent.getParameter("id");
				var oShell = oEvent.oSource;
				oShell.setContent(oShellWorksetItems[sId].view);
			},
			headerItems: [
				oApp.buttonSaveNow
			],
			showLogoutButton : true,
		    logout : function(){
				window.location.href = mSettings.logoutPath;
			}
		});
	}
};
