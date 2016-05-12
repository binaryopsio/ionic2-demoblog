import {Page, IonicApp, Alert, NavController, NavParams} from 'ionic/ionic';
import {BinaryopsService} from 'angular2-binaryops/client';

@Page({
  templateUrl: 'build/pages/post-details/post-details.html'
})
export class PostDetailsPage {
  constructor(app: IonicApp, nav: NavController, navParams: NavParams, binaryopsService: BinaryopsService) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.app = app;

    this.selectedCount = 0;
    this.editSelectedDisabled = true;

    this.binaryopsService = binaryopsService;
    // this.comments = [];
    // this.binaryopsService.searchDocs('comment',"postid="+this.selectedItem._id).subscribe(
    //   data => {this.comments = data.data; console.log(data);},
    //   err => console.log('Error: ' + err),
    //   () => console.log('SearchDocs complete')
    // );
  }

  checkItem(item){
    if (item.delete){
      //getting unchecked
      this.selectedCount--
    }
    else {
      //getting checked
      this.selectedCount++;
    }
    console.log('selectedCount: ' + this.selectedCount);
    if (this.selectedCount ==1){
      this.editSelectedDisabled = null;
    } else {
      this.editSelectedDisabled = true;
    }
  }

  editSelectedItem(){
    console.log("Getting ready to edit");
    //let toDelete = [];

    for (var comment of this.selectedItem.comment_postid) {
      if (comment.delete){
        //console.log("Delete: " + comment.content);
        this.editItem(comment);//  toDelete.push(comment._id);
        break;
      }
    }


  }

  editItem(item){
    console.log('going to edit: ' + item.content);
    this.presentPromptUpdateComment(item);
    let cmntlist = this.app.getComponent("commentlist");
    cmntlist.closeSlidingItems();

  }

  deleteItem(item){
    console.log('going to delete: ' + item.content);
    this.deleteOneComment(item);
  }

  deleteOneComment(cmt){
    this.binaryopsService.delete("comment", cmt).subscribe(
      data => {console.log(JSON.stringify(data));
         let i = this.selectedItem.comment_postid.indexOf(cmt);
         this.selectedItem.comment_postid.splice(i,1);
      },
      err => console.log('Error: ' + err),
      () => console.log('Delete complete')
    );
  }

  deleteSelectedComment($event){
    console.log("Getting ready to delete");
    //let toDelete = [];
    for (var comment of this.selectedItem.comment_postid) {
      if (comment.delete){
        //console.log("Delete: " + comment.content);
        this.deleteOneComment(comment);//  toDelete.push(comment._id);
      }
    }
  }


  presentPromptUpdateComment(comment1){
  let cmt = comment1;
  let alert = Alert.create({
    title: 'Update Comment',
    inputs: [
      {
        name: 'Comment',
        value: cmt.content
      }    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Apply',
        handler: data => {
          // if (User.isValid(data.username, data.password)) {
          //   // logged in!
          // } else {
          //   // invalid login
          //   return false
          // }

          cmt.content = data.Comment;

          this.binaryopsService.update('comment',cmt).subscribe(
              data => {
                console.log(data);
                //  this.selectedItem.comment_postid.push(data);
                console.log('is the ui ok?');
              },
              err => {
                    console.log('Error: ' + JSON.stringify(err));
                    console.log(err); },
              () => console.log('Comment update complete')
            );
          }
        }
      ]
    });
    this.nav.present(alert);
  }


  presentPromptComment() {
  let alert = Alert.create({
    title: 'Add Comment',
    inputs: [
      {
        name: 'Comment',
        placeholder: 'Enter your comment'
      }    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          // if (User.isValid(data.username, data.password)) {
          //   // logged in!
          // } else {
          //   // invalid login
          //   return false
          // }
          let inscmt = {};
          inscmt.content = data.Comment;
          inscmt.postid = this.selectedItem._id;
          if (inscmt.content) {
            console.log('adding comment here');
            this.binaryopsService.insert('comment',inscmt).subscribe(
                data => {
                  console.log("comment added!");
                  console.log(data);
                  this.selectedItem.comment_postid.push(data);
                },
                err => {
                    console.log('Error: ' + JSON.stringify(err));
                    console.log(err);
                },
                () => {
                  console.log('Comment insert complete');
                });
            }
          }
        }
      ]
    });
    this.nav.present(alert);
  }
}
