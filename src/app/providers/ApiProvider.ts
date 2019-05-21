import { Injectable } from '@angular/core';
import { RestProvider } from './RestProvider';

@Injectable({
    providedIn: 'root'
})
export class ApiProvider<E> {
    protected api_endpoint: string = "http://localhost:8080/";
    protected table_name: string = null;

    public constructor(
        protected RestProvider: RestProvider,
    ) { }

    public getAll(): Promise<E[]> {
        return this.RestProvider.get(this.api_endpoint + this.get_table_name())
            .then((res: any[]) => {
                return res['_embedded'][this.get_table_name()];
            })
    }

    public getAllByRessourceUri(uri: string): Promise<E> {
        return this.RestProvider.get(uri)
            .then((res: any[]) => {
                return res['_embedded'][this.get_table_name()];;
            })
    }

    public getOne(uuid: string): Promise<E> {
        return this.RestProvider.get(this.api_endpoint + this.get_table_name() + "/" + uuid)
            .then((res: E) => {
                return res;
            })
    }

    public getOneByRessourceUri(uri: string): Promise<E> {
        return this.RestProvider.get(uri)
            .then((res: E) => {
                return res;
            })
    }

    public create(elem: E): Promise<E> {
        return this.RestProvider.post(this.api_endpoint + this.get_table_name(), elem)
            .then((res: E) => {
                return res;
            });
    }

    public delete(elem: E): Promise<E> {
        if (typeof elem['uuid'] == 'undefined') {
            throw "Can't delete ! Missing uuid field !"
        }
        else {
            return this.RestProvider.delete(this.api_endpoint + this.get_table_name() + "/" + elem['uuid'])
                .then((res: E) => {
                    return res;
                });
        }
    }

    public update(elem: E): Promise<E> {
        if (typeof elem['uuid'] == 'undefined') {
            throw "Can't update ! Missing uuid field !"
        }
        else {
            return this.RestProvider.patch(this.api_endpoint + this.get_table_name() + "/" + elem['uuid'], elem)
                .then((res: E) => {
                    return res;
                });

        }
    }

    protected get_table_name(): String {
        if (this.table_name === null) {
            throw "Table name is null!"
        }

        return this.table_name;
    }
}
