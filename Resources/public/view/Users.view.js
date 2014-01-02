

// View for Table "Wissensportale"
sap.ui.jsview("net.bytedoc.nicgps.Users", {
	getControllerName: function() {
		return "net.bytedoc.nicgps.TableControlEditing";
	},
	
	// content of the view: editable Table Control with Toolbar
	createContent: function(oController) {
		
		// #### Toolbar ####
		var oToolbar = new sap.ui.commons.Toolbar(this.createId("toolbar"));
		var oTbButAddRow = new sap.ui.commons.Button(this.createId("toolbarButtonAddRow"), {
			text: "Neuer Eintrag",
			tooltip: "Neuer Eintrag",
			press: oController.addRow
		});
		var oTbButDeleteRow = new sap.ui.commons.Button(this.createId("toolbarButtonDeleteRow"), {
			text: "Eintrag löschen",
			tooltip: "Eintrag löschen",
			press: oController.deleteRow
		});
		var oTbButSave = new sap.ui.commons.Button(this.createId("toolbarButtonSave"), {
			text : "Speichern",
			tooltip : "Daten speichern",
			press : oController.save
		});
		oToolbar.addItem(oTbButAddRow);
		oToolbar.addItem(oTbButDeleteRow);
		oToolbar.addItem(oTbButSave);
		// #### END Toolbar ####
		
		
		// #### Table ####
		var oTable = new sap.ui.table.Table({
			id : this.createId("tableUsers"),
			editable : true,
			visibleRowCount : 5,
			navigationMode : sap.ui.table.NavigationMode.Paginator,
			toolbar : oToolbar,
			selectionMode : sap.ui.table.SelectionMode.Single
		});
		var watchedControls = [];
		// ## ID ##
		var oControl = new sap.ui.commons.TextView({
			value : "{id}"
		});
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({ text : "ID" }),
			template : oControl,
			visible : false
		}));
		// ## Username ##
		var oControl = new sap.ui.commons.TextField({
			value : "{username}"
		});
		watchedControls.push(oControl);
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({ text : "Username" }),
			template : oControl,
			sortProperty : "username",
			filterProperty : "username",
			width : "150px"
		}));
		// ## E-Mail ##
		oControl = new sap.ui.commons.TextField({
			value : "{email}"
		});
		watchedControls.push(oControl);
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({ text : "E-Mail" }),
			template : oControl,
			sortProperty : "email",
			filterProperty : "email",
			width : "200px"
		}));
		// ## Password ##
		oControl = new sap.ui.commons.TextField({
			value : "{password}"
		});
		watchedControls.push(oControl);
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({ text : "Neues Passwort"}),
			template : oControl,
			width : "200px"
		}));
		
		jQuery.each(watchedControls, function(key, item) {
			//item.attachChange(oController.dataChanged);
			item.attachChange( function(oEvent) {
				oController.dataChanged(this);
				//var oModel = this.getModel();
				//oModel.dataChanged(this);
			});
		});
		
		oTable.bindRows("/");
		// #### END Table ####	
		
		return oTable;
	}
});
