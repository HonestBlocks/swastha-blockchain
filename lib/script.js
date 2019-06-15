/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.createBox} tx instance
 * @transaction
 */
async function createBox(tx){
  
  //get the factory
  var factory = getFactory();
  
  var box = factory.newResource('org.example.mynetwork', 'box', tx.boxId);
  box.trackingCode = tx.trackingCode;
  box.originAddress = tx.originAddress;
  box.destinationAddress = tx.destinationAddress;
  box.currentAddress = tx.currentAddress;
  box.status = tx.status;
  box.medicineID = tx.medicineID;
  box.quantity = tx.quantity;
  
  //creating relationship
  var shipment = factory.newRelationship('org.example.mynetwork', 'shipment', tx.shipment.shipmentID);
  box.shipment = shipment;
  var parentcontract  = factory.newRelationship('org.example.mynetwork', 'contract', tx.parentcontract.contractID);
  box.parentcontract = parentcontract;
  var previousBox = factory.newRelationship('org.example.mynetwork', 'box', tx.previousBox.boxId);
  box.previousBox = previousBox;
  
  //asset registry
  return getAssetRegistry('org.example.mynetwork.box')
  .then(function (BoxAssetRegistry) {
  // Remove the vehicle from the vehicle asset registry.
  return BoxAssetRegistry.add(box);
  })
  .catch(function (error) {
  let factory = getFactory();
  let event = factory.newEvent('org.example.mynetwork', 'error');
  event.message = "delete shipment is not done";
  event.detail = "error in catch";
  emit(event); 
  });
  
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.updateBox} tx instance
 * @transaction
 */
async function updateBox(tx)
{
  //get the factory
  var factory = getFactory();
  
  //updating the current address
  tx.box.currentAddress = tx.currentAddress;
  
  let assetRegistry = await getAssetRegistry('org.example.mynetwork.box');
  await assetRegistry.update(tx.box);
  
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.updateBoxStatus} tx instance
 * @transaction
 */
async function updateBoxStatus(tx)
{
  //get factory
  var factory = getFactory();
  
  //updating the current address
  tx.box.status = tx.status;
  
  let assetRegistry = await getAssetRegistry('org.example.mynetwork.box');
  await assetRegistry.update(tx.box);
 
  
}


/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.createMedicine} tx instance
 * @transaction
 */
async function createMedicine(tx){
  //creation of Medicine
   // Get the factory.
   var factory = getFactory();
   // Create a new vehicle.
   var medicine = factory.newResource('org.example.mynetwork', 'medicine', tx.medicineID);
   // Set the properties of the new vehicle.
   medicine.medicineName = tx.medicineName;
   medicine.manufactureDate = tx.manufactureDate;
   medicine.expiryDate = tx.expiryDate;

   //creation of relationship
   var manufacturer = factory.newRelationship('org.example.mynetwork', 'manufacturer', tx.manufacturer.participantID);
   medicine.manufacturer = manufacturer;
   var owner = factory.newRelationship('org.example.mynetwork', 'supplyChainMember', tx.owner.participantID);
   medicine.owner = owner;

   //assetRegistry
   return getAssetRegistry('org.example.mynetwork.medicine')
   .then(function (ContractAssetRegistry) {
   // Get the factory for creating new asset instances.
   ContractAssetRegistry.add(medicine);

   //emitting event
   let event = factory.newEvent('org.example.mynetwork', 'createMedicineEvent');
   event.medicineID = tx.medicineID;
   event.medicineName = tx.medicineName;
   emit(event); 
   return;
   })
   .catch(function (error) {   
   let event = factory.newEvent('org.example.mynetwork', 'error');
   event.message = "create medicine is not done";
   event.detail = "Some Technical Detail";
   emit(event); 
   });

  
}
/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.createContract} tx instance
 * @transaction
 */
async function createContract(tx){
 //creation of contract
   // Get the factory.
   var factory = getFactory();
   // Create a new contract.
   var contract = factory.newResource('org.example.mynetwork', 'contract', tx.contractID);
   contract.medicineID = tx.medicineID;
   contract.quantity = tx.quantity;
   contract.status = tx.status; 
   contract.completionstatus = tx.completionstatus
   contract.price = tx.price;
           
   //creating relationship
   var buyer = factory.newRelationship('org.example.mynetwork', 'supplyChainMember', tx.buyer.participantID);
   contract.buyer = buyer;
   var seller = factory.newRelationship('org.example.mynetwork', 'supplyChainMember', tx.seller.participantID);
   contract.seller = seller;
 //get the asset registry
   return getAssetRegistry('org.example.mynetwork.contract')
   .then(function (ContractAssetRegistry) {
 // Get the factory for creating new asset instances.
    ContractAssetRegistry.add(contract);
 
 //emitting event
   let event = factory.newEvent('org.example.mynetwork','createContractEvent');
   event.status = tx.status;
   event.medicineID = tx.medicineID;
   event.quantity = tx.quantity;
   emit(event);
   return;
   })
   .catch(function (error) {
   let event = factory.newEvent('org.example.mynetwork', 'error');
   event.message = "create contract is not done";
   event.detail = "Some Technical Detail";
   emit(event);
   }); 
  
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.createShipment} tx instance
 * @transaction
 */
async function createShipment(tx) {
 //creation of shipment
   // Get the factory.
   var factory = getFactory();
   // Create a new shipment
   var shipment = factory.newResource('org.example.mynetwork', 'shipment', tx.shipmentID);
   shipment.routename = tx.routename;
   shipment.reachedDestination = tx.reachedDestination;

   //creating relationship
   var owner = factory.newRelationship('org.example.mynetwork', 'transporter', tx.owner.transporterID);
   shipment.owner = owner;  
   return getAssetRegistry('org.example.mynetwork.shipment')         
   .then(function (ContractAssetRegistry) {

   // Get the factory for creating new asset instances.
   ContractAssetRegistry.add(shipment);
  
   //emitting event
   let event = factory.newEvent('org.example.mynetwork','createShipmentEvent');
   event.reachedDestination = tx.reachedDestination;
   emit(event);
   return;
   })

   .catch(function (error) {
   let event = factory.newEvent('org.example.mynetwork', 'error');
   event.message = "create shipment is not done";
   event.detail = "Some Technical Detail";
   emit(event); 
   });
  
}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.updateShipmentStatus} tx instance
 * @transaction
 */
async function updateShipmentStatus(tx){
 //updating the shipment Status
  tx.shipment.reachedDestination = tx.reachedDestination;
 //assetRegistry of updated shipment
 let assetRegistry = await getAssetRegistry('org.example.mynetwork.shipment');
 await assetRegistry.update(tx.shipment);

 //emitting event
 let factory = getFactory();
 let event = factory.newEvent('org.example.mynetwork', 'updateShipmentStatusEvent');
 event.reachedDestination = tx.reachedDestination;
 emit(event); 
 }
/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.updateContract} tx instance
 * @transaction
 */
async function updateContract(tx){
 //updating the payment status of contract
 tx.contract.status = tx.status;
 //updating the fulfilment status of contract
 tx.contract.completionstatus = tx.completionstatus;
 //assetRegistry for updated payment status
 let assetRegistry = await getAssetRegistry('org.example.mynetwork.Contract')
 await assetRegistry.update(tx.contract);
 let factory = getFactory();
 let event = factory.newEvent('org.example.mynetwork', 'updateContractEvent');
 event.newPaymentStatus = tx.status;
 emit(event); 

}
/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.deleteShipment} tx instance
 * @transaction
 */
async function deleteShipment(tx){
   if(tx.Shipment.reachedDestination == true)
   {
    return getAssetRegistry('org.example.mynetwork.shipment')
    .then(function (ShipmentAssetRegistry) {
    // Remove the vehicle from the vehicle asset registry.
    return ShipmentAssetRegistry.remove(tx.Shipment);
    //let factory = getFactory(); 
    //let event = factory.newEvent('org.example.mynetwork', 'deleteShipmentEvent');
    //event.shipmentID = tx.Shipment.shipmentID;
    //event.status = tx.Shipment.status;
    //emit(event); 
    
    })
    .catch(function (error) {
    let factory = getFactory();
    let event = factory.newEvent('org.example.mynetwork', 'error');
    event.message = "delete shipment is not done";
    event.detail = "error in catch";
    emit(event); 
    });
   }
   else
   {
   //Emitting event 
    let factory = getFactory();
    let event = factory.newEvent('org.example.mynetwork', 'error');
    event.message = "Shipment is not deleted";
    event.detail = "Destination and Status problem";
    emit(event);
   }
}
/**
 * Track the trade of a commodity from one trader to another
 * @param {org.example.mynetwork.updateMedicine} tx instance
 * @transaction
 */
async function updateMedicine(tx){
 //updating the medicine
 tx.medicine.owner = tx.newOwner;
 //AssetRegistry for updated medicine
 let assetRegistry = await getAssetRegistry('org.example.mynetwork.medicine');
 await assetRegistry.update(tx.medicine);

 //emitting event
 //let factory = getFactory();
// let event = factory.newEvent('org.example.mynetwork', 'updateMedicineEvent');
 //event.medicine = tx.medicine;
 //event.newOwner = tx.newOwner;
 //emit(event); 
 }


