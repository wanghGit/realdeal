import  {  Injectable  }  from  '@angular/core';
import  {  Http,  Response,  URLSearchParams,  Headers,  RequestOptions  }  from  '@angular/http';
import  'rxjs/add/operator/map';
import  'rxjs/add/operator/catch';
import  {  Observable  }  from  'rxjs/Observable';
import  'rxjs/add/observable/throw';

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
export class HomeService {
  //HttpUrl='http://192.168.1.100:8000'
  HttpUrl = 'http://localhost:8000'
  constructor(public http: Http) {

  }

  ask(id): Observable<any> {
    const urlSearchParams = new URLSearchParams();
    // urlSearchParams.append('content', params.content);
    // urlSearchParams.append('isLogin', isLogin);
    urlSearchParams.append('id', id);
    return this.http.post(this.HttpUrl + '/find/user', urlSearchParams)
      .map(this.extractData)
      .catch(this.handleError);
  }

  extractData(res: Response) {
    return res.text() ? res.json() : {};
  }

  handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
