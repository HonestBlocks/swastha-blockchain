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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { medicineComponent } from './medicine/medicine.component';
import { boxComponent } from './box/box.component';
import { shipmentComponent } from './shipment/shipment.component';
import { contractComponent } from './contract/contract.component';

import { manufacturerComponent } from './manufacturer/manufacturer.component';
import { distributorComponent } from './distributor/distributor.component';
import { customerComponent } from './customer/customer.component';
import { transporterComponent } from './transporter/transporter.component';
import { regulatorsComponent } from './regulators/regulators.component';

import { updateShipmentComponent } from './updateShipment/updateShipment.component';
import { createContractComponent } from './createContract/createContract.component';
import { createBoxComponent } from './createBox/createBox.component';
import { createShipmentComponent } from './createShipment/createShipment.component';
import { updateContractComponent } from './updateContract/updateContract.component';
import { createMedicineComponent } from './createMedicine/createMedicine.component';
import { deleteShipmentComponent } from './deleteShipment/deleteShipment.component';
import { updateShipmentStatusComponent } from './updateShipmentStatus/updateShipmentStatus.component';
import { updateBoxComponent } from './updateBox/updateBox.component';
import { updateBoxStatusComponent } from './updateBoxStatus/updateBoxStatus.component';
import { updateMedicineComponent } from './updateMedicine/updateMedicine.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'medicine', component: medicineComponent },
  { path: 'box', component: boxComponent },
  { path: 'shipment', component: shipmentComponent },
  { path: 'contract', component: contractComponent },
  { path: 'manufacturer', component: manufacturerComponent },
  { path: 'distributor', component: distributorComponent },
  { path: 'customer', component: customerComponent },
  { path: 'transporter', component: transporterComponent },
  { path: 'regulators', component: regulatorsComponent },
  { path: 'updateShipment', component: updateShipmentComponent },
  { path: 'createContract', component: createContractComponent },
  { path: 'createBox', component: createBoxComponent },
  { path: 'createShipment', component: createShipmentComponent },
  { path: 'updateContract', component: updateContractComponent },
  { path: 'createMedicine', component: createMedicineComponent },
  { path: 'deleteShipment', component: deleteShipmentComponent },
  { path: 'updateShipmentStatus', component: updateShipmentStatusComponent },
  { path: 'updateBox', component: updateBoxComponent },
  { path: 'updateBoxStatus', component: updateBoxStatusComponent },
  { path: 'updateMedicine', component: updateMedicineComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
