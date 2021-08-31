import { Component, OnInit, VERSION } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public mockData = [
    { productId: 100, quantity: 1, isFastShipping: true },
    { productId: 10, quantity: 5, isFastShipping: false },
    { productId: 25, quantity: 6, isFastShipping: true },
    { productId: 66, quantity: 10, isFastShipping: false }
  ];
  private _cartControlGroups: FormArray;

  constructor() {
    this._cartControlGroups = new FormArray([] as FormGroup[]);
  }

  ngOnInit(): void {
    this.mockData.forEach(data =>
      this._cartControlGroups.push(
        new FormGroup({
          quantity: new FormControl(data.quantity, [
            Validators.min(1),
            Validators.max(10)
          ]),
          isFashShipping: new FormControl(data.isFastShipping)
        })
      )
    );
    console.log(this._cartControlGroups.controls);
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

  name = 'Angular ' + VERSION.major;
}
