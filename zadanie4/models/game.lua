local Model = require("lapis.db.model").Model

local Game = Model:extend("games", {
  primary_key = "id"
})

return Game
