import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";
import Message from "sap/ui/core/Message";
import MessageToast from "sap/m/MessageToast";
import UI5Event from "sap/ui/base/Event";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import Button from "sap/m/Button";
import Dialog from "sap/m/Dialog";
import Text from "sap/m/Text";

/**
 * @namespace tufa.autoui.controller
 */
export default class Main extends BaseController {
	private formatter = formatter;

	public sayHello() : void {
		MessageBox.show("Hello World!");
	}
	
	public onButtonPress(){
		//MessageBox.information("Let's start!");
	    var tRecipient = this.getView().getModel("myTextAreaInputModel").getProperty("/recipient/name");
		MessageBox.show(tRecipient);
	}

	public onSubmit(){
		var sRecipient = this.getView().getModel("myInputModel").getProperty("/recipient/name");
		//MessageBox.information(sRecipient);
		MessageToast.show(sRecipient);
	}

	public mySearch(event:UI5Event){
		const query = event.getParameter("query");
		//MessageBox.show(query);
		const table = this.getView().byId("petsList");
		const binding = table.getBinding("items") as ODataListBinding;
		
		const filters = [];
		if(query){
			filters.push(new Filter("name", FilterOperator.Contains, query))
		}
		binding.filter(filters);
	}

	public mySearchPerson(event:UI5Event){
		const query = event.getParameter("query");
		//MessageBox.show(query);
		const table = this.getView().byId("personList");
		const binding = table.getBinding("items") as ODataListBinding;
		
		const filters = [];
		if(query){
			filters.push(new Filter("firstname", FilterOperator.Contains, query))
		}
		binding.filter(filters);
	}
	
	public pressAddInList(){
		var nRecipient = this.getView().getModel("petsListInputModel").getProperty("/recipient/name");
		var sRecipient = this.getView().getModel("petsListInputModel").getProperty("/recipient/species");
		//MessageBox.show(nRecipient + sRecipient);

		const context = (<ODataListBinding>this.getView().byId("petsList").getBinding("items"))
                    .create({
                        "name" : nRecipient,
                        "species" : sRecipient
                    });
	}

	public pressAddInPersonList(){
		var Recipient1 = this.getView().getModel("personListInputModel").getProperty("/recipient/firstname");
		var Recipient2 = this.getView().getModel("personListInputModel").getProperty("/recipient/lastname");
		var Recipient3 = this.getView().getModel("personListInputModel").getProperty("/recipient/age");
		MessageBox.show(Recipient1 + Recipient2 + Recipient3);

		const context = (<ODataListBinding>this.getView().byId("personList").getBinding("items"))
                    .create({
                        "firstname": Recipient1,
                        "lastname": Recipient2,
						"age": parseInt(Recipient3)
                    });
	}

	public addInPetsDialogPress(){

		var petsName = this.getView().getModel("petsListInputModel").getProperty("/recipient/name");
		var petsSpecies = this.getView().getModel("petsListInputModel").getProperty("/recipient/species");
        
		var oDialog = new Dialog({
			title: "Add in Petslist",
			icon: "sap-icon://add",
			content: new Text({text: " Name: " + petsName + "\n " + " Species: " + petsSpecies}),
			beginButton: new Button({
				type: "Emphasized",
				text: "Add",
				press: function (this: any) {
					this.pressAddInList();
					oDialog.close();
				}.bind(this)
			})
		});

		oDialog.open();
	}
}
