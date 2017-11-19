import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";
import { Realtime, TextMessage } from 'leancloud-realtime';
import { TypedMessagesPlugin } from 'leancloud-realtime-plugin-typed-messages';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular/navigation/nav-controller';

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
    //存储聊天记录到本地
    chatStorage = []

    ionViewCanEnter() {
        if (this.navParams.get('toUser') && this.navParams.get('toUser').id) {
            return true;
        } else {
            return false;
        }
    }

    ionViewDidLoad() {
        //获取缓存数据
        this.storage.get('user').then(user => {
            this.user = user;
            this.realtime.createIMClient(this.user.id.toString()).then((Jerry) => {
                Jerry.on('message', (message, conversation) => {
                    console.log('Message received: ', message);
                    this.msgList.push({
                        userName: message.from,
                        message: message.text,
                        messageId: Date.now().toString(),
                        userId: message.from,
                    })
                    this.chatStorage.push({
                        userId: this.user.id,
                        toUser: this.toUser.id,
                        name: '',
                        head: '',
                        record: message.text
                    })
                });
            }).catch(console.error);
            
            //this.storeChat(this.msgList);
            //this.storage.get('chatStorage').then((chatStorage) => {
                //let userNotExist = true;
                //for (let i = 0; i < chatStorage.length; i++) {
                    //判断是否有该用户的记录
                    // if (chatStorage[i].userId === this.user.id) {
                    //     chatStorage[i].info.push({
                    //         toUser: { id: this.toUser.id, name: this.toUser.name, head: '' },
                    //         record: this.editorMsg
                    //     })
                    //     userNotExist = false;
                    // }
                //}
                // if (userNotExist) {
                //     console.log('not exist----》', this.toUser)
                //     this.chatStorage.push({
                //         userId: this.user.id,
                //         info: [{ toUser: { id: this.toUser.id, name: this.toUser.name, head: '' }, record: [this.editorMsg] }]
                //     })
                // }
                this.storage.get('chatStorage').then((chatStorage) => {
                    for (let i = 0; i < chatStorage.length; i++) {
                   
                            console.log(chatStorage[i].userId + "///////rece/////" + chatStorage[i].record);
                        
                    }
                //});
                this.storage.set('chatStorage', this.chatStorage);
            });
        })
    }
    constructor(public navParams: NavParams,
        public chatService: ChatService,
        public events: Events,
        public storage: Storage,
        public navCtrl: NavController
    ) {
        // Get the navParams toUserId parameter
        this.toUser = navParams.get('toUser');
        // 初始化实时通讯 SDK
        this.realtime = new Realtime({
            appId: 'tfaMh3UmNXSphGOeLMjFYfmi-gzGzoHsz',
            plugins: [TypedMessagesPlugin], // 注册富媒体消息插件
        });
        //this.ionViewDidLoad();

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
        this.realtime.createIMClient(this.user.id.toString()).then((tom) => {
            // 创建与Jerry之间的对话
            return tom.createConversation({
                members: [this.toUser.id.toString()],
                name: 'Tom & Jerry',
            });
        }).then((conversation) => {
            // 发送消息
            //console.log('editorMsg', this.editorMsg)
            return conversation.send(new TextMessage(this.editorMsg));
        }).then((message) => {
            console.log('lqh & wh', '发送成功！');
            this.editorMsg = '';
            this.storeChat(newMsg);
        }).catch(console.error);
    }

    storeChat(newMsg) {
        let userNotExist = true;
        console.log(newMsg.message + 'newMg')
        //获取缓存数据
        //this.storage.get('chatStorage').then((chatStorage) => {

        //for (let i = 0; i < chatStorage.length; i++) {
        //判断是否有该用户的记录
        //if (chatStorage[i].userId === this.user.id) {
        // chatStorage[i].info.push({
        //     toUser: { id: this.toUser.id, name: '', head: '' },
        //     record: newMsg.message
        // })
        // userNotExist = false;
        //}
        //}
        if (userNotExist) {
            this.chatStorage.push({
                userId: this.user.id,
                toUser: this.toUser.id,
                name: '',
                head: '',
                record: newMsg.message
            })
        }
        //});
        this.storage.set('chatStorage', this.chatStorage);
        this.storage.get('chatStorage').then((chatStorage) => {
            for (let i = 0; i < chatStorage.length; i++) {
                    console.log(chatStorage[i].userId + "///////send/////" + chatStorage[i].record);
            }
        });
        
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
}
