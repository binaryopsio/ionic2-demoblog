import {App, IonicApp, Platform} from 'ionic/ionic';
import {IntroPage} from './pages/intro/intro';
import {LoginPage} from './pages/login/login';
import {BlogListPage} from './pages/bloglist/bloglist';
import {BinaryopsService} from 'angular2-binaryops/client';


@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [BinaryopsService]
})
class MyApp {
  constructor(app: IonicApp, platform: Platform, binaryopsService: BinaryopsService) {

    // set up our app
    this.app = app;
    this.platform = platform;
    this.binaryopsService = binaryopsService;
    this.initializeApp();


    // set our app's pages
    this.pages = [
      { title: 'Intro', component: IntroPage },
      { title: 'Login', component: LoginPage },
      { title: 'Blog List', component: BlogListPage }
    ];

    // make HelloIonicPage the root (or first) page
    this.rootPage = IntroPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      //
      // For example, we might change the StatusBar color. This one below is
      // good for light backgrounds and dark text;
      if (window.StatusBar) {
        window.StatusBar.styleDefault();
      }

      this.binaryopsService.setApiDetail("prod", "bdco43", "1", "0hjh12");
      //dev this.binaryopsService.setApiDetail("prod", "mauj32", "1", "y1lzxl");

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.app.getComponent('leftMenu').close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }

  showApiError(err){
    let errAlert = Alert.create({
      title: "Data error",
      body: err,
      buttons: [{text: 'OK',
            handler: data => {}
          }]
    });
    nav.present(errAlert);

  }
}
