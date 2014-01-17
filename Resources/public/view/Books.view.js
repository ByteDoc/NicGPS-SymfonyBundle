// View for "Books"
sap.ui.jsview("net.bytedoc.nicgps.Books", {
    getControllerName: function() {
        return "net.bytedoc.nicgps.Books";
    },

    controls : {},

    // content of the view: editable Table Control with Toolbar
    createContent: function(oController) {

        // #### FORM and Layout ####
        var oLayoutFormBook = new sap.ui.layout.form.GridLayout();
        var oFormBook = new sap.ui.layout.form.Form(this.createId("FormBook"), {
            title : new sap.ui.core.Title({ text : "Book Data", tooltip : "Book Data"}),
            layout : oLayoutFormBook,
            visible : false,
            formContainers : [
                new sap.ui.layout.form.FormContainer(this.createId("FormBookC1"), {
                    title : "Das Wichtigste",
                    formElements : [
                        new sap.ui.layout.form.FormElement({
                            label: new sap.ui.commons.Label({ text : "Titel"}),
                            fields: [
                                new sap.ui.commons.TextField({ value : "{title}" })
                            ]
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: new sap.ui.commons.Label({ text : "Autor"}),
                            fields: [
                                new sap.ui.commons.TextField({ value : "{author}"})
                            ]
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: new sap.ui.commons.Label({ text : "Kategorie"}),
                            fields: [
                                new sap.ui.commons.TextField({ value : "{category}"})
                            ]
                        })
                    ]
                }),
                new sap.ui.layout.form.FormContainer(this.createId("FormBookC2"), {
                    title : "Links",
                    formElements : [
                        new sap.ui.layout.form.FormElement({
                            label: new sap.ui.commons.Label({ text : "Buch-Link"}),
                            fields: [
                                new sap.ui.commons.TextField({ value : "{hrefbook}"})
                            ]
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: new sap.ui.commons.Label({ text : "Text für Buch-Link"}),
                            fields: [
                                new sap.ui.commons.TextField({ value : "{hrefbooktext}"}),
                                new sap.ui.commons.Link({
                                    text: "{hrefbooktext}",
                                    href: "{hrefbook}",
                                    target: "_new"
                                })
                            ]
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: new sap.ui.commons.Label({ text : "Referenz-Link"}),
                            fields: [
                                new sap.ui.commons.TextField({ value : "{hrefreference}"})
                            ]
                        }),
                        new sap.ui.layout.form.FormElement({
                            label: new sap.ui.commons.Label({ text : "Text für Referenz-Link"}),
                            fields: [
                                new sap.ui.commons.TextField({ value : "{hrefreferencetext}"}),
                                new sap.ui.commons.Link({
                                    text: "{hrefreferencetext}",
                                    href: "{hrefreference}",
                                    target: "_new"
                                })
                            ]
                        })
                    ],
                    layoutData : new sap.ui.layout.form.GridContainerData({halfGrid: true})
                }),
                new sap.ui.layout.form.FormContainer(this.createId("FormBookC3"), {
                    title : "Notizen",
                    formElements : [
                        new sap.ui.layout.form.FormElement({
                            fields: [
                                new sap.ui.commons.TextArea({
                                    value : "{notes}",
                                    rows : 8,
                                    layoutData : new sap.ui.layout.form.GridElementData({ vCells : 4 })
                                })
                            ]
                        })
                    ],
                    layoutData : new sap.ui.layout.form.GridContainerData({halfGrid: true})
                })
            ]
        });

        // #### Toolbar ####
        var oToolbar = new sap.ui.commons.Toolbar(this.createId("toolbar"));
        var oTbButAddRow = new sap.ui.commons.Button(this.createId("toolbarButtonAddRow"), {
            text: "Neuer Eintrag",
            tooltip: "Neuer Eintrag",
            press: oController.addRow
        });
        var oTbButCancelEdit = new sap.ui.commons.Button(this.createId("toolbarButtonCancelEdit"), {
            text: "Abbrechen",
            tooltip: "Abbrechen",
            enabled: false,
            press: oController.cancelEdit
        });
        var oTbButDeleteRow = new sap.ui.commons.Button(this.createId("toolbarButtonDeleteRow"), {
            text: "Eintrag löschen",
            tooltip: "Eintrag löschen",
            enabled: false,
            press: oController.deleteRow
        });
        var oTbButSave = new sap.ui.commons.Button(this.createId("toolbarButtonSave"), {
            text: "Speichern",
            tooltip: "Daten speichern",
            enabled: false,
            press: oController.save
        });
        var oTbTfMessage = new sap.ui.commons.TextView(this.createId("toolbarTextViewMessage"), {
            visible : false,
            design : sap.ui.commons.TextViewDesign.Bold
        });
        oToolbar.addItem(oTbButAddRow);
        oToolbar.addItem(new sap.ui.commons.ToolbarSeparator());
        oToolbar.addItem(oTbButSave);
        oToolbar.addItem(oTbButCancelEdit);
        oToolbar.addItem(oTbButDeleteRow);
        oToolbar.addItem(new sap.ui.commons.ToolbarSeparator());
        oToolbar.addItem(oTbTfMessage);
        // #### END Toolbar ####


        // #### Table ####
        var oTable = new sap.ui.table.Table({
            id: this.createId("tableBooks"),
            editable: true,
            visibleRowCount: 5,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            toolbar: oToolbar
        });
        // ## ID ##
        var oControl = new sap.ui.commons.TextView({
            text: "{id}"
        });
        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: "ID"
            }),
            template: oControl,
            visible: false
        }));
        // ## Kategorie ##
        oControl = new sap.ui.commons.TextView({
            text: "{category}"
        });
        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: "Kategorie"
            }),
            template: oControl,
            sortProperty: "category",
            filterProperty: "category",
            width: "120px"
        }));
        // ## Titel ##
        oControl = new sap.ui.commons.Button({
            text: "{title}",
            lite: true,
            press: function(oEvent) {
                var oModel = this.getModel();
                var index = oModel.pathToIndex(this.getBindingContext().getPath());
                index = oModel.pathToIndex(index);
                oController.startEditing(oModel, index);
            }
        });
        //oControl.bindContext("/");
        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: "Titel"
            }),
            template: oControl,
            sortProperty: "title",
            filterProperty: "title",
            width: "200px"
        }));
        // ## Author ##
        oControl = new sap.ui.commons.TextView({
            text: "{author}"
        });
        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: "Autor"
            }),
            template: oControl,
            sortProperty: "author",
            filterProperty: "author",
            width: "200px"
        }));
        // ## Links ##
        oControl = new sap.ui.commons.Link({
            text: "{hrefbooktext}",
            href: "{hrefbook}",
            target: "_new"
        });
        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: "Buch-Link"
            }),
            template: oControl,
            width: "60px"
        }));
        oControl = new sap.ui.commons.Link({
            text: "{hrefreferencetext}",
            href: "{hrefreference}",
            target: "_new"
        });
        oTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({
                text: "Ref.-Link"
            }),
            template: oControl,
            width: "50px"
        }));

        oTable.bindRows("/", null, sap.ui.model.BindingMode.OneWay);

        // #### END Table ####

        // these controls are needed by the controller
        this.controls.formBook = oFormBook;
        this.controls.table = oTable;
        this.controls.tbButAddRow = oTbButAddRow;
        this.controls.tbButCancelEdit = oTbButCancelEdit;
        this.controls.tbButDeleteRow = oTbButDeleteRow;
        this.controls.tbButSave = oTbButSave;
        this.controls.tbTfMessage = oTbTfMessage;

        this.controls.callbackSaveAjaxSuccess = function() {
            // relying on global variables here ...
            oModels.Book.controls.displayMessage("Speichern erfolgreich");
        };

        this.controls.callbackDeleteAjaxSuccess = function() {
            // relying on global variables here ...
            oModels.Book.controls.displayMessage("Löschen erfolgreich");
        };

        this.controls.displayMessage = function(text) {
            // relying on global variables here ...
            oModels.Book.controls.tbTfMessage.setText(text);
            oModels.Book.controls.tbTfMessage.setVisible(true);
            oModels.Book.controls.tbTfMessage.setSemanticColor(sap.ui.commons.TextViewColor.Positive);
            var timeout = setTimeout(function() { $("#"+oModels.Book.controls.tbTfMessage.getId()).fadeOut() }, 1000)  
        }

        // #### general Layout, vertical ####
        var oLayout = new sap.ui.layout.VerticalLayout(this.createId("Layout"), {
            content : [ oFormBook, oTable ]
        });

        return oLayout;


    }
});
