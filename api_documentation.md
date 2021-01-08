# Comic App Server
Comic App is an application to manage your favorite comic. This app has : 
* RESTful endpoint for comic's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

_Auth Endpoint_
- `POST /register`
- `POST /login`
- `POST /loginGoogle`

**Register**
----
  create user into server

* **URL**

  /register

* **Method**

  `POST`

* **Request Body**

  ```
  {
    "email": "rafli12@gmail.com",
    "password": "123123123",
    "firstName": "rafli",
    "lastName": "rachmawandi"
  }
  ```

* **Success Response:** <br />
  **Code:** 201 <br />
  **Content:**
  ```
  {
    "status": "success",
    "message": "successfully register new user",
    "data": {
        "id": 5,
        "firstName": "rafli",
        "lastName": "rachmawandi",
        "email": "rafli12@gmail.com",
        "password": "$2a$10$rQSYS92TqZfVRtQ7aVf8mORzmn8iv8aZyW1mYTk2JeQ5OhjimB6HK",
        "updatedAt": "2021-01-07T23:41:45.685Z",
        "createdAt": "2021-01-07T23:41:45.685Z"
    }
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    "status": "error",
    "message": [
        "field password is required",
        "password at least have 6 character"
    ]
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "error",
    "message": <error_message>
  }
  ```

**Login**
----
  login into server

* **URL**

  /login

* **Method**

  `POST`

* **Request Body**

  ```
  {
    "email": "rafli12@gmail.com",
    "password": "123123123"
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "status": "success",
    "message": "successfully login",
    "fullname": "rafli rachmawandi",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJyYWZsaTEyQGdtYWlsLmNvbSIsImlhdCI6MTYxMDA2Mjk5OSwiZXhwIjoxNjEwMTQ5Mzk5fQ.1iqFSiyS2gGaAWQc5NtRiYGbP113TwCqnZASIeAX_WA"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    "status": "error",
    "message": [
        "field password is required",
        "password at least have 6 character"
    ]
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "error",
    "message": "wrong email or password"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "error",
    "message": <error_message>
  }
  ```
<br>

_Character Endpoint_
- `POST /characters`
- `POST /characters/search/:name`

**Get all character**
----

* **URL**

  /characters

* **Method**

  `GET`

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Request Body**

  ```
  not needed
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  [
    {<object cheracther data>}, // name, id, imgUrl, etc.
    {<object cheracther data>},
    ...
    {<object cheracther data>}
  ]
  ```

* **Failed Response:** <br />
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "error",
    "message": <error_message>
  }
  ```

**Search character by name**
----

* **URL**

  /characters/search/:name

* **Method**

  `GET`

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Request Body**

  ```
  not needed
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  [
    {<object cheracther data>}, // name, id, imgUrl, etc.
    {<object cheracther data>},
    ...
    {<object cheracther data>}
  ]
  ```

* **Failed Response:** <br />
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "error",
    "message": <error_message>
  }
  ```
