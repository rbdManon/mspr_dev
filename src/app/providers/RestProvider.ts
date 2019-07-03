import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reject } from 'q';
import LocalStorage from '../utils/LocalStorage';

@Injectable({
    providedIn: 'root'
})
export class RestProvider {
    public constructor(
        protected HttpClient: HttpClient,
    ) { }

    public get(url: string) {
        return new Promise((resolve, reject) => {
            this.HttpClient.get(url).toPromise()
            .then(res => {
                LocalStorage.set(url, res)
                resolve(res)
            })
            .catch(err => {
                let db_stored = LocalStorage.get(url)
                if(db_stored !== null) {
                    resolve(db_stored)
                }
                else {
                    reject(err)
                }
            })
        })
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
