import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

export class ChatMessage {
    messageId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    toUserId: string;
    time: number | string;
    message: string;
    status: string;
}

export class UserInfo {
    id: string;
    name?: string;
    avatar?: string;
}

@Injectable()
export class ChatService {
    HttpUrl = "http://localhost:8000";

    constructor(public http: Http, public storage: Storage,
        public events: Events) {
    }

    mockNewMsg(msg) {
        const mockMsg: ChatMessage = {
            messageId: Date.now().toString(),
            userId: '210000198410281948',
            userName: 'Hancock',
            userAvatar: './assets/to-user.jpg',
            toUserId: '140000198202211138',
            time: Date.now(),
            message: msg.message,
            status: 'success'
        };

        setTimeout(() => {
            this.events.publish('chat:received', mockMsg, Date.now())
        }, Math.random() * 1800)
    }

    ask(id): Observable<any> {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', id);
        return this.http.post(this.HttpUrl + '/find/user', urlSearchParams)
            .map(this.extractData)
            .catch(this.handleError);
    }
    sendMsg(msg: ChatMessage) {
        return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
            .then(() => this.mockNewMsg(msg));
    }

    extractData(res: Response) {
        return res.text() ? res.json() : {};
    }

    handleError(error: Response | any) {
        return Observable.throw(error);
    }
    //存储用户发送的消息记录
    storeChat(newMsg) {
        //该登录用户是否有聊天记录
        let userNotExist = true;
        //是否和该用户有聊天记录
        let toUserNotExist = true;
        console.log(newMsg.message + 'newMg')
        //获取缓存数据
        console.log('chat--send--聊天发送消息------>', newMsg)
        this.storage.get('chatStorage').then((chatStorage) => {
            console.log(chatStorage)
            for (let i = 0; i < chatStorage.length; i++) {
                //判断是否有该登录用户的记录
                if (chatStorage[i].userId === newMsg.userId) {
                    console.log('user-record-exist----》', newMsg)
                    //判断是否有和该用户的聊天记录
                    for (let j = 0; j < chatStorage[i].info.length; j++) {
                        if (chatStorage[i].info[j].toUser.id === newMsg.toUserId) {
                            console.log('touser-record-exist----》', newMsg)
                            chatStorage[i].info[j].record.push({
                                userId: newMsg.userId,
                                msg: newMsg.message
                            })
                            toUserNotExist = false;
                        }
                    }
                    if (toUserNotExist) {
                        console.log('touser-record-notexist----》', newMsg)
                        chatStorage[i].info.push({
                            toUser: { id: newMsg.toUserId, name: '', head: '' },
                            record: [{ userId: newMsg.userId, msg: newMsg.message }]
                        })

                    }
                    userNotExist = false;
                }
            }
            //没有该登录用户的聊天记录
            if (userNotExist) {
                console.log('user-record-notexist----》', newMsg)
                chatStorage.push({
                    userId: newMsg.userId,
                    info: [{ toUser: { id: newMsg.toUserId, name: '', head: '' }, record: [{ userId: newMsg.userId, msg: newMsg.message }] }]
                })
            }
            this.storage.set('chatStorage', chatStorage);
            console.log('chat--send--chatStorage---存储聊天缓存--->', chatStorage)
            
        });
    }
     //存储用户发送接收到的消息
     storeChatRec(newMsg) {
        //该登录用户是否有聊天记录
        let userNotExist = true;
        //是否和该用户有聊天记录
        let toUserNotExist = true;
        console.log(newMsg.message + 'newMg')
        //获取缓存数据
        console.log('chat--rec--聊天消息接收------>', newMsg)
        this.storage.get('chatStorage').then((chatStorage) => {
            console.log(chatStorage)
            for (let i = 0; i < chatStorage.length; i++) {
                //判断是否有该登录用户的记录
                if (chatStorage[i].userId === newMsg.userId) {
                    console.log('user-record-exist----》', newMsg)
                    //判断是否有和该用户的聊天记录
                    for (let j = 0; j < chatStorage[i].info.length; j++) {
                        if (chatStorage[i].info[j].toUser.id === newMsg.toUserId) {
                            console.log('touser-record-exist----》', newMsg)
                            chatStorage[i].info[j].record.push({
                                userId: newMsg.toUserId,
                                msg: newMsg.message
                            })
                            toUserNotExist = false;
                        }
                    }
                    if (toUserNotExist) {
                        console.log('touser-record-notexist----》', newMsg)
                        chatStorage[i].info.push({
                            toUser: { id: newMsg.toUserId, name: '', head: '' },
                            record: [{ userId: newMsg.toUserId, msg: newMsg.message }]
                        })

                    }
                    userNotExist = false;
                }
            }
            //没有该登录用户的聊天记录
            if (userNotExist) {
                console.log('user-record-notexist----》', newMsg)
                chatStorage.push({
                    userId: newMsg.userId,
                    info: [{ toUser: { id: newMsg.toUserId, name: '', head: '' }, record: [{ userId: newMsg.toUserId, msg: newMsg.message }] }]
                })
            }
            this.storage.set('chatStorage', chatStorage);
            console.log('chat--rec--chatStorage---存储聊天缓存--->', chatStorage)
            
        });
    }
}
