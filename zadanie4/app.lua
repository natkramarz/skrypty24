local lapis = require("lapis")
local app = lapis.Application()
local categories_endpoints = require("endpoints.categories")
local games_endpoints = require("endpoints.games")

app:get("/", function()
  return "Welcome to Lua Shop!" 
end)

categories_endpoints(app)
games_endpoints(app)

return app
