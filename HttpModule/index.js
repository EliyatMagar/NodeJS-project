const http=require('http');


//create the HTTP server
const server=http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'});
     //send a response message 
    res.end('hello world!\n');
})

//Define the port for the server 

const PORT=4500;

server.listen(PORT,()=>{
    console.log(`server is runnig on http://localhost:${PORT}`);
})

// http.createServer(): This method creates a new HTTP server and takes a callback function as an argument. This callback function is called every time the server receives a request. The function receives two arguments:
// req (request object): Represents the incoming request (contains data like request method, URL, headers, etc.).
// res (response object): Represents the outgoing response (used to send data back to the client).
// res.writeHead(): This method sets the status code and the headers for the response.
// res.end(): Ends the response process and sends the data back to the client.
// server.listen(): This method starts the server and listens for incoming connections on the specified port.




// const http = require("http");
// const data=require('./data')

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" }); ///status=200, 404 not found , 500 is internal server error
//   res.write(
//     JSON.stringify(data)
//   );
//   res.end();
// });

// const PORT = 5000;

// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


/*

Common HTTP Status Codes:
2xx: Success

200: OK (The request was successful)
201: Created (Resource was successfully created)
3xx: Redirection

301: Moved Permanently (Resource has been moved to a new URL)
302: Found (Temporary redirect)
4xx: Client Errors

400: Bad Request (Invalid request syntax)
401: Unauthorized (Authentication is required)
403: Forbidden (Access is not allowed)
404: Not Found (Resource was not found)
5xx: Server Errors

500: Internal Server Error (Generic server error)
503: Service Unavailable (Server is overloaded or down)






Example with  multiple status code 
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Home Page</h1>");
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>About Page</h1>");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

 
 */



//CRUD with file System
/* 
 *make file
 *read file
 *update file 
 *delete file
 *rename file

*/






