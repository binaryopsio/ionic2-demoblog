import {Page, IonicApp, NavController, NavParams} from 'ionic/ionic';
import {LoginPage} from '../login/login';
import {BinaryopsService} from 'angular2-binaryops/client';


@Page({
  templateUrl: 'build/pages/WhoAmI/whoami.html'
  //there is no provider here for the binaryopsService. It is a singleton and the provider is on the app itself.
})
export class WhoAmIPage {
  constructor(nav: NavController, navParams: NavParams, binaryopsService: BinaryopsService) {

    // If we navigated to this page, we will have an item available as a nav param
    this.nav = nav;
    this.binaryopsService = binaryopsService;
    this.me = {};

    this.binaryopsService.userMe().subscribe(
        data => {console.log("Me:" + JSON.stringify(data);
          this.me = data
          this.privsText = JSON.stringify(this.me.privs);
          console.log("privsText is: " + this.privsText);
          if (this.privsText === "{}"){
            this.privsText = "None";
          }
       },
        err => {console.log("Error")},
        () => {console.log('retrieved me data')}
    );

  }

  login(){
    console.log("Going to login");
    this.nav.pop();
    this.nav.push(LoginPage);
  }
   close(){
     console.log("Going to close");
     this.nav.pop();
   }

}
