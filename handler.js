const GSheetReader = require("g-sheets-api");
/*Global require*/
const GoogleSpreadsheet = require("google-spreadsheet");
const { promisify } = require("util");

const creds = require("./cred.json");

module.exports.hello = async (event) => {
  if (event.httpMethod == "GET") {
    // const sheetId = event["queryStringParameters"]["sheetId"];
    let getSheetsStatusCode = 200;
    let sheetData = "get sheet data API";

    const sheetDetails = {
      sheetId: "1SbqqrS4dgkyZOLBRBW_-M_K8Jqq4EF5_IXkJr3C5VDY",
    };

    // const doc = new GoogleSpreadsheet(
    //   "1SbqqrS4dgkyZOLBRBW_-M_K8Jqq4EF5_IXkJr3C5VDY"
    // );

    // await promisify(doc.useServiceAccountAuth)(creds);
    // const info = await promisify(doc.getInfo)();
    // const sheet = info.worksheets[0];
    // const rows = await promisify(sheet.getRows)({ offset: 1 });

    // return {
    //   statusCode: 200,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credentials": true,
    //   },
    //   body: JSON.stringify(rows),
    // };

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
//sheets@arched-light-300014.iam.gserviceaccount.com