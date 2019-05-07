/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { medicineService } from './medicine.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css'],
  providers: [medicineService]
})
export class medicineComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  medicineID = new FormControl('', Validators.required);
  medicineName = new FormControl('', Validators.required);
  manufactureDate = new FormControl('', Validators.required);
  expiryDate = new FormControl('', Validators.required);
  manufacturer = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  constructor(public servicemedicine: medicineService, fb: FormBuilder) {
    this.myForm = fb.group({
      medicineID: this.medicineID,
      medicineName: this.medicineName,
      manufactureDate: this.manufactureDate,
      expiryDate: this.expiryDate,
      manufacturer: this.manufacturer,
      owner: this.owner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicemedicine.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.mynetwork.medicine',
      'medicineID': this.medicineID.value,
      'medicineName': this.medicineName.value,
      'manufactureDate': this.manufactureDate.value,
      'expiryDate': this.expiryDate.value,
      'manufacturer': this.manufacturer.value,
      'owner': this.owner.value
    };

    this.myForm.setValue({
      'medicineID': null,
      'medicineName': null,
      'manufactureDate': null,
      'expiryDate': null,
      'manufacturer': null,
      'owner': null
    });

    return this.servicemedicine.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'medicineID': null,
        'medicineName': null,
        'manufactureDate': null,
        'expiryDate': null,
        'manufacturer': null,
        'owner': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.mynetwork.medicine',
      'medicineName': this.medicineName.value,
      'manufactureDate': this.manufactureDate.value,
      'expiryDate': this.expiryDate.value,
      'manufacturer': this.manufacturer.value,
      'owner': this.owner.value
    };

    return this.servicemedicine.updateAsset(form.get('medicineID').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.servicemedicine.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicemedicine.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'medicineID': null,
        'medicineName': null,
        'manufactureDate': null,
        'expiryDate': null,
        'manufacturer': null,
        'owner': null
      };

      if (result.medicineID) {
        formObject.medicineID = result.medicineID;
      } else {
        formObject.medicineID = null;
      }

      if (result.medicineName) {
        formObject.medicineName = result.medicineName;
      } else {
        formObject.medicineName = null;
      }

      if (result.manufactureDate) {
        formObject.manufactureDate = result.manufactureDate;
      } else {
        formObject.manufactureDate = null;
      }

      if (result.expiryDate) {
        formObject.expiryDate = result.expiryDate;
      } else {
        formObject.expiryDate = null;
      }

      if (result.manufacturer) {
        formObject.manufacturer = result.manufacturer;
      } else {
        formObject.manufacturer = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'medicineID': null,
      'medicineName': null,
      'manufactureDate': null,
      'expiryDate': null,
      'manufacturer': null,
      'owner': null
      });
  }

}
