import { Injectable } from '@angular/core';
import { RestProvider } from './RestProvider';

@Injectable({
    providedIn: 'root'
})
export class ApiProvider<E> {
    protected api_endpoint: string = "http://localhost:8001/";
    protected table_name: string = null;

    public constructor(
        protected RestProvider: RestProvider,
    ) { }

    public getAll(): Promise<E[]> {
        return this.RestProvider.get(this.api_endpoint + this.get_table_name())
            .then((res: any[]) => {
                let json = res['_embedded'][this.get_table_name()];
                return this.map_array_objects(json);
            })
    }

    public getAllByRessourceUri(uri: string): Promise<E[]> {
        return this.RestProvider.get(uri)
            .then((res: any[]) => {
                let json = res['_embedded'][this.get_table_name()];
                return this.map_array_objects(json);
            })
    }

    public getOne(uuid: string): Promise<E> {
        return this.RestProvider.get(this.api_endpoint + this.get_table_name() + "/" + uuid)
            .then((res: E) => {
                return this.map_object(res);
            })
    }

    public getOneByRessourceUri(uri: string): Promise<E> {
        return this.RestProvider.get(uri)
            .then((res: E) => {
                return this.map_object(res);
            })
    }

    public create(elem: E): Promise<E> {
        return this.RestProvider.post(this.api_endpoint + this.get_table_name(), elem)
            .then((res: E) => {
                return this.map_object(res);
            });
    }

    public delete(elem: E): Promise<E> {
        if (typeof elem['uuid'] == 'undefined') {
            throw "Can't delete ! Missing uuid field !"
        }
        else {
            return this.RestProvider.delete(this.api_endpoint + this.get_table_name() + "/" + elem['uuid'])
                .then((res: E) => {
                    return this.map_object(res);
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
                    return this.map_object(res);
                });

        }
    }

    public save(elem: E): Promise<E> {
        if (typeof elem['uuid'] == 'undefined') {
            return this.create(elem)
        }
        else {
            return this.update(elem)
        }
    }

    protected get_table_name(): String {
        if (this.table_name === null) {
            throw "Table name is null!"
        }

        return this.table_name;
    }

    protected get_empty_object() : E {
        throw "Method get_empty_object should be overrided !"
    }

    protected map_object(json): E {
        let object: E = this.get_empty_object();

        Object.keys(json).forEach(key => {
            object[key] = json[key];
        })

        return object;
    }

    protected map_array_objects(json: []) : E[] {
        let array : E[] = [];

        json.forEach(elem => {
            array.push(this.map_object(elem));
        })

        return array;
    }
}
