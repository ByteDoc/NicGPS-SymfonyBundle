/* net.bytedoc.nicgps.AppController
 * Controller for App/oApp
 */

// Basis-Objekt deklarieren, falls noch nicht vorhanden
if(!net) { var net = {} };
if(!net.bytedoc) { net.bytedoc = {} };
if(!net.bytedoc.nicgps) { net.bytedoc.nicgps = {} };

// Helper-Klasse deklarieren
net.bytedoc.nicgps.AppController = {
	
	dataSaved : true,
	init : function() {
		var app = this;
		this.modelTimer = setInterval(function() { app.checkAllModels() }, 5000);
	},
	buttonSaveNow : null,
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
		this.buttonSaveNowTimeout = setTimeout(function() { $("#buttonSaveNow").fadeOut() }, 1000);
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
			if(item.entity != null) {
				oModels[item.entity] = new net.bytedoc.UI5.JSONModelSymfony();
				oModels[item.entity].init({
					entity : item.entity,
					loadService : oApp.readDataService,
					saveService : oApp.writeDataService
				});
				oModels[item.entity].loadAll();
				if(item.autoSave) {
					oModels[item.entity].startAutoSave();
					// callback only for autosave models
					oModels[item.entity].callbackDataChanged = oApp.eventDataChanged;
				}
			}
			if(item.viewName != null) {
				oViews[item.viewName] = sap.ui.view({
					type : sap.ui.core.mvc.ViewType.JS,
					viewName : item.viewName
				});
				item.view = oViews[item.viewName];
				item.view.setModel(oModels[item.entity]);
			}
			aNavigationItems.push(new sap.ui.ux3.NavigationItem(key,{item:item.key,text:item.text}));
			if(item.defaultContent) {
				oApp.defaultShellContent = item.view;
			}
		});
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
		if(!mSettings.id) { mSettings.id = "myShell" }
		if(!mSettings.appTitle) { mSettings.appTitle = "fehlender AppTitle" }
		if(!mSettings.logoutPath) { mSettings.logoutPath = "/logout" }
		
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
			showLogoutButton: false,
			worksetItems: aNavigationItems,
			content: oApp.defaultShellContent,
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
