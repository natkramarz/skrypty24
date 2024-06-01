return function(app)
    local json_params = require("lapis.application").json_params
    local Game = require("models.game")
  
    app:post("/games", json_params(function(self)
      local category = Category:find(self.params.category_id)
      if not category then
        return { status = 404, json = { error = "Category not found" } }
      end
      local game = Game:create({
        category_id = self.params.category_id,
        name = self.params.name,
        image_url = self.params.image_url,
        price = self.params.price
      })
      return { json = game }
    end))
  
    app:get("/games", function(self)
      local games = Game:select()
      return { json = games }
    end)
  

    app:get("/games/:id", function(self)
      local game = Game:find(self.params.id)
      if not game then
        return { status = 404, json = { error = "Game not found" } }
      end
      return { json = game }
    end)
  
    app:put("/games/:id", json_params(function(self)
      local game = Game:find(self.params.id)
      if not game then
        return { status = 404, json = { error = "Game not found" } }
      end
      local category = Category:find(self.params.category_id)
      if not category then
       return { status = 404, json = { error = "Category not found" } }
      end
      game:update({
        category_id = self.params.category_id,
        name = self.params.name,
        image_url = self.params.image_url,
        price = self.params.price
      })
      return { json = game }
    end))
  
    app:delete("/games/:id", function(self)
      local game = Game:find(self.params.id)
      if not game then
        return { status = 404, json = { error = "Game not found" } }
      end
      game:delete()
      return { status = 200, json = { success = true } }
    end)
  end
  