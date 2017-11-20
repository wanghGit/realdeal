import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProblemService {
    HttpUrl = "http://localhost:8000";
    constructor(
        private http: Http,
    ) { }

    getAllProblemType(): Observable<any> {
        const urlSearchParams = new URLSearchParams();
        return this.http.post(this.HttpUrl + '/problem/getAllProblemType', urlSearchParams)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAllProblem(): Observable<any> {
        const urlSearchParams = new URLSearchParams();
        return this.http.post(this.HttpUrl + '/problem/getAllProblem', urlSearchParams)
            .map(this.extractData)
            .catch(this.handleError);
    }

    insert(type, user, problem, labelList) {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('type', type);
        urlSearchParams.append('userID', user.id);
        urlSearchParams.append('title', problem.title);
        urlSearchParams.append('content', problem.content);
        urlSearchParams.append('labelList', labelList);
        return this.http.post(this.HttpUrl + '/problem/insert', urlSearchParams)
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