

// View for GPS Dashboard
sap.ui.jsview("net.bytedoc.nicgps.Goals", {
	getControllerName: function() {
		return "net.bytedoc.nicgps.TableControlEditing";
	},

	callbacks : {
        ajaxSaveSuccess : function() {
            // relying on global variables here ...
        },
        ajaxDeleteSuccess : function() {
            // relying on global variables here ...
        }
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
		
		var oTableGoals = new sap.ui.table.Table({
			id : this.createId("tableGoals"),
			editable : true,
			visibleRowCount : 5,
			navigationMode : sap.ui.table.NavigationMode.Paginator,
			toolbar : oToolbar,
			selectionMode : sap.ui.table.SelectionMode.Single
		});
		var watchedControls = [];
		// ## Datum ##
		var oControl = new sap.ui.commons.DatePicker({
			yyyymmdd : "{duedate}",
			locale : "de"
		});
		watchedControls.push(oControl);
		oTableGoals.addColumn(new sap.ui.table.Column({
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
		oTableGoals.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({ text : "Titel"}),
			template : oControl,
			sortProperty : "title",
			filterProperty : "title",
			width : "120px"
		}));
		// ## Progress ##
		oControl = new sap.ui.commons.Slider({
			width : "200px",
			min : 0,
			max : 100,
			value : "{progress}",
			smallStepWidth : 5,
			stepLabels : true
		});
		watchedControls.push(oControl);
		oTableGoals.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({ text : "Progress"}),
			template : oControl,
			sortProperty : "progress",
			filterProperty : "progress",
			width : "200px"
		}));
		// ## register change events for watched controls ##
		jQuery.each(watchedControls, function(key, item) {
			item.attachChange(oController.dataChanged);
		});
		oTableGoals.bindRows("/");
		// #### End Table ####
		
		
		// #### Panel ####
		var oPanelGoals = new sap.ui.commons.Panel({
			title : new sap.ui.core.Title({ text : "Goals" }),
			areaDesign : sap.ui.commons.enums.AreaDesign.Plain,
			borderDesign : sap.ui.commons.enums.BorderDesign.None,
			content : oTableGoals
		});
		// #### End Panel ####

		
		return oPanelGoals;
	}
});
