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
import { createContractService } from './createContract.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-createcontract',
  templateUrl: './createContract.component.html',
  styleUrls: ['./createContract.component.css'],
  providers: [createContractService]
})
export class createContractComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  contractID = new FormControl('', Validators.required);
  medicineID = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  completionstatus = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  seller = new FormControl('', Validators.required);
  buyer = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private servicecreateContract: createContractService, fb: FormBuilder) {
    this.myForm = fb.group({
      contractID: this.contractID,
      medicineID: this.medicineID,
      quantity: this.quantity,
      status: this.status,
      completionstatus: this.completionstatus,
      price: this.price,
      seller: this.seller,
      buyer: this.buyer,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicecreateContract.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.example.mynetwork.createContract',
      'contractID': this.contractID.value,
      'medicineID': this.medicineID.value,
      'quantity': this.quantity.value,
      'status': this.status.value,
      'completionstatus': this.completionstatus.value,
      'price': this.price.value,
      'seller': this.seller.value,
      'buyer': this.buyer.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'contractID': null,
      'medicineID': null,
      'quantity': null,
      'status': null,
      'completionstatus': null,
      'price': null,
      'seller': null,
      'buyer': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.servicecreateContract.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'contractID': null,
        'medicineID': null,
        'quantity': null,
        'status': null,
        'completionstatus': null,
        'price': null,
        'seller': null,
        'buyer': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.example.mynetwork.createContract',
      'contractID': this.contractID.value,
      'medicineID': this.medicineID.value,
      'quantity': this.quantity.value,
      'status': this.status.value,
      'completionstatus': this.completionstatus.value,
      'price': this.price.value,
      'seller': this.seller.value,
      'buyer': this.buyer.value,
      'timestamp': this.timestamp.value
    };

    return this.servicecreateContract.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.servicecreateContract.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.servicecreateContract.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'contractID': null,
        'medicineID': null,
        'quantity': null,
        'status': null,
        'completionstatus': null,
        'price': null,
        'seller': null,
        'buyer': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.contractID) {
        formObject.contractID = result.contractID;
      } else {
        formObject.contractID = null;
      }

      if (result.medicineID) {
        formObject.medicineID = result.medicineID;
      } else {
        formObject.medicineID = null;
      }

      if (result.quantity) {
        formObject.quantity = result.quantity;
      } else {
        formObject.quantity = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.completionstatus) {
        formObject.completionstatus = result.completionstatus;
      } else {
        formObject.completionstatus = null;
      }

      if (result.price) {
        formObject.price = result.price;
      } else {
        formObject.price = null;
      }

      if (result.seller) {
        formObject.seller = result.seller;
      } else {
        formObject.seller = null;
      }

      if (result.buyer) {
        formObject.buyer = result.buyer;
      } else {
        formObject.buyer = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'contractID': null,
      'medicineID': null,
      'quantity': null,
      'status': null,
      'completionstatus': null,
      'price': null,
      'seller': null,
      'buyer': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
