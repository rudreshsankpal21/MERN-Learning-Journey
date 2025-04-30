const http = require("http");
const url = require("url");
const server = http.createServer((req, res) => {
  const passedUrl = url.parse(req.url, true);
  const QueryParams = passedUrl.query;
  console.log(QueryParams);
});
const PORT = 3000;
server.listen(PORT, console.log(`http://localhost:${PORT}`));
