import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { Realtime, TextMessage } from 'leancloud-realtime';
import { TypedMessagesPlugin } from 'leancloud-realtime-plugin-typed-messages';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { ChatService } from '../../providers/chat-service';

@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class Chat {
    APP_ID = 'QQdjhY28We5l3D2S9yTCqrK2-gzGzoHsz';
    APP_KEY = 'Ma3TcoycEMGwiPG2LYX5o1Eg';
    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: TextInput;
    msgList = [];
    user;
    toUser;
    editorMsg = '';
    showEmojiPicker = false;

    realtime;
    //存储聊天记录到本地
    //chatStorage = []

    ionViewCanEnter() {
        if (this.navParams.get('toUser') && this.navParams.get('toUser').id) {
            return true;
        } else {
            return false;
        }
    }

    ionViewWillEnter() {
        //获取缓存数据
        this.storage.get('user').then(user => {
            this.user = user;
            this.storage.get('chatStorage').then((chatStorage) => {
                console.log('chat---加载聊天记录-->', chatStorage);
                for (let i = 0; i < chatStorage.length; i++) {
                    if (chatStorage[i].userId === user.id) {
                        for (let j = 0; j < chatStorage[i].info.length; j++) {
                            if (chatStorage[i].info[j].toUser.id === this.toUser.id) {
                                for (let k = 0; k < chatStorage[i].info[j].record.length; k++) {
                                    this.msgList.push({
                                        userName: chatStorage[i].info[j].record[k].userId,
                                        message: chatStorage[i].info[j].record[k].msg,
                                        messageId: Date.now().toString(),
                                        userId: chatStorage[i].info[j].record[k].userId
                                    })
                                }
                            }
                        }
                    }
                }
            })
        })
    }

    constructor(public navParams: NavParams,
        public chatService: ChatService,
        public events: Events,
        public storage: Storage,
        public navCtrl: NavController
    ) {
        this.toUser = navParams.get('toUser');

        //this.user = navParams.get('user');
        // 初始化实时通讯 SDK
        this.realtime = new Realtime({
            appId: this.APP_ID,
            plugins: [TypedMessagesPlugin], // 注册富媒体消息插件
            pushOfflineMessages: true,
        });

        this.storage.get('user').then(user => {
            this.user = user;
            this.realtime.createIMClient(this.user.id.toString()).then((Jerry) => {
                Jerry.on('message', (message, conversation) => {
                    this.msgList.push({
                        userName: message.from,
                        message: message.text,
                        messageId: Date.now().toString(),
                        userId: message.from,
                    })
                    conversation.on('message', function () {
                        console.log('未读消息监听-chat-当前聊天消息标记已读-->');
                        conversation.read().catch(console.error.bind(console));
                    })
                });
                Jerry.on('unreadmessagescountupdate', function (conversations) {
                    for (let conv of conversations) {
                        console.log('未读消息监听-chat->', conv.id, conv.name, conv.unreadMessagesCount);
                    }
                });
            }).catch(console.error);
        });
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
        let newMsg = {
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
            this.chatService.storeChat(newMsg);
        }).catch(console.error);
    }
    /**
     * @name pushNewMsg
     * @param msg
     */
    pushNewMsg(msg) {
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
