local config = require("lapis.config")

config("development", {
  server = "nginx",
  code_cache = "off",
  num_workers = "1", 
  port = 9090, 
  postgres = {
    backend = "pgmoon",
    host = "<HOST_NAME>",
    user = "<USERNAME>",
    password = "<PASSWORD>",
    database = "<DB_NAME"
  }
})
