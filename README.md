# **REST API Library**

This is a simple REST API Library for making HTTP requests in DART/Javascript. It allows you to send API requests with ease and handle common server responses.

## **Installation**

You can include this library in your project using npm or by manually including the `index.js` file.

## **npm**

npm install my-rest-api-library

## **Manual Inclusion**

You can manually include the index.js file in your HTML.
<script src="path/to/index.js"></script>

## **Usage**
To use the REST API Library, create a new instance of `RESTClient` and call the `sendRequest` method with the necessary parameters.
`const client = new RESTClient();
const url = 'https://api.example.com/data';
const method = 'post';
const parameters = { name: 'test', age: 12 };
const headers = { Authorization: 'Bearer <your_access_token>' };

client.sendRequest(url, method, parameters, headers);`

## **API Documentation**

The `RESTClient` class has a method called `sendRequest(url, method, parameters, headers, format)`. It sends an API request to the specified URL with the given parameters and headers. The format parameter specifies the request `format`, which can be 'json' (default) or 'xml'.

## **Handling Responses**

The library will handle responses based on the HTTP status codes returned by the server. If the response is in JSON format, it will be automatically parsed.

Status Code 200: The request was successful, and the server returned a response. The success message will be displayed on the screen.

Status Code 400: The request data was invalid or missing. The error message "Данные не верны" will be displayed on the screen.

Status Code 403: The user does not have access to the requested service. The error message "У Вас нету доступа на данный сервис" will be displayed on the screen.

Status Code 500: An unknown error occurred on the server. The error message "Произошла неизвестная ошибка" will be displayed on the screen.

For other unexpected status codes, the error message "Ошибка: Неожиданный статус ответа от сервера: [status_code]" will be displayed on the screen.

## **Troubleshooting**

If you encounter any issues while using the library, please check the following:

Make sure you are passing the correct URL, method, parameters, and headers in the `sendRequest` method.

Double-check the format of your request data, especially when using JSON format.

Verify that you have the correct access token in the headers when making authorized requests.

