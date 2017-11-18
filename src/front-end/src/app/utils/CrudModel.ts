import Config from './config';
import axios from 'axios';
import { AxiosError } from 'axios';

interface IRequest {
    url: string;
    method: string;
    data: {[key: string]: any};
    params: any;
}

class CrudModel {
    public constructor() {
        this._configureAxios();
    }

    public request = (url: string,
                      method: string = 'GET',
                      data: any = {},
                      params: any = {},
                      saveRequest: boolean = true) => {
        return new Promise((resolve, reject) => {
            axios.request({ url, method, data, params })
                .then(response => {
                    resolve(response.data ? response.data : {});
                })
                .catch(error => this.checkErrorStatus(error, resolve, reject));
        });
    };

    private checkErrorStatus =
        (error: AxiosError, resolve: (param: any) => void, reject: (error: AxiosError) => void) => {
            console.dir(error.response);
            switch (error.response.status) {
                case 204: resolve(null); break;
                case 401:
                case 403:
                case 404:
                case 400: reject(error); break;
                default: reject(error);
            }
        };

    private _configureAxios = () => {
        axios.defaults.baseURL = Config.apiUrl();
        axios.defaults.headers = {
            'Accept':                 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Content-Type':           'application/json'
        };

        axios.defaults.responseType = 'json';
    };
}

const crudModel: CrudModel = new CrudModel();
export default crudModel;
