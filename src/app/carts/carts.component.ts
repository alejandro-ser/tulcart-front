import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { FormControl } from '@angular/forms';
import { Cart } from '../service/cart';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {

	status: FormControl = new FormControl('')
	carts:  Cart[] = []
	products: []
	id = ''

	constructor(public _cartService: CartService) { }

	ngOnInit(): void {
		this.getCart('1')
		//this.getCarts()
	}

  	getCarts(){
		this._cartService.getCarts().subscribe( response => {
			return this.carts = response
		})
	}
	
	addCart():void {
		let status = this.status.value;
	   	if(this.id === ''){
		  	this._cartService.addCart(status).subscribe(() => { 
				this.getCarts()
				this.status.setValue("")
			})
	   	} else{
			this._cartService.updateProduct(this.id, status)
		   	.subscribe(() => { 
				this.getCarts()
				this.id=''
				this.status.setValue("")
			})
		}
	}
	
	deleteCart(id:string):void {
		this._cartService.deleteCart(id).subscribe( res => {
			console.log(res)
			this.getCarts()  
		});
	}
	
	getCart(id:string):void {
		this._cartService.getCart(id).subscribe(response => {
			console.log(response.products)
			this.status.setValue(response.status)
			this.id = response.id
			this.products = response.products
		})
	}

}
