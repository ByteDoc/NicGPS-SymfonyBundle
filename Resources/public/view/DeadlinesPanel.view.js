

// View for GPS Dashboard
sap.ui.jsview("net.bytedoc.nicgps.DeadlinesPanel", {
	getControllerName: function() {
		return "net.bytedoc.nicgps.TableControlEditing";
	},
	
	// content of the view
	createContent: function(oController) {
		
		// #### Table ####
		// ## Toolbar ##
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
			tooltip : "Daten speichern"
		});
		oToolbar.addItem(oTbButAddRow);
		oToolbar.addItem(oTbButDeleteRow);
		// ## END Toolbar ##
		
		var oTableDeadlines = new sap.ui.table.Table({
			id : this.createId("tableDeadlines"),
			editable : true,
			visibleRowCount : 5,
			navigationMode : sap.ui.table.NavigationMode.Paginator,
			toolbar : oToolbar
		});
		var watchedControls = [];
		// ## Datum ##
		var oControl = new sap.ui.commons.DatePicker({
			yyyymmdd : "{date}",
			locale : "de"
		});
		watchedControls.push(oControl);
		oTableDeadlines.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({ text : "Datum"}),
			template : oControl,
			sortProperty : "date",
			filterProperty : "date",
			width : "80px"
		}));
		// ## Titel ##
		oControl = new sap.ui.commons.TextField({
			value : "{title}"
		});
		watchedControls.push(oControl);
		oTableDeadlines.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({ text : "Titel"}),
			template : oControl,
			sortProperty : "title",
			filterProperty : "title",
			width : "120px"
		}));
		jQuery.each(watchedControls, function(key, item) {
			item.attachChange(oController.dataChanged);
		});
		oTableDeadlines.bindRows("/");
		// #### End Table ####
		
		
		// #### Panel ####
		var oPanelDeadlines = new sap.ui.commons.Panel({
			title : new sap.ui.core.Title({ text : "Deadlines" }),
			areaDesign : sap.ui.commons.enums.AreaDesign.Plain,
			borderDesign : sap.ui.commons.enums.BorderDesign.None,
			content : oTableDeadlines
		});
		// #### End Panel ####

		
		return oPanelDeadlines;
	}
});
