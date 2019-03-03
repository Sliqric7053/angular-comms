import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  //   listFilter: string; // remove as we use get/set
  showImage: boolean;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  filteredProducts: IProduct[];
  products: IProduct[];

  private _listFilter: string;
  // getter works with {{ bound values only}} in the template
  get listFilter(): string {
    return this._listFilter;
  }

  // setter works with {{ bound values only}} in the template
  set listFilter(value: string) {
    this._listFilter = value;
    this.performFilter(this.listFilter);
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.performFilter(this.listFilter);
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(
        (product: IProduct) =>
          product.productName
            .toLocaleLowerCase()
            .indexOf(filterBy.toLocaleLowerCase()) !== -1
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  //   onFilterChange(searchText: string): void {
  //     this.listFilter = searchText;
  //     if (searchText) {
  //       this.filteredProducts = this.products.filter(product => {
  //         return product.productName
  //           .toLocaleLowerCase()
  //           .includes(searchText.toLocaleLowerCase());
  //       });
  //     } else {
  //       this.filteredProducts = this.products;
  //     }
  //   }
}
