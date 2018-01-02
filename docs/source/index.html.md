---
title: FoodTruck API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - shell: cURL
  - python: Python
  - javascript: Node

toc_footers:
  - <a href='https://github.com/mollieswenson'>API source code on Github</a>
  - <a href='http://mswenson.com'>See my portfolio</a>

includes:
  - errors

search: true
---

# Introduction

Welcome to the FoodTruck API! You can use this API to access FoodTruck API endpoints, which you can use to get and modify information about local food trucks.

You can view code examples in the dark area to the right, and you can switch the programming language of the examples with the tabs in the top right.

# Authentication

> Use this code to authenticate:

```shell
$ curl https://mollieswenson.com/api/v1/foodtruck \
    -H "Authorization: Bearer token_here"
```

```javascript
const request = require('request');

const options = {
    url: 'https://mollieswenson.com/api/v1/foodtruck',
    method: 'GET',
    headers: {
        'Authorization': 'Bearer token_here'
    }
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});
```

```python
import requests

headers = {'Authorization': 'token_here'}
r = requests.get('https://mollieswenson.com/api/v1/foodtruck', headers=headers)
print r.json()
```

> Make sure to replace `token_here` with your token.

FoodTruck uses JSON Web Tokens (JWT) to allow POST, PUT, and DELETE access to the API. FoodTruck expects a JWT token to be included in all POST, PUT, and DELETE API requests to the server.

Pass your JWT token in the Authorization header when making requests that require authentication.

For the purposes of demonstrating this API, include the below JWT token to authenticate with the server for POST (except registration), PUT, and DELETE requests.

`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMTYxNDZlMTNkZjNlMTUxYWEzZjQyZSIsImlhdCI6MTUxMTM5NjY5NywiZXhwIjoxNTEzOTg4Njk3fQ.0YB9WlPxTdfMb5ysZO1qKRjrOgeHKmLVqVxfbkb4gTo`

<aside class="notice">
FoodTruck JWT tokens expire after 30 days.
</aside>

# FoodTrucks

## Get all trucks

> Use this code to get all trucks:

```shell
$ curl https://mollieswenson.com/api/v1/foodtruck
```

```javascript
const request = require('request');

const options = {
    url: 'https://mollieswenson.com/api/v1/foodtruck',
    method: 'GET',
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});
```

```python
import requests

r = requests.get('https://mollieswenson.com/api/v1/foodtruck')
print r.json()
```

> The above command returns JSON structured like this:

```json
[
    {
        "_id": "5a170b72e843ef23f66b4c38",
        "avgcost": 7.99,
        "foodtype": "Breakfast",
        "name": "Pancake Hut",
        "reviews": [],
        "geometry": {
            "coordinates": [10.7, 20.5],
            "type": "Point"
        }
    },
    {
        "_id": "5a17129cfde1be05c23eb00e",
        "avgcost": 2.99,
        "foodtype": "Aemrican",
        "name": "Funk Dave's Diner",
        "reviews": [],
        "geometry": {
            "coordinates": [10.9, 44.8],
            "type": "Point"
        }
    }
]
```

This endpoint retrieves all trucks.

### HTTP Request

`GET https://mollieswenson.com/api/v1/foodtruck`

<aside class="success">
GET requests don't require authentication!
</aside>

## Get a specific truck

> Use this code to get a specific truck:

```shell
$ curl https://mollieswenson.com/api/v1/foodtruck/5a170b72e843ef23f66b4c38
```

```javascript
const request = require('request');

const options = {
    url: 'https://mollieswenson.com/api/v1/foodtruck/5a170b72e843ef23f66b4c38',
    method: 'GET',
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});
```

```python
import requests

r = requests.get('https://mollieswenson.com/api/v1/foodtruck/5a170b72e843ef23f66b4c38')
print r.json()
```

> The above returns JSON structured like this:

```json
{
    "_id": "5a170b72e843ef23f66b4c38",
    "avgcost": 7.99,
    "foodtype": "Breakfast",
    "name": "Pancake Hut",
    "reviews": [],
    "geometry": {
        "coordinates": [10.7, 20.5],
        "type": "Point"
    }
  }
```

This endpoint retrieves a specific truck.

### HTTP Request

`GET https://mollieswenson.com/api/v1/foodtruck/[id]`

### URL Parameters

Parameter | Description
--------- | -----------
ID (required) | The ID of the truck to retrieve

## Get trucks by food type

```shell
curl "https://mollieswenson.com/api/v1/foodtruck/foodtype/Breakfast"
```

```javascript
const request = require('request');

const options = {
    url: 'https://mollieswenson.com/api/v1/foodtruck/Breakfast',
    method: 'GET',
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});
```

```python
import requests

r = requests.get('https://mollieswenson.com/api/v1/foodtruck/Breakfast')
print r.json()
```

> The above command returns JSON structured like this:

```json
{
    "_id": "5a170b72e843ef23f66b4c38",
    "avgcost": 7.99,
    "foodtype": "Breakfast",
    "name": "Pancake Hut",
    "reviews": [],
    "geometry": {
        "coordinates": [10.7, 20.5],
        "type": "Point"
    },
    "_id": "9s174b43e843ef23f66b4d55",
    "avgcost": 7.99,
    "foodtype": "Breakfast",
    "name": "Waffle Way",
    "reviews": [],
    "geometry": {
        "coordinates": [15.7, 42.5],
        "type": "Point"
    }
}
```

This endpoint retrieves a list of trucks by food type.

### HTTP Request

`GET https://mollieswenson.com/api/v1/foodtruck/foodtype/[foodtype]`

### URL Parameters

Parameter | Description
--------- | -----------
foodtype (required) | The food type to retrieve


<aside class="notice">
Foodtypes are case sensitive.
</aside>

## Add a food truck

> Use this code to add a food truck to the database.

```shell
curl -X POST "https://mollieswenson.com/api/v1/foodtruck/add"
-H "Authorization: Bearer token_here"
-d "name": "Waffle Extravaganza"
-d "foodtype": "Breakfast"
-d "avgcost": 12.00
-d "geometry": {"coordinates": [34.43,21.98]}
```

```javascript
const request = require('request');

const options = {
    url: 'https://mollieswenson.com/api/v1/foodtruck/add',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token_here'
    },
    form: {
      'name': 'Waffle Extravaganza',
      'foodtype': 'Breakfast',
      'avgcost': '12.00',
      'geometry': {'coordinates': [34.43,21.98]}
    }
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});
```

```python
import requests

headers = {'Authorization': 'token_here'}
data = {
  'name': 'Waffle Extravaganza',
  'foodtype': 'Breakfast',
  'avgcost': '12.00',
  'geometry': {'coordinates': [34.43,21.98]}
}
r = requests.post('https://mollieswenson.com/api/v1/foodtruck/add', headers=headers, body=body)
print r.json()
```

> The above returns a Success or Error message.

This endpoint adds a new food truck to the database.

### HTTP Request

`POST https://mollieswenson.com/api/v1/foodtruck/add`

### URL Parameters

Parameter | Description
--------- | -----------
name (required) | The name of the food truck.
foodtype (required) | The type of food available at the food truck.
avgcost (required) | The average cost of meals at this food truck.
geometry (required) | Contains an array with two numerical values. The location coordinates.

## Modify a food truck

> Use this code to modify an existing food truck.

```shell
curl -X PUT "https://mollieswenson.com/api/v1/foodtruck/5a170b72e843ef23f66b4c38"
-H "Authorization: Bearer token_here"
-d "name": "Waffle Extravaganza"
-d "foodtype": "Breakfast"
-d "avgcost": 12.00
-d "geometry": {"coordinates": [34.43,21.98]}
```

```javascript
const request = require('request');

const options = {
    url: 'https://mollieswenson.com/api/v1/foodtruck/5a170b72e843ef23f66b4c38',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token_here'
    },
    form: {
      'name': 'Waffle Extravaganza',
      'foodtype': 'Breakfast',
      'avgcost': '12.00',
      'geometry': {'coordinates': [34.43,21.98]}
    }
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});
```

```python
import requests

headers = {'Authorization': 'token_here'}
data = {
  'name': 'Waffle Extravaganza',
  'foodtype': 'Breakfast',
  'avgcost': '12.00',
  'geometry': {'coordinates': [34.43,21.98]}
}
r = requests.put('https://mollieswenson.com/api/v1/foodtruck/5a170b72e843ef23f66b4c38', headers=headers, body=body)
print r.json()
```

> The above returns a Success or Error message.

This endpoint modifies an existing food truck.

### HTTP Request

`PUT https://mollieswenson.com/api/v1/foodtruck/[id]`

### URL Parameters

Parameter | Description
--------- | -----------
id (required) | The id of the food truck to modify.
name (optional) | The name of the food truck.
foodtype (optional) | The type of food available at the food truck.
avgcost (optional) | The average cost of meals at this food truck.
geometry (optional) | Contains coordinates, an array with two numerical values.


## Delete a truck

> Use this code to delete a food truck:

```shell
curl -X PUT "https://mollieswenson.com/api/v1/foodtruck/5a170b72e843ef23f66b4c38"
-H "Authorization: Bearer token_here"
```

```javascript
const request = require('request');

const options = {
    url: 'https://mollieswenson.com/api/v1/foodtruck/5a170b72e843ef23f66b4c38',
    method: 'DELETE',
    headers: {'Authorization': 'Bearer token_here'}
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});
```

```python
import requests

headers = {'Authorization': 'token_here'}
r = requests.delete('https://mollieswenson.com/api/v1/foodtruck/5a170b72e843ef23f66b4c38', headers=headers)
print r.json()
```

> The above returns a Success or Error message.

This endpoint deletes a food truck.

### HTTP Request

`DELETE https://mollieswenson.com/api/v1/foodtruck/[id]`

### URL Parameters

Parameter | Description
--------- | -----------
id (required) | The ID of the food truck to delete

#Reviews

##Add a review

> Use this code to add a review:

```shell
curl -X POST "https://mollieswenson.com/api/v1/foodtruck/reviews/add/5a170b72e843ef23f66b4c38"
-H "Authorization: Bearer token_here"
-d "title" : "title_here"
-d "text" : "text_here"
```

```javascript
const request = require('request');

const options = {
    url: 'https://mollieswenson.com/api/v1/foodtruck/reviews/add/5a170b72e843ef23f66b4c38',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token_here'
    },
    form: {
      'title': 'My Review',
      'text': 'This food was fabulous!'
    }
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});
```

```python
import requests

headers = {'Authorization': 'token_here'}
data = {
  'title': 'My Review',
  'text': 'This food was fabulous!'
}
r = requests.post('https://mollieswenson.com/api/v1/foodtruck/reviews/add/5a170b72e843ef23f66b4c38', headers=headers, body=body)
print r.json()
```
```

This endpoint adds a review to a specific food truck.

### HTTP Request

`POST https://mollieswenson.com/api/v1/foodtruck/review/add/[id]`

### URL Parameters

Parameter | Description
--------- | -----------
id (required) | The ID of the food truck to add the review to
title (required) | The title of the reviews
text (required) | The body text of the review



> Use this code to get reviews for a specific truck:

```shell
curl "https://mollieswenson.com/api/v1/foodtruck/review/5a170b72e843ef23f66b4c38"
```

```javascript
const request = require('request');

const options = {
    url: 'https://mollieswenson.com/api/v1/foodtruck/review/5a170b72e843ef23f66b4c38',
    method: 'GET',
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});
```

```python
import requests

r = requests.get('https://mollieswenson.com/api/v1/reviews/5a170b72e843ef23f66b4c38')
print r.json()
```

This endpoint retrieves all reviews assigned to a specific food truck.

### HTTP Request

`GET https://mollieswenson.com/api/v1/foodtruck/review/[id]`

### URL Parameters

Parameter | Description
--------- | -----------
id (required) | The ID of the food truck to retrieve reviews for


#Accounts

##Register a user account

> Use this code to register an account.

```shell
curl -X POST "https://mollieswenson.com/api/v1/account/register"
  -d "email": "example@mail.com"
	-d "password": "password12345"
```

```python
import requests

body = {
  'email': 'example@mail.com',
  'password': 'password12345'
}
r = requests.post('https://mollieswenson.com/api/v1/account/register', body=body)
print r.json()
```

```javascript
const request = require('request');
const options = {
    url: 'https://mollieswenson.com/api/v1/account/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token_here'
    },
    form: {
      'email': 'example@mail.com',
      'password': 'password12345'
    }
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});
```

This endpoint registers new user accounts.

<aside class="notice">
Registration does not require authentication.
</aside>

### HTTP Request

`POST https://mollieswenson.com/api/v1/account/register`

### URL Parameters

Parameter | Description
--------- | -----------
email (required) | The registering user's email address
password (required) | The registering user's password


##Get a user's account details

> Use this code to get details of a user account:

```curl
curl -X GET "https://mollieswenson.com/api/v1/account/me"
  -H "Authorization: Bearer _token_here"
```

```python
import requests

headers = {'Authorization': 'token_here'}
r = requests.get('https://mollieswenson.com/api/v1/account/me' headers=headers)
print r.json()
```

```javascript

const request = require('request');

const options = {
    url: 'https://mollieswenson.com/api/v1/account/me',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token_here'
    }
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});
```

> The above command returns JSON structured like this:

```json
{
    "id": "5a16146e13df3e151aa3f42e",
    "iat": 1511396697,
    "exp": 1513988697
}
```

> This endpoint retrieves a user account details.

### HTTP Request

`GET https://mollieswenson.com/api/v1/account/me`

### URL Parameters

This endpoint does not require a parameter to identify the user. The user is identified by the JWT token.


##Log in to a user account

> Use this code to log in to a user account:

```shell
curl -X POST "https://mollieswenson.com/api/v1/account/login"
  -d "email": "example1@gmail.com"
	-d "password": "password12345"
```

```python
import requests

headers = {'Authorization': 'token_here'}
body = {'email': 'example1@gmail.com', 'password': 'password12345'}
r = requests.post('https://mollieswenson.com/api/v1/account/login' headers=headers, body=body)
print r.json()
```

```javascript

const request = require('request');

const options = {
    url: 'https://mollieswenson.com/api/v1/account/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token_here'
    }
    data: {
      'email': 'example1@gmail.com',
      'password': 'password12345'
    }
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});
```

This endpoint logs in a user account.

### HTTP Request

`POST https://mollieswenson.com/api/v1/account/login[id]`

### URL Parameters

Parameter | Description
--------- | -----------
email (required) | The user's email address
password (required) | The user's password


##Log out of a user account

> Use this code to log out of an account.

```shell
curl -X POST "https://mollieswenson.com/api/v1/account/logout"
  -d "id": "5a16146e13df3e151aa3f42e"
```

```python
import requests

body = {'id': '5a16146e13df3e151aa3f42e'}
r = requests.post('https://mollieswenson.com/api/v1/account/logout' body=body)
print r.json()
```

```javascript

const request = require('request');

const options = {
    url: 'https://mollieswenson.com/api/v1/account/logout',
    method: 'POST',
    data: 'id': '5a16146e13df3e151aa3f42e'
};

request(options, function(err, res, body) {
    let json = JSON.parse(body);
    console.log(json);
});
```

This endpoint logs out a user account.

### HTTP Request

`POST https://mollieswenson.com/api/v1/account/logout/[id]`

### URL Parameters

Parameter | Description
--------- | -----------
id (required) | The user's id
