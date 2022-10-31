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
import ColumnListItem from "sap/m/ColumnListItem";
import Context from "sap/ui/model/odata/v4/Context";
import Fragment from "sap/ui/core/Fragment";

/**
 * @namespace tufa.autoui.controller
 */
export default class Main extends BaseController {
  private formatter = formatter;
  private personDialog: Dialog;
  private petsDialog: Dialog;

  public sayHello(): void {
    MessageBox.show("Hello World!");
  }
  public onButtonPress() {
    //MessageBox.information("Let's start!");
    var tRecipient = this.getView()
      .getModel("myTextAreaInputModel")
      .getProperty("/recipient/name");
    MessageBox.show(tRecipient);
  }

  public onSubmit() {
    var sRecipient = this.getView()
      .getModel("myInputModel")
      .getProperty("/recipient/name");
    //MessageBox.information(sRecipient);
    MessageToast.show(sRecipient);
  }

  public mySearch(event: UI5Event) {
    const query = event.getParameter("query");
    //MessageBox.show(query);
    const table = this.getView().byId("petsList");
    const binding = table.getBinding("items") as ODataListBinding;

    const filters = [];
    if (query) {
      filters.push(new Filter("name", FilterOperator.Contains, query));
    }
    binding.filter(filters);
  }

  public mySearchPerson(event: UI5Event) {
    const query = event.getParameter("query");
    //MessageBox.show(query);
    const table = this.getView().byId("personList");
    const binding = table.getBinding("items") as ODataListBinding;

    const filters = [];
    if (query) {
      filters.push(new Filter("firstname", FilterOperator.Contains, query));
    }
    binding.filter(filters);
  }

  public pressAddInPetsList() {
    var nRecipient = this.getView()
      .getModel("petsListInputModel")
      .getProperty("/recipient/name");
    var sRecipient = this.getView()
      .getModel("petsListInputModel")
      .getProperty("/recipient/species");
    //MessageBox.show(nRecipient + sRecipient);

    const context = (<ODataListBinding>(
      this.getView().byId("petsList").getBinding("items")
    )).create({
      name: nRecipient,
      species: sRecipient,
    });
	this.closePetsDialog();
  }

  public pressAddInPersonList() {
    var Recipient1 = this.getView()
      .getModel("personListInputModel")
      .getProperty("/recipient/firstname");
    var Recipient2 = this.getView()
      .getModel("personListInputModel")
      .getProperty("/recipient/lastname");
    var Recipient3 = this.getView()
      .getModel("personListInputModel")
      .getProperty("/recipient/age");
    //MessageBox.show(Recipient1 + Recipient2 + Recipient3);

    const context = (<ODataListBinding>(
      this.getView().byId("personList").getBinding("items")
    )).create({
      firstname: Recipient1,
      lastname: Recipient2,
      age: parseInt(Recipient3),
    });
    this.closeDialog();
  }

  public async addInPersonsDialogPress() {
    var firstname = this.getView()
      .getModel("personListInputModel")
      .getProperty("/recipient/firstname");
    var lastname = this.getView()
      .getModel("personListInputModel")
      .getProperty("/recipient/lastname");
    var age = this.getView()
      .getModel("personListInputModel")
      .getProperty("/recipient/age");

    if (!this.personDialog) {
      this.personDialog = <Dialog>await Fragment.load({
        name: "tufa.autoui.view.createPersonDialog",
        controller: this,
      });
      this.getView().addDependent(this.personDialog);
    }
    this.personDialog.open();
  }

  public async addInPetsDialogPress() {
    if (!this.petsDialog) {
    this.petsDialog = <Dialog>await Fragment.load({
      name: "tufa.autoui.view.createPetsDialog",
      controller: this,
    });

    this.getView().addDependent(this.petsDialog);
    }
    this.petsDialog.open();

  }

  public closeDialog() {
    this.personDialog.close();
  }

  public closePetsDialog() {
    this.petsDialog.close();
  }

  public onDeletePress(event: UI5Event) {
    const listItem = event.getParameter("listItem") as ColumnListItem;
    const context = listItem.getBindingContext() as Context;
    context.delete();
  }

  public onPersonItemPress(event: UI5Event) {
    // get parameter from oData
    var oItem = event.getSource();
    var oCtx = oItem.getBindingContext();
    var personPath = oCtx.getPath().substr(1);
    
    // bypass parameters to the deatil page
    this.navTo("detail", {personPath : personPath});
  }
}
