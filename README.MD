# Description
Express middleware used to check the status of a nodejs api

Response is returned as HAL+JSON with information about current process

# Example
```
var express = require("express");
var app = express();
var healthcheck = require("express-api-healthcheck");

...
app.get("/healthcheck", healthcheck);
...
```