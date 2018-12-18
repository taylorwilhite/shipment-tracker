const db = require('../db');

const orderText = 'INSERT INTO order(order, date, carrier, tracking_number, cancelled, moving) VALUES($1, $2, $3, $4, $5, $6)';
// For later when we add the item checking to the script
// const itemText = 'INSERT INTO item(sku, name, upc, in_stock, order, quantity) VALUES($1, $2, $3, $4, $5, $6)';

const addToShipmentList = (shipments) => {
  // Push shipments to DB
  shipments.forEach((shipment) => {
    const {
      orderNumber, createDate, serviceCode, trackingNumber, voided,
    } = shipment;
    const values = [orderNumber, createDate, serviceCode, trackingNumber, voided, false];
    db.query(orderText, values)
      .then((res) => {
        console.log(res.rows[0]);
      })
      .catch(e => console.error(e.stack));
  });
};

module.exports = addToShipmentList;
