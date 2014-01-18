// Controller for Table Control editing
sap.ui.core.mvc.Controller.extend("net.bytedoc.nicgps.TableControlEditing", {
	
	addRow: function(oEvent) {
		var oModel = this.getModel();
		var oButton = oEvent.getSource();
		//oModel.oData.unshift({ guid : net.bytedoc.Helper.createGuid() });
		oModel.oData.unshift({ });
		oModel.refresh();
		oModel.dataChanged("/0");
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
		var selectedIndices = oTable.getSelectedIndices();
		// deleting of multiple rows does not work yet!
		// indices get changed during deletion, wrong entries get deleted
		var dataIndices = [];
		jQuery.each(selectedIndices, function(index, value) {
			dataIndices.push(oTable.getContextByIndex(value).sPath.replace(/^\//g,''));
		});
		dataIndices.sort();
		for (var i = dataIndices.length - 1; i >= 0; i--) {
			oModel.deleteByIndex(dataIndices[i]);
		};

		oModel.refresh();
	},
	
	dataChanged: function(oSource) {
		var oModel = oSource.getModel();
		oModel.dataChanged(oSource.getBindingContext().getPath());
	},
	
	save: function(oEvent) {
		var oModel = this.getModel();
		oModel.saveAll();
	}
	
});
