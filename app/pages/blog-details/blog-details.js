import {Page, NavController, NavParams} from 'ionic/ionic';
import {BinaryopsService} from 'angular2-binaryops/client';
import {PostDetailsPage} from '../post-details/post-details';
import {WhoAmIPage} from '../WhoAmI/whoami';

@Page({
  templateUrl: 'build/pages/blog-details/blog-details.html'
})
export class BlogDetailsPage {
  constructor(nav: NavController, navParams: NavParams, binaryopsService: BinaryopsService) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.binaryopsService = binaryopsService;
    this.posts = [];
    this.binaryopsService.searchDocs('post',"_connect=comment.postid&blogid="+this.selectedItem._id).subscribe(
      data => {this.posts = data.data; console.log(data);},
      err => console.log('Error: ' + err),
      () => console.log('SearchDocs complete')
    );
  }

  itemTapped(event, item) {
     this.nav.push(PostDetailsPage, {
       item: item
     });
  }

  whoAmI() {
    this.nav.push(WhoAmIPage);

  }
}
