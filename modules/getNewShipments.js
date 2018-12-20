const request = require('request-promise-native');
const { Base64 } = require('js-base64');
require('dotenv').config();

const authString = Base64.encode(`${process.env.SS_API_KEY}:${process.env.SS_API_SECRET}`);
// Get yesterday's date and then adjust to correct string format
const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
const fromDate = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()} ${yesterday.getHours()}:${yesterday.getMinutes()}:${yesterday.getSeconds()}`;

const getNewShipments = async () => {
  let newShipments = [];
  await request(
    {
      url: `https://ssapi.shipstation.com/shipments?createDateStart=${fromDate}`, // temporarily doing last 24 hours to test
      headers: { Authorization: `Basic ${authString}` },
      json: true,
    },
  )
    .then(body => newShipments = [...newShipments, ...body.shipments]) // eslint-disable-line
    .catch(err => console.log(err));
  return newShipments;
};

module.exports = getNewShipments;
