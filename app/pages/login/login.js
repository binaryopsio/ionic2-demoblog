
  import {Page,  Alert, NavController, NavParams} from 'ionic/ionic';
  import {BinaryopsService} from 'angular2-binaryops';
  import {BlogListPage} from '../bloglist/bloglist';
  import 'rxjs/add/operator/map';


  @Page({
    templateUrl: 'build/pages/login/login.html'
  })
  export class LoginPage {
    constructor(nav: NavController, navParams: NavParams, binaryopsService: BinaryopsService) {
        this.username = "demo";
        this.password = "horses123";
        this.binaryopsService = binaryopsService;
        this.nav = nav;
        this.navParams = navParams;
    }

    doLogin(){

      let nav = this.nav;

      this.binaryopsService.login(this.username, this.password).subscribe(
        data => {
        console.log("Login OK");
        this.nav.push(BlogListPage, {});
      },
      err => {
        let errAlert = Alert.create({
          title: "Login Denied",
          body: err,
          buttons: [{text: 'OK',
                handler: data => {}
              }]
        });
        nav.present(errAlert);
      },
      () => console.log('Login complete')
    );

    }

  }
