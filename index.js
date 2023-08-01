/**
 * Represents a REST client for making API requests.
 */
class RESTClient {
    /**
     * Sends an API request.
     *
     * @param {string} url - The endpoint address for the request.
     * @param {string} method - The HTTP method for the request (post, get, delete, put).
     * @param {Object} parameters - The parameters for the request in key-value pairs.
     * @param {Object} headers - The headers to be included in the request in key-value pairs.
     * @param {string} [format='json'] - The format of the request (default is json).
     */
    sendRequest(url, method, parameters, headers, format = 'json') {
        if (!['post', 'get', 'delete', 'put'].includes(method.toLowerCase())) {
            console.error('%cОшибка: Неверный метод запроса.', 'color: red');
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open(method.toUpperCase(), url);

        if (headers) {
            for (const key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        xhr.onload = function () {
            console.log(xhr.status, xhr.responseText);
            let response;
            if (format === 'json') {
                try {
                    response = JSON.parse(xhr.responseText);
                } catch (error) {
                    showError('Ошибка: Некорректный формат JSON.');
                    return;
                }
            } else {
                response = xhr.responseText;
            }

            switch (xhr.status) {
                case 200:
                    showSuccess('Все прошло удачно', response);
                    break;
                case 400:
                    showError('Данные не верны');
                    break;
                case 403:
                    showError('У Вас нету доступа на данный сервис');
                    break;
                case 500:
                    showError('Произошла неизвестная ошибка');
                    break;
                default:
                    showError('Ошибка: Неожиданный статус ответа от сервера:' + xhr.status);
                    break;
            }
        };

        xhr.onerror = function () {
            showError('Ошибка: Произошла ошибка при выполнении запроса.');
            console.error('%cОшибка: Произошла ошибка при выполнении запроса.', 'color: red');
        };

        if (parameters && Object.keys(parameters).length > 0) {
            if (format === 'json') {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(parameters));
            } else {
                const queryString = Object.keys(parameters).map((key) => `${key}=${parameters[key]}`).join('&');
                xhr.send(queryString);
            }
        } else {
            xhr.send();
        }
    }
}

/**
 * Displays a success message on the screen.
 *
 * @param {string} message - The success message to be displayed.
 * @param {*} response - The response object returned from the API request.
 */

function showSuccess(message,response) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<p style="color: green">${message}</p>`;

    const kyrgyzGirl = document.getElementById('kyrgyzGirl');
    kyrgyzGirl.style.visibility = 'hidden';
}


/**
 * Displays an error message on the screen.
 *
 * @param {string} message - The error message to be displayed.
 */

function showError(message) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<p style="color: red">${message}</p>`;

    const kyrgyzGirl = document.getElementById('kyrgyzGirl');
    kyrgyzGirl.style.visibility = 'visible';
}

document.getElementById('sendButton').addEventListener('click', function () {
    const client = new RESTClient();
    const url = 'https://api.example.com/data';
    const method = 'post';
    const parameters = {name: 'test', age: 12};
    const headers = {Authorization: 'Bearer <your_access_token>'};

    client.sendRequest(url, method, parameters, headers);
});
