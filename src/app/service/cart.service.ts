import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Cart } from './cart';

@Injectable({
  	providedIn: 'root'
})

export class CartService {
  
	URL = "http://localhost/tulcart-api/public/api/carts";
	
	constructor(private _http :HttpClient) { }

	getCarts(): Observable<Cart[]> {
        return this._http.get<Cart[]>(this.URL);
	}
	
	addCart(status:string): Observable<any>{
        let obj = new FormData()
        obj.append("status", status)
        return this._http.post(this.URL, obj )
    }

    deleteCart(id:string):Observable<any>{
        return this._http.delete(this.URL+'/'+id)
    }

    getCart(id:string):Observable<Cart>{
        return this._http.get<Cart>(this.URL+'/'+id)
    }

    updateProduct(id:string, status:string){
        let obj = new FormData()
        obj.append("id" ,id)
        obj.append("status",status)
        return this._http.post(this.URL+'/update', obj)
    }
}
