const express = require('express');
const getNewShipments = require('./modules/getNewShipments');
const addToShipmentList = require('./modules/addToShipmentList');
const getShipmentList = require('./modules/getShipmentList');
const trackShipments = require('./modules/trackShipments');
const updateList = require('./modules/updateList');
const getUnshippedOrders = require('./modules/getUnshippedOrders');

const app = express();
require('dotenv').config();

// Overall Function
const getUnshipped = async () => {
  // Check new shipments
  const newShipments = await getNewShipments();
  // Submit new shipments to list
  addToShipmentList(newShipments);
  // Pull entire list to be checked
  const shipmentList = getShipmentList();
  // Get Tracking info on shipments and update list
  updateList(trackShipments(shipmentList));
  // Return new unshipped order list
  const lateOrders = getUnshippedOrders();
  return lateOrders;
};

// Every 24 hours run the function
// getUnshipped();
async function testAsync(func) {
  const output = await func();
  console.log(output);
}

testAsync(getNewShipments);

app.listen(process.env.PORT || 8008, () => {
  console.log('app is running!');
});
