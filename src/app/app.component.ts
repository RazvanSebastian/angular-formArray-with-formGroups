import { Component, OnInit, VERSION } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

interface Product {
  productId: number;
  quantity: number;
  name: string;
  isFastShipping: boolean;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public mockData = [
    { name: 'name1', productId: 100, quantity: 1, isFastShipping: true },
    { name: 'name2', productId: 10, quantity: 5, isFastShipping: false },
    { name: 'name3', productId: 25, quantity: 6, isFastShipping: true },
    { name: 'name4', productId: 66, quantity: 10, isFastShipping: false },
  ] as Product[];
  private _cartControlGroups: FormArray;

  constructor() {
    this._cartControlGroups = new FormArray([] as FormGroup[]);
  }

  ngOnInit(): void {
    this.mockData.forEach((data) =>
      this._cartControlGroups.push(
        new FormGroup({
          productId: new FormControl(data.productId),
          name: new FormControl(data.name),
          quantity: new FormControl(data.quantity, [
            Validators.min(1),
            Validators.max(10),
          ]),
          isFashShipping: new FormControl(data.isFastShipping),
        })
      )
    );
    console.log(
      (this._cartControlGroups.controls[0] as FormGroup).get('name').value
    );
  }

  get cartControlGroups(): FormGroup[] {
    return this._cartControlGroups.controls as FormGroup[];
  }

  onDeleteCartControl(index: number) {
    window.alert(`Delete item with id ${this.mockData[index].productId}`);
  }

  isCartControlGrupsValid() {
    return this._cartControlGroups.status === 'VALID';
  }

  onCartSubmit() {
    this.cartControlGroups.forEach((productFormGroup) => {
      console.log(productFormGroup.value as Product);
    });
  }

  name = 'Angular ' + VERSION.major;
}
