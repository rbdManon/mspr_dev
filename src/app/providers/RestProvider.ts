import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class RestProvider {
    public constructor(
        protected HttpClient: HttpClient,
    ) {}

    public get(url: string) {
        return this.HttpClient.get(url).toPromise()
    }

    public post(url: string, elem) {
        return this.HttpClient.post(url, elem).toPromise()
    }

    public patch(url: string, elem) {
        return this.HttpClient.patch(url, elem).toPromise()
    }
}
