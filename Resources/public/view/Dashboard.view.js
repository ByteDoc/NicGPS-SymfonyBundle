

// View for GPS Dashboard
sap.ui.jsview("net.bytedoc.nicgps.Dashboard", {
	getControllerName: function() {
		return "net.bytedoc.nicgps.Dashboard";
	},
	
	// content of the view
	createContent: function(oController) {
		
		var oLayout = new sap.ui.commons.layout.MatrixLayout({
			id : this.createId("matrixLayout"),
			layoutFixed : true
		});
		
		// #### Message of the Day ####
		var oPanelMotd = new sap.ui.commons.Panel({
			title : new sap.ui.core.Title({ text : "Message of the Day" }),
			areaDesign : sap.ui.commons.enums.AreaDesign.Plain,
				// sap.ui.commons.enums.AreaDesign: Fill, Plain, Transparent
			borderDesign : sap.ui.commons.enums.BorderDesign.None,
				// sap.ui.commons.enums.BorderDesign: Box, None
			content : new sap.ui.commons.TextView({
				text : "The weather is fine, go outside.",
				design : sap.ui.commons.TextViewDesign.Bold
			})
		});
		// #### END Message of the Day ####
		
		
		// #### Deadlines ####
		// var oViewDeadlinesPanel = sap.ui.view({
		// 	type : sap.ui.core.mvc.ViewType.JS,
		// 	viewName : "net.bytedoc.nicgps.Goals"
		// });
		// var oModelDeadlinesPanel = new net.bytedoc.UI5.JSONModelSymfony();
		// oModelDeadlinesPanel.init( {
		// 	entity : "Deadlines",
		// 	loadService : oApp.readDataService,
		// 	saveService : oApp.writeDataService
		// });
		// oModelDeadlinesPanel.loadAll();
		// oModelDeadlinesPanel.startAutoSave();
		// oModelDeadlinesPanel.callbackDataChanged = oApp.eventDataChanged;
		// oViewDeadlinesPanel.setModel(oModelDeadlinesPanel);
		// add objects to global arrays
		// oViews["net.bytedoc.nicgps.DeadlinesPanel"] = oViewDeadlinesPanel;
		// oModels["Deadlines"] = oModelDeadlinesPanel;
		// #### END Deadlines ####
		
		oLayout.createRow(
			new sap.ui.commons.layout.MatrixLayoutCell({
				vAlign : sap.ui.core.VerticalAlign.Top,
				content : oViews.Goal
			}),
			new sap.ui.commons.layout.MatrixLayoutCell({
				vAlign : sap.ui.core.VerticalAlign.Top ,
				content : oPanelMotd
			})
		);
		
		return oLayout;
	}
});
