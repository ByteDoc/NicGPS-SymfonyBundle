// Login View
sap.ui.jsview("net.bytedoc.nicgps.Login", {
	getControllerName: function() {
		// return "net.bytedoc.nicgps.TableControlEditing";
		// not needed
	},
	
	// content of the view: login form
	createContent: function(oController) {
		
		
		var oLayout = new sap.ui.layout.form.GridLayout();
		var oForm = new sap.ui.layout.form.Form(this.createId("formLogin"), {
			title : new sap.ui.core.Title({ text : "Personal GPS Login", tooltip : "Personal GPS Login" }),
			layout : oLayout,
			formContainers : new sap.ui.layout.form.FormContainer(this.createId("formLoginContainer"), {
				formElements: [
					new sap.ui.layout.form.FormElement({
						label : new sap.ui.commons.Label({ text : "Username" }),
						fields : [new sap.ui.commons.TextField({ name : "_username" })]
					}),
					new sap.ui.layout.form.FormElement({
						label : new sap.ui.commons.Label({ text : "Password" }),
						fields : new sap.ui.commons.PasswordField({ name : "_password" })
					}),
					new sap.ui.layout.form.FormElement({
						fields : new sap.ui.commons.Button({
							text : "Login",
							press : function(oEvent) {
								$("form").submit();
							}
						})
					})
					
				]
			})
		});
		
		return oForm;
	}
});
