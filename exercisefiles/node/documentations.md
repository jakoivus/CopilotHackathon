NodeServer.js Documentation
Overview
NodeServer.js is a simple HTTP server built with Node.js. It demonstrates basic server creation, URL parsing, and query parameter handling. The server listens on port 3000 and provides a minimal API that responds to specific GET requests.

Server Setup
The server is created using Node.js's http module. It listens for incoming HTTP requests, parses the request URL to extract the pathname and query parameters, and sends appropriate responses based on the request's pathname.

Endpoints
/get
Method: GET
Description: This endpoint checks for a query parameter named key. It returns a message based on the presence of the key parameter.
Query Parameters:
key: A string value.
Responses:
If the key parameter is not provided, the server responds with "key not passed".
If the key parameter is provided, the server responds with "Hello [key]", where [key] is the value of the provided key parameter.
Error Handling
Unsupported Methods: If a request is made to a pathname that is not handled by the server, the response will be "method not supported". This is a placeholder for future expansion and error handling.
Server Listening
When the server starts, it logs "server is listening on port 3000" to the console, indicating that it is ready to accept requests on port 3000.

Usage
To start the server, run NodeServer.js with Node.js. Once running, the server will accept requests to the /get endpoint, responding based on the query parameters provided.

Future Enhancements
Additional endpoints and functionality can be added to expand the server's capabilities.
Error handling can be improved to manage different types of errors more gracefully.
Security features, such as input validation and rate limiting, can be implemented to make the server more robust.
This documentation provides a basic overview of NodeServer.js. The server's simplicity makes it an excellent starting point for learning about HTTP servers in Node.js and can be extended with more features and endpoints as needed.