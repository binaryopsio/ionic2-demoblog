import {Page, Modal, IonicApp, NavController, NavParams} from 'ionic/ionic';
import {BlogDetailsPage} from '../blog-details/blog-details';
import {ApiErrorPage} from '../ApiError/api-error';
import {BinaryopsService} from 'angular2-binaryops';


@Page({
  templateUrl: 'build/pages/bloglist/bloglist.html'
  //there is no provider here for the binaryopsService. It is a singleton and the provider is on the app itself.
})
export class BlogListPage {
  constructor(nav: NavController, navParams: NavParams, binaryopsService:BinaryopsService) {
    this.nav = nav;
    this.binaryopsService = binaryopsService;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    this.binaryopsService.searchDocs('blog').subscribe(
      data => {this.items = data.data; console.log(data);
        for(let i = 0; i < this.items.length; i++) {
            this.items[i].icon = this.icons[Math.floor(Math.random() * this.icons.length)]
        }

      },
      err => {console.log('Error: ' + err);
              this.showApiError(err);
            },
      () => console.log('SearchDocs complete')
    );

  }

  showApiError(err){
    let apiErrorModal = Modal.create(ApiErrorPage, {err:err});
   this.nav.present(apiErrorModal);

  }

  itemTapped(event, item) {
     this.nav.push(BlogDetailsPage, {
       item: item
     });
  }
}
