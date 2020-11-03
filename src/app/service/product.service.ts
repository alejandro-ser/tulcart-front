import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    URL = "http://localhost/tulcart-api/public/api/products";
    constructor(private _http :HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this._http.get<Product[]>(this.URL);
    }

    addProduct(name:string, sku:string, description:string): Observable<any>{
        let obj = new FormData()
        obj.append("name",name)
        obj.append("sku", sku)
        obj.append("description", description)
        return this._http.post(this.URL, obj )
    }

    deleteProduct(id:string):Observable<any>{
        return this._http.delete(this.URL+'/'+id)
    }

    getProduct(id:string):Observable<Product>{
        return this._http.get<Product>(this.URL+'/'+id)
    }

    updateProduct(id:string, name:string, sku:string, description:string){
        let obj = new FormData()
        obj.append("id" ,id)
        obj.append("name",name)
        obj.append("sku", sku)
        obj.append("description", description)
        return this._http.post(this.URL+'/update', obj)
    }
}
