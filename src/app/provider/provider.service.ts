import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {eventService} from './eventService';

/*
import {RequestOptions} from "@angular/http/src/base_request_options";
*/


// let apiUrl = 'http://127.0.0.1:8000/api/V1/';          //staging
let apiUrl = 'https://labelblind.com/cms/public/index.php/api/V1/'

@Injectable({
    providedIn: 'root',
})

export class ProviderService {

    constructor(private http: Http,
                private service: eventService
    ) {
    }

    public getLabelBlindScore(hierarchy,pv_string,c_string,sc_string,b_string) {
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptValidateTypes
            var headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8;');
            //noinspection TypeScriptValidateTypes
            let options = new RequestOptions({headers: headers});
            let body = 'hierarchy='+hierarchy + '&pv_string=' + pv_string + '&c_string=' + c_string + '&sc_string=' + sc_string + '&b_string=' + b_string;
            this.http.post(apiUrl + 'getLabelBlindScore', body, options)
                .subscribe(res => {
                    resolve(res.json());
                    // alert(JSON.stringify(res));
                }, (err) => {
                    reject(err);
                    // alert(err);
                });
        });

    }

    
    public getProductFeatures(productfeatures, hierarchy) {
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptValidateTypes
            var headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8;');
            //noinspection TypeScriptValidateTypes
            let options = new RequestOptions({headers: headers});
            let body = 'hierarchy='+hierarchy + '&productfeatures=' + productfeatures;
            this.http.post(apiUrl + 'getProductFeatures', body, options)
                .subscribe(res => {
                    resolve(res.json());
                    // alert(JSON.stringify(res));
                }, (err) => {
                    reject(err);
                    // alert(err);
                });
        });

    }

    public getProductFeaturesList() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers['Access-Control-Allow-Origin'] = '*';
            headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT';
            headers['Content-type'] = 'application/json';
            headers['Accept'] = 'application/json';
            //noinspection TypeScriptValidateTypes
            //  let body = 'lng_id='+language;
            this.http.get(apiUrl + 'getProductFeaturesList', {headers: headers}).subscribe(res => {
                resolve(res.json());
            }, (err) => {
                reject(err);
            });
        });
    }

    public getNutrientList() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers['Access-Control-Allow-Origin'] = '*';
            headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT';
            headers['Content-type'] = 'application/json';
            headers['Accept'] = 'application/json';
            //noinspection TypeScriptValidateTypes
            //  let body = 'lng_id='+language;
            this.http.get(apiUrl + 'getNutrientList', {headers: headers}).subscribe(res => {
                resolve(res.json());
            }, (err) => {
                reject(err);
            });
        });
    }

    public getNutrientScore(hierarchy,nutrient, pv_string,c_string,sc_string,b_string) {
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptValidateTypes
            var headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8;');
            //noinspection TypeScriptValidateTypes
            let options = new RequestOptions({headers: headers});
            let body = 'hierarchy='+hierarchy + '&nutrient='+ nutrient +'&pv_string=' + pv_string + '&c_string=' + c_string + '&sc_string=' + sc_string + '&b_string=' + b_string;
            this.http.post(apiUrl + 'getNutrientScore', body, options)
                .subscribe(res => {
                    resolve(res.json());
                    // alert(JSON.stringify(res));
                }, (err) => {
                    reject(err);
                    // alert(err);
                });
        });

    }

    public getProductVerticals() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers['Access-Control-Allow-Origin'] = '*';
            headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT';
            headers['Content-type'] = 'application/json';
            headers['Accept'] = 'application/json';
            //noinspection TypeScriptValidateTypes
            //  let body = 'lng_id='+language;
            this.http.get(apiUrl + 'getProductVerticals', {headers: headers}).subscribe(res => {
                resolve(res.json());
            }, (err) => {
                reject(err);
            });
        });
    }   

    
    public getCategory(productvertical) {
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptValidateTypes
            var headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8;');
            //noinspection TypeScriptValidateTypes
            let options = new RequestOptions({headers: headers});
            let body = 'productvertical='+productvertical;
            this.http.post(apiUrl + 'getCategory', body, options)
                .subscribe(res => {
                    resolve(res.json());
                    // alert(JSON.stringify(res));
                }, (err) => {
                    reject(err);
                    // alert(err);
                });
        });

    }

    public getSubCategory(category) {
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptValidateTypes
            var headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8;');
            //noinspection TypeScriptValidateTypes
            let options = new RequestOptions({headers: headers});
            let body = 'category='+category;
            this.http.post(apiUrl + 'getSubCategory', body, options)
                .subscribe(res => {
                    resolve(res.json());
                    // alert(JSON.stringify(res));
                }, (err) => {
                    reject(err);
                    // alert(err);
                });
        });

    }
    
    public getBrand(subcategory) {
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptValidateTypes
            var headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8;');
            //noinspection TypeScriptValidateTypes
            let options = new RequestOptions({headers: headers});
            let body = 'subcategory='+subcategory;
            this.http.post(apiUrl + 'getBrand', body, options)
                .subscribe(res => {
                    resolve(res.json());
                    // alert(JSON.stringify(res));
                }, (err) => {
                    reject(err);
                    // alert(err);
                });
        });

    }

    public getLabelBlindScoreBuckets(rowvalue,selectedhierarchy) {
        console.log(rowvalue);
        console.log(selectedhierarchy);
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptValidateTypes
            var headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8;');
            //noinspection TypeScriptValidateTypes
            let options = new RequestOptions({headers: headers});
            let body = 'rowvalue='+encodeURIComponent(rowvalue) + '&selectedhierarchy=' + selectedhierarchy;
            this.http.post(apiUrl + 'getLabelBlindScoreBuckets', body, options)
                .subscribe(res => {
                    resolve(res.json());
                    // alert(JSON.stringify(res));
                }, (err) => {
                    reject(err);
                    // alert(err);
                });
        });

    }

}
