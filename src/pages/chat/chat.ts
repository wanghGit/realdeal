import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";
import { Realtime, TextMessage } from 'leancloud-realtime';
import { TypedMessagesPlugin } from 'leancloud-realtime-plugin-typed-messages';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class Chat {

    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: TextInput;
    msgList = [];
    user: UserInfo;
    toUser: UserInfo;
    editorMsg = '';
    showEmojiPicker = false;

    realtime;

    constructor(public navParams: NavParams,
        public chatService: ChatService,
        public events: Events,
        public storage: Storage, ) {
        // Get the navParams toUserId parameter
        this.toUser = navParams.get('toUser');
        this.user = navParams.get('user'),
            // console.log('---->',this.user)
            // console.log('---->',this.toUser)
            // 初始化实时通讯 SDK
            this.realtime = new Realtime({
                appId: 'tfaMh3UmNXSphGOeLMjFYfmi-gzGzoHsz',
                plugins: [TypedMessagesPlugin], // 注册富媒体消息插件
            });
        this.storage.set('user', this.user);
        this.events.publish('user:talk', this.user)
        //this.events.publish('user:login',this.user)
        this.events.subscribe('chatReco', chatStorage => {
            console.log('聊天记录发生变化', chatStorage.length)
            for (let i = 0; i < chatStorage.length; i++) {
                if (chatStorage[i].info.toUser.id === this.toUser.id) {
                    this.msgList.push({
                        userName: chatStorage[i].info.toUser.id,
                        message: chatStorage[i].info.record.msg,
                        messageId: Date.now().toString(),
                        userId: chatStorage[i].info.toUser.id,
                        toUserId: chatStorage[i].user.id,
                    })
                }
            }
        })
        //   this.realtime.createIMClient(this.user.id).then((Jerry) => {
        //     Jerry.on('message', (message, conversation) => {
        //       console.log('Message received: ' , message);
        //       this.msgList.push({
        //         userName: message.from,
        //         message: message.text,
        //         messageId: Date.now().toString(),
        //         userId: message.from,
        //       })
        //       this.storage.get('chatStorage') //
        //     //   [
        //     //       {userId:2,info: [
        //     //           {toUser:{id:1,name:'',head:''},record:[]},
        //     //           {toUserId:3,record:[]}
        //     //         ]
        //     //     },
        //     //         {userId:3,info:[{},{},{}]}
        //     // ]
        //     });
        //   }).catch(console.error);
        //     const a =[{id:2},{id:4},{id:3}]
        //     a.sort((a,b)=>a.id-b.id)

    }

    onFocus() {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    }

    switchEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.messageInput.setFocus();
        }
        this.content.resize();
        this.scrollToBottom();
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
            userName: this.user.id,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: Date.now(),
            message: this.editorMsg,
            status: 'pending'
        };

        this.pushNewMsg(newMsg);

        if (!this.showEmojiPicker) {
            this.messageInput.setFocus();
        }

        this.chatService.sendMsg(newMsg)
            .then(() => {
                let index = this.getMsgIndexById(id);
                if (index !== -1) {
                    this.msgList[index].status = 'success';
                }
            })
        // Tom 用自己的名字作为 clientId，获取 IMClient 对象实例
        this.realtime.createIMClient(this.user.id).then((tom) => {
            // 创建与Jerry之间的对话
            return tom.createConversation({
                members: [this.toUser.id],
                name: 'Tom & Jerry',
            });
        }).then((conversation) => {
            // 发送消息
            //console.log('editorMsg', this.editorMsg)
            return conversation.send(new TextMessage(this.editorMsg));
        }).then((message) => {
            this.editorMsg = '';
            console.log('lqh & wh', '发送成功！');
            //存储聊天记录到本地
            let chatStorage = [];
            chatStorage = [{
                user: { id: this.user.id },
                info: { toUser: { id: this.toUser.id }, record: { msg: this.editorMsg } }

            }];
            this.storage.set('chatStorage', chatStorage);
        }).catch(console.error);


    }

    /**
     * @name pushNewMsg
     * @param msg
     */
    pushNewMsg(msg: ChatMessage) {
        const userId = this.user.id,
            toUserId = this.toUser.id;
        //  console.log('---->>',userId +'//'+ msg.userId)
        // console.log('---->>',toUserId +'//'+ msg.toUserId)
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
}
