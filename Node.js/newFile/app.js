const http = require("http");
const server = http.createServer((req, res) => {
  const data = [
    {
      user1: {
        name: "rudresh sankpal",
        age: 18,
      },
      user2: {
        name: "manoj sankpal",
        age: 50,
      },
    },
  ];
  const { method, url } = req;
  const parts = url.split("/");
  const id = parts[2]; // checks the id
  if (method === "GET" && url == "data") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(data));
  } else if (method === "GET" && parts[1] === "data" && id) {
    const employee = data.find((emp) => emp.id === parseInt(id)); // finds the employee with its id
    if (employee) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(employee));
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(`employee not found`);
    }
  }

  //   // create new employees
  //   else if (method === "POST" && url === "/data") {
  //     let body = "";
  //     // listens to the event of making post requests
  //     req.on("data", (chunk) => {
  //       body += chunk;
  //     });
  //     // sends the response
  //     req.on("end", () => {
  //       const newEmp = JSON.parse(body);
  //       data.push(newEmp);
  //       res.writeHead(200, { "content-type": "application/json" });
  //       res.end(
  //         JSON.stringify({
  //           newEmp,
  //           employees: data,
  //         })
  //       );
  //     });
  //   }
});

const port = 3000;
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
