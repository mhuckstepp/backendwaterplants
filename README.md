I built this app to help people remember to water their plants at the right time. The site checks local weather to update watering schedule when it rains and sends email notifications to users to water.

Built with React, Redux, Node, Express, Postgres, Knex, bcrpyt, JWT, Styled Components, Heroku Scheduler, SendGrid API, OpenWeather API

# WaterMyPlants API


## API Endpoints

> 🔐 Protected Endpoints: These endpoints require the request to include an access token in the authorization header.

### 🔐 List Plants
Lists all plants from all users.

```bash
GET /api/plants/all
```

```bash
Status: 200 OK
```

```json
[
    {
        "id": 3,
        "nickname": "Home Depot Ferns",
        "water_freq": "7",
        "img": "https://secure.img1-fg.wfcdn.com/im/11444145/resize-h800%5Ecompr-r85/1062/106296684/Palm+Plant+in+Basket.jpg",
        "baseDate": "1627663332161",
        "user_id": 6,
        "species_id": 3,
        "species": "Ficus"
    },
    {
        "id": 4,
        "nickname": "Costco Succulent",
        "water_freq": "7",
        "img": "https://target.scene7.com/is/image/Target/GUEST_380ea518-1fe9-4611-b172-c068ea5a77b9?wid=488&hei=488&fmt=pjpeg",
        "baseDate": "1627663329393",
        "user_id": 6,
        "species_id": 4,
        "species": "corn plant"
    },
    {
        "id": 7,
        "nickname": "Tall Corn Plant",
        "water_freq": "7",
        "img": "https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202109/2657/img90z.jpg",
        "baseDate": "1627663336110",
        "user_id": 6,
        "species_id": 7,
        "species": "Corn Plant"
    },
    {
        "id": 10,
        "nickname": "Mini tree from neighbor ",
        "water_freq": "7",
        "img": "https://www.gardeningknowhow.com/wp-content/uploads/2021/01/succulent-bonsai.jpg",
        "baseDate": "1627663327765",
        "user_id": 6,
        "species_id": 10,
        "species": "Unknown"
    }
]
```



### 🔐 Get plants by user

Provides a list of all plants from one user

```bash
GET /api/plants/
```

#### Response

##### If client does not include a token

```bash
Status: 401 Unauthorized
```

```json
{ "message": "Please Sign In to access this page" }
```

```bash
Status: 200 OK
```

```json
[
    {
        "id": 18,
        "nickname": "Mini tree from neighbor ",
        "water_freq": "7",
        "img": "https://www.gardeningknowhow.com/wp-content/uploads/2021/01/succulent-bonsai.jpg",
        "baseDate": "1627663327765",
        "user_id": 6,
        "species_id": 10,
        "species": "Unknown"
    },
    {
        "id": 4,
        "nickname": "Costco Succulent",
        "water_freq": "7",
        "img": "https://target.scene7.com/is/image/Target/GUEST_380ea518-1fe9-4611-b172-c068ea5a77b9?wid=488&hei=488&fmt=pjpeg",
        "baseDate": "1627663329393",
        "user_id": 6,
        "species_id": 4,
        "species": "corn plant"
    }
```



### 🔐 Create a plant for the authenticated user

Creates an item in the menu for the authenticated user.

```bash
POST /api/plants
```

#### Input

| Name          | Type     | Description                                |
| ------------- | :------- | :----------------------------------------- |
| `nickname`    | `string` | **Required**. The plants name                                |
| `water_freq`  | `number` | **Required**. How often to water                             |
| `species`     | `string` | The plant species                                            |
| `img`         | `string` | The URL of the item's image.                                 |
| `baseDate`    | `number` | **Required**. Unix Timestamp of creation or last water date  |

##### Example

```json
{
    "nickname": "Rose Bush",
    "species": "Roses",
    "water_freq": 3,
    "img": "https://img.totallandscapecare.com/files/base/randallreilly/all/image/2018/02/tlc.shutterstock_137343065.png?auto=format&fit=max&w=1440",
    "baseDate": 1627845209358
}
```

#### Response

```bash
Status: 201 Created
```

```json
{
    "id": 56,
    "nickname": "Rose Bush",
    "water_freq": "3",
    "img": "https://img.totallandscapecare.com/files/base/randallreilly/all/image/2018/02/tlc.shutterstock_137343065.png?auto=format&fit=max&w=1440",
    "baseDate": "1627845347543",
    "user_id": 6,
    "species_id": 49,
    "species": "Roses"
}
```

### 🔐 Update an item

Update an item from the menu by overwriting the entire entity. You must send the entire resource in the request.

```bash
PUT /api/plants/:id
```

#### Input

| Name          | Type     | Description                                |
| ------------- | :------- | :----------------------------------------- |
| `name`        | `string` | **Required**. The item's name              |
| `description` | `string` | **Required**. The item's description       |
| `price`       | `number` | **Required**. The item's price in cents.   |
| `image`       | `string` | **Required**. The URL of the item's image. |

If you only need to update some of the item properties, use the `PATCH /api/menu/items/:id` endpoint.

##### Example

Take the following item as an example:

```json
{
  "nickname": "Mini tree from neighbor ",
  "species": "Unknown",
  "water_freq": 6,
  "id": 18,
  "img": "https://www.gardeningknowhow.com/wp-content/uploads/2021/01/succulent-bonsai.jpg",
  "baseDate": "1627663327765"
}
```

#### Response

##### If item is not found

```bash
Status: 404 Not found
```

```json
{ 
"message": "We couldn't find that plant, check the id and try again"
}
```

##### If item is found

```bash
Status: 200 OK
```

```json
{
    "id": 18,
    "nickname": "Mini tree from neighbor ",
    "water_freq": "6",
    "img": "https://www.gardeningknowhow.com/wp-content/uploads/2021/01/succulent-bonsai.jpg",
    "baseDate": "1627663327765",
    "user_id": 6,
    "species_id": 10,
    "species": "Unknown"
}
```

### 🔐 Remove a plant

Remove an plant.

```
DELETE /api/plants/items/:id
```

#### Response

##### If item is not found

```bash
Status: 404 Not Found
```

##### If item is found

```bash
Status: 204 No Content
```

### 🔐 Reset the list

Reset the menu database to its default values.

```bash
GET /api/menu/reset
```

#### Response

```bash
Status: 200 OK
```

```json
[
  {
    "id": 1,
    "name": "Burger",
    "price": 599,
    "description": "Tasty",
    "image": "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
  },
  {
    "id": 2,
    "name": "Pizza",
    "price": 299,
    "description": "Cheesy",
    "image": "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
  },
  {
    "id": 3,
    "name": "Tea",
    "price": 199,
    "description": "Informative",
    "image": "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
  }
]
```
