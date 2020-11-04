import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { FormControl } from '@angular/forms';
import { Product } from '../service/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	name: FormControl = new FormControl('')
	sku: FormControl = new FormControl('')
	description: FormControl = new FormControl('')
	product_id: FormControl = new FormControl('')
	cart_id: FormControl = new FormControl('')
	quantity: FormControl = new FormControl('')
	products:  Product[] = []
	id = ''

	constructor(public _productService: ProductService) { }

  	ngOnInit(): void {
		this.getProducts()
	}
	  
	getProducts(){
		this._productService.getProducts().subscribe( response => {
			return this.products = response
		})
	  }
	
	addProduct():void {
		let name = this.name.value;
		let sku = this.sku.value;
		let description = this.description.value;
	   if(this.id === ''){
		  	this._productService.addProduct(name, sku, description).subscribe(() => { 
				this.getProducts()
				this.name.setValue("")
				this.sku.setValue("")
				this.description.setValue("")
			})
	   	} else{
			this._productService.updateProduct(this.id, name, sku, description)
		   	.subscribe(() => { 
				this.getProducts()
				this.id=''
				this.name.setValue("")
				this.sku.setValue("")
				this.description.setValue("")
			})
		}
	}
	
	deleteProduct(id:string):void {
		this._productService.deleteProduct(id).subscribe( res => {
			console.log(res)
			this.getProducts()  
		});
	}
	
	getProduct(id:string):void {
		this._productService.getProduct(id).subscribe(response => {
			console.log(response)
			this.name.setValue(response.name)
			this.sku.setValue(response.sku)
			this.description.setValue(response.description)
			this.id = response.id
		})
	}

	addProductToCart():void {
		let product_id = this.product_id.value;
		let cart_id = this.cart_id.value;
		let quantity = this.quantity.value;
		this._productService.addProductToCart(product_id, cart_id, quantity).subscribe(() => { 
			this.getProducts()
			this.product_id.setValue("")
			this.cart_id.setValue("")
			this.quantity.setValue("")
		})
	}

}
