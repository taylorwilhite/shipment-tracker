const request = require('request-promise-native');
const { Base64 } = require('js-base64');
require('dotenv').config();

const authString = Base64.encode(`${process.env.SS_API_KEY}:${process.env.SS_API_SECRET}`);
const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
const fromDate = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()} ${yesterday.getHours()}:${yesterday.getMinutes()}:${yesterday.getSeconds()}`;

const getNewShipments = async () => {
  const newShipments = await request(
    {
      url: `https://ssapi.shipstation.com/shipments?createDateStart=${fromDate}`, // temporarily doing last 24 hours to test
      headers: { Authorization: `Basic ${authString}` },
      json: true,
    }, (err, response, body) => {
      if (err) {
        return err;
      }
      console.log(response.statusCode);
      return body.shipments;
    },
  );
  return newShipments;
};

module.exports = getNewShipments;
