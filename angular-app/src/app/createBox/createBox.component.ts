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
import { createBoxService } from './createBox.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-createbox',
  templateUrl: './createBox.component.html',
  styleUrls: ['./createBox.component.css'],
  providers: [createBoxService]
})
export class createBoxComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  boxId = new FormControl('', Validators.required);
  trackingCode = new FormControl('', Validators.required);
  originAddress = new FormControl('', Validators.required);
  destinationAddress = new FormControl('', Validators.required);
  currentAddress = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  medicineID = new FormControl('', Validators.required);
  quantity = new FormControl('', Validators.required);
  shipment = new FormControl('', Validators.required);
  parentcontract = new FormControl('', Validators.required);
  previousBox = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private servicecreateBox: createBoxService, fb: FormBuilder) {
    this.myForm = fb.group({
      boxId: this.boxId,
      trackingCode: this.trackingCode,
      originAddress: this.originAddress,
      destinationAddress: this.destinationAddress,
      currentAddress: this.currentAddress,
      status: this.status,
      medicineID: this.medicineID,
      quantity: this.quantity,
      shipment: this.shipment,
      parentcontract: this.parentcontract,
      previousBox: this.previousBox,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicecreateBox.getAll()
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
      $class: 'org.example.mynetwork.createBox',
      'boxId': this.boxId.value,
      'trackingCode': this.trackingCode.value,
      'originAddress': this.originAddress.value,
      'destinationAddress': this.destinationAddress.value,
      'currentAddress': this.currentAddress.value,
      'status': this.status.value,
      'medicineID': this.medicineID.value,
      'quantity': this.quantity.value,
      'shipment': this.shipment.value,
      'parentcontract': this.parentcontract.value,
      'previousBox': this.previousBox.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'boxId': null,
      'trackingCode': null,
      'originAddress': null,
      'destinationAddress': null,
      'currentAddress': null,
      'status': null,
      'medicineID': null,
      'quantity': null,
      'shipment': null,
      'parentcontract': null,
      'previousBox': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.servicecreateBox.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'boxId': null,
        'trackingCode': null,
        'originAddress': null,
        'destinationAddress': null,
        'currentAddress': null,
        'status': null,
        'medicineID': null,
        'quantity': null,
        'shipment': null,
        'parentcontract': null,
        'previousBox': null,
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
      $class: 'org.example.mynetwork.createBox',
      'boxId': this.boxId.value,
      'trackingCode': this.trackingCode.value,
      'originAddress': this.originAddress.value,
      'destinationAddress': this.destinationAddress.value,
      'currentAddress': this.currentAddress.value,
      'status': this.status.value,
      'medicineID': this.medicineID.value,
      'quantity': this.quantity.value,
      'shipment': this.shipment.value,
      'parentcontract': this.parentcontract.value,
      'previousBox': this.previousBox.value,
      'timestamp': this.timestamp.value
    };

    return this.servicecreateBox.updateTransaction(form.get('transactionId').value, this.Transaction)
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

    return this.servicecreateBox.deleteTransaction(this.currentId)
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

    return this.servicecreateBox.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'boxId': null,
        'trackingCode': null,
        'originAddress': null,
        'destinationAddress': null,
        'currentAddress': null,
        'status': null,
        'medicineID': null,
        'quantity': null,
        'shipment': null,
        'parentcontract': null,
        'previousBox': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.boxId) {
        formObject.boxId = result.boxId;
      } else {
        formObject.boxId = null;
      }

      if (result.trackingCode) {
        formObject.trackingCode = result.trackingCode;
      } else {
        formObject.trackingCode = null;
      }

      if (result.originAddress) {
        formObject.originAddress = result.originAddress;
      } else {
        formObject.originAddress = null;
      }

      if (result.destinationAddress) {
        formObject.destinationAddress = result.destinationAddress;
      } else {
        formObject.destinationAddress = null;
      }

      if (result.currentAddress) {
        formObject.currentAddress = result.currentAddress;
      } else {
        formObject.currentAddress = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
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

      if (result.shipment) {
        formObject.shipment = result.shipment;
      } else {
        formObject.shipment = null;
      }

      if (result.parentcontract) {
        formObject.parentcontract = result.parentcontract;
      } else {
        formObject.parentcontract = null;
      }

      if (result.previousBox) {
        formObject.previousBox = result.previousBox;
      } else {
        formObject.previousBox = null;
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
      'boxId': null,
      'trackingCode': null,
      'originAddress': null,
      'destinationAddress': null,
      'currentAddress': null,
      'status': null,
      'medicineID': null,
      'quantity': null,
      'shipment': null,
      'parentcontract': null,
      'previousBox': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
