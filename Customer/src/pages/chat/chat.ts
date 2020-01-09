import { Component, OnInit, ViewChild, NgZone } from '@angular/core'
import { Events, NavController, NavParams, AlertController, Platform,Item, ItemSliding,Button, PickerColumnCmp, PopoverController } from 'ionic-angular'
import { Tabs } from "ionic-angular";
import { ApiProvider } from "../providers/services";
import { CustomBootstrap } from "../../app/BootstrapFirstRun";
import { TranslateService } from "@ngx-translate/core";
import { Notification } from "../providers/interface";
import {PrivateChatPage} from "./privateChat/privatechat";
import { ImageViewerController } from 'ionic-img-viewer';
import { ImageViewerPage } from '../includes/imageViewer/imageViewer';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
    providers : [ImageViewerController]
})
export class ChatPage implements OnInit {
    @ViewChild('myTabs') tabRef: Tabs;
    currentItems = [{'name':'Mohideen','about':'Developer','note':'Sample Usage','blocked' : 'true'},{'name':'Abu','about':'Sr Developer','note':'Sample','blocked' : 'false'}];
    selected = "";
    sub1$
    activeItemSliding: ItemSliding = null;
    activeItem : Button = null;
    imageViewerCtrl : ImageViewerController;
    class = false;

    constructor(private platform: Platform,private alerCtrl: AlertController, public navparams: NavParams,
        public translateService: TranslateService, public events: Events, public navCtrl: NavController,
        public api: ApiProvider, public configuration: CustomBootstrap, private ngZone: NgZone, public imageViewController :ImageViewerController, public popovercontroller : PopoverController) {
            this.imageViewerCtrl = imageViewController;
            this.platform.ready().then(() => {
            
        });
    }

    ngOnInit() {
        this.selected = 'list';
    }


    openOption(itemSlide: ItemSliding, item: Button) {
        event.preventDefault();
        event.stopPropagation();
     
        if(this.activeItemSliding!==null) //use this if only one active sliding item allowed
         this.closeOption(item);
     
        this.activeItemSliding = itemSlide;
        this.activeItem = item;
        
        this.class = true;
        let swipeAmount = 173; //set your required swipe amount
        itemSlide.startSliding(swipeAmount);
        itemSlide.moveSliding(swipeAmount);
     
        itemSlide.setElementClass('active-options-right', true);
        itemSlide.setElementClass('active-swipe-right', true);
     
        item.setElementStyle('width', '100%');
        item.setElementStyle('opacity', '0.3');   
        item.setElementStyle('background', '#8e8d8d'); 
        //item.setElementStyle('transform', 'translate3d(-'+swipeAmount+'px, 0px, 0px)');
       }
     
       closeOption(item: Button) {
      
     
        if(this.activeItemSliding) {
            this.class = false;
            this.activeItem.setElementStyle('opacity', 'initial');
            item.setElementStyle('background', 'initial'); 
         this.activeItemSliding.close();
         this.activeItemSliding = null;
        }
       }

       presentImage(myImage) {
           event.preventDefault();
         event.stopPropagation();
        // const imageViewer = this.imageViewerCtrl.create(ImageViewerPage);
        // imageViewer.present();

        let popoverSignup = this.popovercontroller.create(ImageViewerPage, { img: myImage.src});
			popoverSignup.present();
			popoverSignup.onDidDismiss(data => {

				// this.elementPool(false);

			});
     
      }


      onclickBlock(cus){
        const alertControl = this.alerCtrl.create({
            message : 'Are You sure you want to block ?',
            buttons : [{
                text : 'Cancel',
                role : 'Cancel'
            },{
                text: 'Yes',
                handler : ()=>{
                    cus.blocked = "true";
                    if(this.activeItemSliding) {
                        this.activeItem.setElementStyle('width', '100%');
                     this.activeItemSliding.close();
                     this.activeItemSliding = null;
                    }
                }
            }]
        });
        alertControl.present();
      }
      deleteChat(cus, index){
        const alertControl = this.alerCtrl.create({
            message : 'Are You sure you want to Delete this Chat ?',
            buttons : [{
                text : 'Cancel',
                role : 'Cancel'
            },{
                text: 'Yes',
                handler : ()=>{
                    this.currentItems.splice(index , 1);

                    if(this.activeItemSliding) {
                        this.activeItem.setElementStyle('width', '100%');
                     this.activeItemSliding.close();
                     this.activeItemSliding = null;
                    }
                }
            }]
        });
        alertControl.present();
      }

   

    openItem(item){
        this.navCtrl.push(PrivateChatPage, { item: item });
    }
 
    ionViewWillEnter() {
       
    }
    ionViewWillUnload() {
    }

}
