const request = require('request');
const { Base64 } = require('js-base64');
require('dotenv').config();

const authString = Base64.encode(`${process.env.SS_API_KEY}:${process.env.SS_API_SECRET}`);
const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
const fromDate = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()} ${yesterday.getHours()}:${yesterday.getMinutes()}:${yesterday.getSeconds()}`;

const getNewShipments = () => {
  request(
    {
      url: `https://ssapi.shipstation.com/shipments?createDateStart=${fromDate}`, // temporarily doing last 24 hours to test
      headers: { Authorization: `Basic ${authString}` },
    }, (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response.statusCode);
        console.log(body); // TODO find out why I can't access shipments on this
      }
    },
  );
};

module.exports = getNewShipments;
