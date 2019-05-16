import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class ApiProvider<E> {
    private api_endpoint: string = "http://localhost:8080/";
    protected table_name: string = null;

    public constructor(
        private HttpClient: HttpClient,
    ) {}

    public getAll() : Promise<E[]> {
        return this.HttpClient.get(this.api_endpoint + this.get_table_name()).toPromise()
        .then((res : E[]) => {
            return res['_embedded'][this.get_table_name()];
        })
    }

    public getOne(uuid: string) : Promise<E> {
        return this.HttpClient.get(this.api_endpoint + this.get_table_name() + "/" + uuid).toPromise().then((res : E) => {
            return res;
        })
    }

    private get_table_name() : String {
        if(this.table_name === null) {
            throw "Table name is null!"
        }

        return this.table_name;
    }
}
