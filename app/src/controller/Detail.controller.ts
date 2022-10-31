import BaseController from "./BaseController";
import UI5Event from "sap/ui/base/Event";

/**
 * @namespace tufa.autoui.controller
 */
export default class App extends BaseController {

	public onInit() {
		var oRoute = this.getRouter();
		oRoute.getRoute("detail").attachMatched(this._onRouteMatched, this);
	}

	public _onRouteMatched(event: UI5Event) {
		var personPath = event.getParameter("arguments").personPath;
		this.getView().bindElement({path: "/" + personPath});
	}

	public onPersonDetailNavBack() {
		this.onNavBack();
	}

}
