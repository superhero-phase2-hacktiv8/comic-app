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
    "email": "agus@gmail.com",
    "password": "123123123"
  }
  ```

* **Success Response:** <br />
  **Code:** 201 <br />
  **Content:**
  ```
  {
    "id": 1,
    "email": "agus@gmail.com"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    <validation message>
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "message": "Internal server error"
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
    "email": "agus@gmail.com",
    "password": "123123123"
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZ3VzQGdtYWlsLmNvbSIsImlhdCI6MTYxMDAyNjMzNH0.5AsUmBNb3g8F3KVNMW0iziNvnAahsz2M3CQV8iRBC_Q"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    <validation message>
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "message": "invalid email / password"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "message": "Internal server error"
  }
  ```