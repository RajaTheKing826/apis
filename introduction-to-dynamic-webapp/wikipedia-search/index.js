const fetch = require("node-fetch");

module.exports.wikipediaSearch = async (event) => {
  if (event.httpMethod == "GET") {
    const searchParameter = event["queryStringParameters"]["search"];

    let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchParameter}`;

    let output = { search_results: [] };
    let searchResults;
    let resultArray = [];
    let wikipediaStatusCode;
    let wikipediaStatusText;

    const response = await fetch(url);

    if (!response.ok) {
      wikipediaStatusCode = response.status;
      wikipediaStatusText = response.statusText;
      throw Error(response.statusText);
    } else {
      wikipediaStatusCode = response.status;
    }

    searchResults = await response.json();

    if (wikipediaStatusCode === 200) {
      const queryResults = [...searchResults.query.search];
      queryResults.forEach((query) => {
        let searchObject = { title: "", link: "", description: "" };
        query.snippet = getParsedText(query.snippet);
        searchObject.description = getParsedText(query.snippet);
        searchObject.title = query.title;
        searchObject.link = `https://en.wikipedia.org/?curid=${query.pageid}`;
        resultArray.push(searchObject);
      });
      output.search_results = [...resultArray];
      searchResults = output;
    } else {
      searchResults = wikipediaStatusText;
    }

    return {
      statusCode: wikipediaStatusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(searchResults),
    };
  }
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

function getParsedText(htmlContent) {
  if (htmlContent === null || htmlContent === "") return "";
  else htmlContent = htmlContent.toString();
  const data = htmlContent.replace(/(<([^>]+)>)/gi, "");
  return data;
}
