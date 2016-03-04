import {Page, IonicApp, NavController, NavParams} from 'ionic/ionic';
import {WhoAmIPage} from '../WhoAmI/whoami';


@Page({
  templateUrl: 'build/pages/ApiError/api-error.html'
  //there is no provider here for the binaryopsService. It is a singleton and the provider is on the app itself.
})
export class ApiErrorPage {
  constructor(nav: NavController, navParams: NavParams) {

    // If we navigated to this page, we will have an item available as a nav param
    this.err = navParams.get('err').json();
    this.nav = nav;

    console.log("Error for modal: " + JSON.stringify(this.err));

  }

  whoAmI(){
    console.log("Going to Who Am I");
    this.nav.pop();
    this.nav.push(WhoAmIPage);
  }
   close(){
     console.log("Going to close");
     this.nav.pop();
   }

}
