import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavParams,NavController } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";
import { ChatPage } from '../chat';
@Component({
  selector: 'private-chat',
  templateUrl: 'privatechat.html'
})
export class PrivateChatPage {

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  pushPage = ChatPage;
  msgList :any[]= [
    {
      "messageId":"1",
      "userId":"140000198202211138",
      "userName":"Luff",
      "userImgUrl":"../../assets/imgs/beaches/beach1.png",
      "toUserId":"210000198410281948",
      "toUserName":"Hancock",
      "userAvatar":"../../assets/imgs/beaches/beach2.png",
      "time":1488349800000,
      "message":"A good programmer is someone who always looks both ways before crossing a one-way street. ",
      "status":"success"

    },
    {
      "messageId":"2",
      "userId":"210000198410281948",
      "userName":"Hancock",
      "userImgUrl":"../../assets/imgs/beaches/beach2.png",
      "toUserId":"140000198202211138",
      "toUserName":"Luff",
      "userAvatar":"../../assets/imgs/beaches/beach1.png",
      "time":1491034800000,
      "message":"Don’t worry if it doesn't work right. If everything did, you’d be out of a job.",
      "status":"success"
    },
    {
      "messageId":"3",
      "userId":"140000198202211138",
      "userName":"Luff",
      "userImgUrl":"../../assets/imgs/beaches/beach1.png",
      "toUserId":"210000198410281948",
      "toUserName":"Hancock",
      "userAvatar":"../../assets/imgs/beaches/beach2.png",
      "time":1491034920000,
      "message":"Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris.",
      "status":"success"
    },
    {
      "messageId":"4",
      "userId":"210000198410281948",
      "userName":"Hancock",
      "userImgUrl":"../../assets/imgs/beaches/beach2.png",
      "toUserId":"140000198202211138",
      "toUserName":"Luff",
      "userAvatar":"../../assets/imgs/beaches/beach1.png",
      "time":1491036720000,
      "message":"One man’s crappy software is another man’s full time job.",
      "status":"success"
    },
    {
      "messageId":"5",
      "userId":"210000198410281948",
      "userName":"Hancock",
      "userImgUrl":"../../assets/imgs/beaches/beach2.png",
      "toUserId":"140000198202211138",
      "toUserName":"Luff",
      "userAvatar":"../../assets/imgs/beaches/beach1.png",
      "time":1491108720000,
      "message":"Programming is 10% science, 20% ingenuity, and 70% getting the ingenuity to work with the science.",
      "status":"success"
    },
    {
      "messageId":"6",
      "userId":"140000198202211138",
      "userName":"Luff",
      "userImgUrl":"../../assets/imgs/beaches/beach1.png",
      "toUserId":"210000198410281948",
      "toUserName":"Hancock",
      "userAvatar":"../../assets/imgs/beaches/beach2.png",
      "time":1491231120000,
      "message":"If at first you don’t succeed, call it version 1.0",
      "status":"success"
    },
    {
      "messageId":"7",
      "userId":"140000198202211138",
      "userName":"Luff",
      "userImgUrl":"../../assets/imgs/beaches/beach1.png",
      "toUserId":"210000198410281948",
      "toUserName":"Hancock",
      "userAvatar":"../../assets/imgs/beaches/beach2.png",
      "time":1491231150000,
      "message":"The <textarea> tag defines a multi-line text input control.\nA text area can hold an unlimited number of characters, and the text renders in a fixed-width font (usually Courier).\nThe size of a text area can be specified by the cols and rows attributes, or even better; through CSS' height and width properties.",
      "status":"success"
    }];
  user: any=[];
  toUser:  any=[];
  editorMsg = '';
  showEmojiPicker = false;
  

  constructor(navParams: NavParams,
              private chatService: ChatService,
              private events: Events,
              private navCtrl: NavController,) {
    // Get the navParams toUserId parameter
    //navParams = navParams.data.item;
    this.toUser = {
      id: '210000198410281948',
      name: 'Hancock'
    };

    this.chatService.getUserInfo()
    .then((res) => {
      this.user = res
    });
  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received');
  }

  ionViewDidEnter() {
    //get message list
    this.getMsg();

  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  /**
   * @name getMsg
   */
  getMsg() {
    return this.chatService
    .getMsgList()
    .subscribe(res => {
      this.msgList = res;
      this.scrollToBottom();
    });
  }

  /**
   * @name sendMsg
   */
  sendMsg() {
    if (!this.editorMsg.trim()) return;

    // Mock message
    const id = Date.now().toString();
    let newMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: this.user.id,
      userName: this.user.name,
      userAvatar: this.user.avatar,
      toUserId: this.toUser.id,
      time: Date.now(),
      message: this.editorMsg,
      status: 'pending'
    };

    this.pushNewMsg(newMsg);
    this.editorMsg = '';

    if (!this.showEmojiPicker) {
      this.focus();
    }

    // this.chatService.sendMsg(newMsg)
    // .then(() => {
    //   let index = this.getMsgIndexById(id);
    //   if (index !== -1) {
    //     this.msgList[index].status = 'success';
    //   }
    // })
  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: ChatMessage) {
    const userId = this.user.id,
      toUserId = this.toUser.id;
    // Verify user relationships
    if (msg.userId === userId && msg.toUserId === toUserId) {
      this.msgList.push(msg);
    } else if (msg.toUserId === userId && msg.userId === toUserId) {
      this.msgList.push(msg);
    }
    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea =this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }
}
