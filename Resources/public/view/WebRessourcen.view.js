

// View for Table "Wissensportale"
sap.ui.jsview("net.bytedoc.nicgps.WebRessourcen", {
	getControllerName: function() {
		return "net.bytedoc.nicgps.TableControlEditing";
	},

	controls : {},

	callbacks : {
        ajaxSaveSuccess : function() {
            // relying on global variables here ...
        },
        ajaxDeleteSuccess : function() {
            // relying on global variables here ...
        }
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
		oToolbar.addItem(new sap.ui.commons.ToolbarSeparator());
		oToolbar.addItem(oTbButDeleteRow);
		oToolbar.addItem(new sap.ui.commons.ToolbarSeparator());
		oToolbar.addItem(new sap.ui.commons.TextView({ text : "speichern erfolgt automatisch" }));
		//oToolbar.addItem(oTbButSave);
		// #### END Toolbar ####
		
		
		// #### Table ####
		var oTable = new sap.ui.table.Table({
			id : this.createId("tableWebRessourcen"),
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
		// ## Kategorie ##
		var oControl = new sap.ui.commons.TextField({
			value : "{category}"
		});
		watchedControls.push(oControl);
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({ text : "Kategorie" }),
			template : oControl,
			sortProperty : "category",
			filterProperty : "category",
			width : "120px"
		}));
		// ## Titel ##
		oControl = new sap.ui.commons.TextField({
			value : "{title}"
		});
		watchedControls.push(oControl);
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({ text : "Titel" }),
			template : oControl,
			sortProperty : "title",
			filterProperty : "title",
			width : "200px"
		}));
		// ## Link ##
		oControl = new sap.ui.commons.Link({
			text : "open",
			href : "{href}",
			target : "_new"
		});
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({ text : "Link" }),
			template : oControl,
			width : "50px",
			resizable : false
		}));
		// ## HREF ##
		oControl = new sap.ui.commons.TextField({
			value : "{href}"
		});
		watchedControls.push(oControl);
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({ text : "Web Site"}),
			template : oControl,
			sortProperty : "href",
			filterProperty : "href",
			width : "200px"
		}));
		// ## Rating ##
		oControl = new sap.ui.commons.RatingIndicator({ value : "{rating}" });
		watchedControls.push(oControl);
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({ text : "Rating" }),
			template : oControl,
			sortProperty : "rating",
			filterProperty : "rating"
		}));
		
		jQuery.each(watchedControls, function(key, item) {
			//item.attachChange(oController.dataChanged);
			item.attachChange(oController.dataChanged);
			// item.attachChange( function(oEvent) {
			// 	oController.dataChanged(this);
			// 	//var oModel = this.getModel();
			// 	//oModel.dataChanged(this);
			// });
		});
		
		oTable.bindRows("/");
		// #### END Table ####

		// these controls are needed by the controller
        this.controls.table = oTable;	
		
		return oTable;
	}
});
