// Controller for Books
sap.ui.controller("net.bytedoc.nicgps.Books", {

	onInit: function(oEvent) {
		oControllers.Book = this;
	},

	evtCreate: function(oEvent) {
		var oModel = this.getModel();
		oModel.oData.unshift({ });
		oModel.refresh();
		oModel.oDetail.data = null;
		oModel.oDetail.index = null;
		oModel.oDetail.new = true;
		oControllers.Book.startEditing(oModel, 0);
	},

	evtCancel: function(oEvent) {
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
		oControllers.Book.stopEditing(oModel);
	},

	evtDelete: function(oEvent) {
		var oModel = this.getModel();
		if(confirm('Really delete this entry?')) {
			oModel.deleteByIndex(oModel.oDetail.index);
			oModel.refresh();
			oControllers.Book.stopEditing(oModel);
		}
	},

	// save the current edited data entry
	evtSave: function(oEvent) {
		var oModel = this.getModel();
		oModel.saveByIndex(oModel.oDetail.index);

		// TODO only stop editing on 200 OK response
		oControllers.Book.stopEditing(oModel);
	},



	stopEditing: function(model) {
		model.oDetail.data = null;
		model.oDetail.index = null;
		model.oDetail.new = false;

		oViews.Book.stopEditing();
	},

	startEditing: function(model, index) {
		// copy the object
		model.oDetail.data = jQuery.extend({}, model.oData[index]);
		model.oDetail.index = index;
		//model.oDetail.new is set by function evtCreate, if necessary

		oViews.Book.startEditing({
			new : model.oDetail.new,
			index : index
		});
	}
	
});
