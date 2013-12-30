// Controller for Table Control editing
sap.ui.core.mvc.Controller.extend("net.bytedoc.nicgps.TableControlEditing", {
	
	addRow: function(oEvent) {
		var oModel = this.getModel();
		var oButton = oEvent.getSource();
		oModel.oData.unshift({ guid : net.bytedoc.Helper.createGuid() });
		oModel.refresh();
		oModel.dataChanged();
	},
	
	deleteRow: function(oEvent) {
		var oModel = this.getModel();
		var oButton = oEvent.getSource();
		myDebug = oButton;
		// CAREFUL - detection of the corresponding Table Control, not bullet-proof
		switch(oButton.sParentAggregationName) {
		case "buttons": // buttons aggregation is used in a Panel - DOES NOT WORK
			var oTable = oButton.getParent().getContent();
			break;
		case "items": // items aggregation is used in a Table Control Toolbar
			var oTable = oButton.getParent().getParent();
			break;
		}
		myDebug = oButton;
		var selectedIndices = oTable.getSelectedIndices();
		jQuery.each(selectedIndices, function(index, value) {
			var indexToDelete = oTable.getContextByIndex(value).sPath.replace(/^\//g,'');
			oModel.oData.splice(indexToDelete, 1);
		});
		oModel.refresh();
		oModel.dataChanged();
	},
	
	dataChanged: function(oEvent) {
		var oModel = this.getModel();
		oModel.dataChanged();
	},
	
	save: function(oEvent) {
		var oModel = this.getModel();
		oModel.saveMe();
	}
	
});
