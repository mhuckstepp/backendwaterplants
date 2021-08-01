I built this app to help people remember to water their plants at the right time. The site checks local weather to update watering schedule when it rains and sends email notifications to users to water.

Built with React, Redux, Node, Express, Postgres, Knex, bcrpyt, JWT, Styled Components, Heroku Scheduler, SendGrid API, OpenWeather API

WaterMyPlants API
API Endpoints

🔐 List Plants
Lists all plants from all users.

GET /api/plants/all
Response
Status: 200 OK
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
🔓 Get a plant
Provides information an item from the menu.

GET /api/menu/items/:id
Response
If item is not found
Status: 404 Not Found
If item is found
Status: 200 OK
{
  "id": 1,
  "name": "Burger",
  "price": 599,
  "description": "Tasty",
  "image": "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
}
🔐 Protected Endpoints: These endpoints require the request to include an access token issued by Auth0 in the authorization header.

🔐 Create an item for the authenticated user
Creates an item in the menu for the authenticated user.

POST /api/menu/items
Input
Name	Type	Description
name	string	Required. The item's name
description	string	Required. The item's description
price	number	Required. The item's price in cents.
image	string	Required. The URL of the item's image.
Example
{
  "name": "Salad",
  "price": 4.99,
  "description": "Fresh",
  "image": "https://cdn.auth0.com/blog/whatabyte/salad-sm.png"
}
Response
Status: 201 Created
{
  "id": "QvcDfWMwg",
  "name": "Salad",
  "price": 4.99,
  "description": "Fresh",
  "image": "https://cdn.auth0.com/blog/whatabyte/salad-sm.png"
}
🔐 Update an item
Update an item from the menu by overwriting the entire entity. You must send the entire resource in the request.

PUT /api/menu/items/:id
Input
Name	Type	Description
name	string	Required. The item's name
description	string	Required. The item's description
price	number	Required. The item's price in cents.
image	string	Required. The URL of the item's image.
If you only need to update some of the item properties, use the PATCH /api/menu/items/:id endpoint.

Example
Take the following item as an example:

{
  "name": "Burger",
  "price": 599,
  "description": "Tasty",
  "image": "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
}
If you want to update the description only, you'll send a request body like the following:

{
  "name": "Burger",
  "price": 599,
  "description": "Juicy",
  "image": "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
}
Response
If item is not found
Status: 201 Created
{
  "id": "QvcDfWMwg",
  "name": "Salad",
  "price": 4.99,
  "description": "Fresh",
  "image": "https://cdn.auth0.com/blog/whatabyte/salad-sm.png"
}
If item is found
Status: 200 OK
{
  "id": "QvcDfWMwg",
  "name": "Salad",
  "price": 4.99,
  "description": "Fresh",
  "image": "https://cdn.auth0.com/blog/whatabyte/salad-sm.png"
}
🔐 Patch an item
Update certain properties of an item from the menu. Only requires you to send the data that you want to update.

PATCH /api/menu/items/:id
Input
Name	Type	Description
name	string	Optional. The item's name
description	string	Optional. The item's description
price	number	Optional. The item's price in cents.
image	string	Optional. The URL of the item's image.
Example
Take the following item as an example:

{
  "name": "Burger",
  "price": 599,
  "description": "Tasty",
  "image": "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
}
If you want to update the description only, you'll send a request body like the following:

{
  "description": "Juicy"
}
Response
If item is not found
Status: 404 Not Found
If item is found
Status: 204 No Content
🔐 Remove all items
Remove all items from the menu.

DELETE /api/menu/items
Response
Status: 204 No Content
🔐 Remove an item
Remove an item from the menu.

DELETE /api/menu/items/:id
Response
If item is not found
Status: 404 Not Found
If item is found
Status: 204 No Content
🔐 Reset the list
Reset the menu database to its default values.

GET /api/menu/reset
Response
Status: 200 OK
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
