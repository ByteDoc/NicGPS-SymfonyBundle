// Controller for Books
sap.ui.core.mvc.Controller.extend("net.bytedoc.nicgps.Books", {
	
	// required functions:
	// startEditing
	// save
	// stopEditing
	// addRow
	// cancelEdit

	addRow: function(oEvent) {
		var oModel = this.getModel();
		var oButton = oEvent.getSource();
		oModel.oData.unshift({ });
		oModel.refresh();
		oModel.oDetail.data = null;
		oModel.oDetail.index = null;
		oModel.oDetail.new = true;
		sap.ui.controller("net.bytedoc.nicgps.Books").startEditing(oModel, 0);
	},

	cancelEdit: function(oEvent) {
		var oModel = this.getModel();
		// alert(oModel.dataBeforeEdit.id);
		if(typeof oModel.oDetail.data.id === "undefined") {
			// current edited entry has not id yet
			oModel.oData.shift();
		} else {
			// alert("resetting data");
			oModel.oData[oModel.oDetail.index] = jQuery.extend({}, oModel.oDetail.data);
		}
		oModel.refresh();
		sap.ui.controller("net.bytedoc.nicgps.Books").stopEditing(oModel);
	},

	stopEditing: function(model) {
		model.oDetail.data = null;
		model.oDetail.index = null;
		model.oDetail.new = false;

		model.controls.formBook.setVisible(false);
		model.controls.tbButAddRow.setEnabled(true);
		model.controls.tbButCancelEdit.setEnabled(false);
		model.controls.tbButDeleteRow.setEnabled(false);
		model.controls.tbButSave.setEnabled(false);
	},

	startEditing: function(model, index) {
		// copy the object
		model.oDetail.data = jQuery.extend({}, model.oData[index]);
		model.oDetail.index = index;
		//model.oDetail.new is set by function addRow, if necessary

		model.controls.formBook.setVisible(true);
		model.controls.tbButAddRow.setEnabled(false);
		model.controls.tbButCancelEdit.setEnabled(true);
		if(model.oDetail.new != true) {
			model.controls.tbButDeleteRow.setEnabled(true);
		}
		model.controls.tbButSave.setEnabled(true);
		model.controls.formBook.bindContext("/"+index);

		//model.callbackAjaxSuccess = model.controls.ajaxSuccess;
		model.controls.tbTfMessage.setVisible(false);
		
	},
	
	deleteRow: function(oEvent) {
		var oModel = this.getModel();
		if(confirm('Really delete this entry?')) {
			oModel.deleteRowByIndex(oModel.oDetail.index);
			oModel.refresh();
			sap.ui.controller("net.bytedoc.nicgps.Books").stopEditing(oModel);
		}
	},
	
	// save the current edited data entry
	save: function(oEvent) {
		var oModel = this.getModel();
		oModel.saveByIndex(oModel.oDetail.index);

		// TODO only stop editing on 200 OK response
		sap.ui.controller("net.bytedoc.nicgps.Books").stopEditing(oModel);
	}
	
});
