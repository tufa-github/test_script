import UIComponent from "sap/ui/core/UIComponent";
import { support } from "sap/ui/Device";
import models from "./model/models";
import JSONModel from "sap/ui/model/json/JSONModel";
import { FlexAlignItems } from "sap/m/library";
import Item from "sap/ui/core/Item";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";

/**
 * @namespace tufa.autoui
 */
export default class Component extends UIComponent {
  public static metadata = {
    manifest: "json",
  };

  private contentDensityClass: string;

  public init(): void {
    // call the base component's init function
    super.init();

    this.setModel(models.createDeviceModel(), "device");

    const oData = new ODataModel({
      serviceUrl: "public/",
      synchronizationMode: "None",
      operationMode: "Server",
    });
	  this.setModel(oData);
/*
    const myModel = new JSONModel({
      items: [{ name: "Item 1" }, { name: "Item 2" }, { name: "Item 3" }],
    });
    this.setModel(myModel, "myModel");
*/

    var petsListInputModel = new JSONModel({
      recipient:{
        name: "Katty",
        species: "cat"
      }
    });
    this.setModel(petsListInputModel,"petsListInputModel");

    var personListInputModel = new JSONModel({
      recipient:{
        firstname: "Kevin",
        lastname: "Diehl",
        age: "25"
      }
    });
    this.setModel(personListInputModel,"personListInputModel");

    /*var myInputModel = new JSONModel({
      recipient:{
        name:"UI5"
      }
    });
    this.setModel(myInputModel,"myInputModel");

    var myTextAreaInputModel = new JSONModel({
      recipient:{
        name:"p36"
      }
    });
    this.setModel(myTextAreaInputModel,"myTextAreaInputModel");
    */

    // create the views based on the url/hash
    this.getRouter().initialize();
  }

  /**
   * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
   * design mode class should be set, which influences the size appearance of some controls.
   *
   * @public
   * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
   */
  public getContentDensityClass(): string {
    if (this.contentDensityClass === undefined) {
      // check whether FLP has already set the content density class; do nothing in this case
      if (
        document.body.classList.contains("sapUiSizeCozy") ||
        document.body.classList.contains("sapUiSizeCompact")
      ) {
        this.contentDensityClass = "";
      } else if (!support.touch) {
        // apply "compact" mode if touch is not supported
        this.contentDensityClass = "sapUiSizeCompact";
      } else {
        // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
        this.contentDensityClass = "sapUiSizeCozy";
      }
    }
    return this.contentDensityClass;
  }
}
