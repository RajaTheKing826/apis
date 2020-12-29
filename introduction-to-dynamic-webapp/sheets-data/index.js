const GSheetReader = require("g-sheets-api");

module.exports.getSheetData = async (event) => {
  if (event.httpMethod == "GET") {
    const sheetId = event["queryStringParameters"]["sheetId"];
    let getSheetsStatusCode = 200;
    let sheetData = "get sheet data API";

    const sheetDetails = {
      sheetId: sheetId,
    };

    await GSheetReader(
      sheetDetails,
      (results) => {
        sheetData = results;
      },
      (error) => {
        getSheetsStatusCode = 404;
        sheetData = error;
      }
    );
    return {
      statusCode: getSheetsStatusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(sheetData),
    };
  }
};
