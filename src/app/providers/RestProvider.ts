import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reject } from 'q';

@Injectable({
    providedIn: 'root'
})
export class RestProvider {
    public constructor(
        protected HttpClient: HttpClient,
    ) { }

    public get(url: string) {
        return this.HttpClient.get(url).toPromise()
    }

    public post(url: string, elem) {
        return this.HttpClient.post(url, elem).toPromise()
    }

    public patch(url: string, elem) {
        return this.HttpClient.patch(url, elem).toPromise()
    }

    public delete(url: string) {
        return new Promise((resolve, rejec) => {
            this.HttpClient.delete(url, { observe: 'response' }).subscribe(
                res => {
                    if(res.status == 204) {
                        resolve(true)
                    }
                    else {
                        reject()
                    }
                },
                err => reject,
            )
        })
    }
}
