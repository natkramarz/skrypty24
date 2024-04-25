const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

app.get('/categories', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(categories);
})
app.get('/products', (req, res) => { 
  res.header("Access-Control-Allow-Origin", "*");
  res.send(games);
}); 

app.get('/products/:product_id', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const productId = parseInt(req.params.product_id);
  const product = games.find(product => product.id === productId);

  if (!product) {
    res.status(404).send('Product not found');
  } else {
    res.send(product);
  }
});

app.get('/categories/:category_id', (req, res) => { 
 res.header("Access-Control-Allow-Origin", "*");
  const categoryId = parseInt(req.params.category_id);
  const category = categories.find(category => category.id === categoryId);
  if (!category) {
    res.status(404).send('Product not found');
  } else {
    res.send(category);
  }
});

app.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedGame = req.body;
  
  const index = games.findIndex(game => game.id === id);
  if (index !== -1) {
    games[index] = { ...games[index], ...updatedGame };
    res.status(200).json({ message: 'Game updated successfully' });
  } else {
    res.status(404).json({ message: 'Game not found' });
  }
});

app.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = games.findIndex(game => game.id === id);
  if (index !== -1) {
    games.splice(index, 1);
    res.status(200).json({ message: 'Game deleted successfully' });
  } else {
    res.status(404).json({ message: 'Game not found' });
  }
});

app.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedFields = req.body;

  const index = games.findIndex(game => game.id === id);
  if (index !== -1) {
    games[index] = { ...games[index], ...updatedFields };
    res.status(200).json({ message: 'Game updated successfully' });
  } else {
    res.status(404).json({ message: 'Game not found' });
  }
});


const categories = [
    { id: 1, name: "Strategy Games" },
    { id: 2, name: "Party Games" },
    { id: 3, name: "Cooperative Games" },
    { id: 4, name: "Deck-Building Games" },
    { id: 5, name: "Role-Playing Games (RPGs)" },
    { id: 6, name: "Classic Games" },
    { id: 7, name: "Eurogames" },
    { id: 8, name: "Family Games" },
  ];


  const games = [
    { id: 1, category_id: 1, name: "Settlers of Catan", image_url: "https://upload.wikimedia.org/wikipedia/en/a/a3/Catan-2015-boxart.jpg", price: 29.99 },
    { id: 2, category_id: 1, name: "Risk", image_url: "https://target.scene7.com/is/image/Target/GUEST_1811d24c-99fa-4bc9-8e04-cd884c68fdd2?wid=488&hei=488&fmt=pjpeg", price: 19.99 },
    { id: 3, category_id: 1, name: "Chess", image_url: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Chess_board_opening_staunton.jpg", price: 9.99 },
    { id: 4, category_id: 2, name: "Codenames", image_url: "https://ecsmedia.pl/c/codenames-czech-games-edition-b-iext115957484.jpg", price: 24.99 },
    { id: 5, category_id: 2, name: "Cards Against Humanity", image_url: "https://cdn.sanity.io/images/vc07edlh/production/378671dbd5448946b68dd0a4abf60b5dac6162ff-1400x1260.png?auto=format&q=75&w=600", price: 29.99 },
    { id: 6, category_id: 2, name: "Pictionary", image_url: "https://toykingdom.co.za/wp-content/uploads/2020/05/MG-DKD49-3-600x600.jpg", price: 14.99 },
    { id: 7, category_id: 3, name: "Pandemic", image_url: "https://files.rebel.pl/products/100/302/_109386/rebel-gra-planszowa-pandemic-pudelko-2000x2000-k-ffffff.jpg", price: 39.99 },
    { id: 8, category_id: 3, name: "Forbidden Island", image_url: "https://kangagames.com/pub/media/catalog/product/cache/af29b6d3dfa6297b9c63e4f20e1c852c/f/o/forbiddentin3dweb.jpg", price: 19.99 },
    { id: 9, category_id: 3, name: "Hanabi", image_url: "https://m.media-amazon.com/images/I/815a85-BqfL._AC_UF894,1000_QL80_.jpg", price: 12.99 },
    { id: 10, category_id: 4, name: "Dominion", image_url: "https://upload.wikimedia.org/wikipedia/en/b/b5/Dominion_game.jpg", price: 34.99 },
    { id: 11, category_id: 4, name: "Legendary: A Marvel Deck Building Game", image_url: "https://m.media-amazon.com/images/I/A1b2HwrYOHL.jpg", price: 39.99 },
    { id: 12, category_id: 4, name: "Ascension", image_url: "https://m.media-amazon.com/images/I/91cDr6IEQ2L.jpg", price: 29.99 },
    { id: 13, category_id: 5, name: "Dungeons & Dragons", image_url: "https://www.thegamesteward.com/cdn/shop/products/dungeons-dragons-castle-ravenloft-board-game-retail-pre-order-edition-retail-board-game-wizards-of-the-coast-38474830217368.jpg?v=1644334600", price: 49.99 },
    { id: 14, category_id: 5, name: "Pathfinder", image_url: "https://m.media-amazon.com/images/I/71Wuzlw+RGL.jpg", price: 39.99 },
    { id: 15, category_id: 5, name: "Gloomhaven", image_url: "https://www.thegamesteward.com/cdn/shop/products/gloomhaven-kickstarter-special-kickstarter-board-game-cephalofair-games-25679832187032.jpg?v=1632982906", price: 99.99 },
    { id: 16, category_id: 6, name: "Monopoly", image_url: "https://m.media-amazon.com/images/I/91RSg9MCGtL.jpg", price: 19.99 },
    { id: 17, category_id: 6, name: "Scrabble", image_url: "https://rukminim2.flixcart.com/image/850/1000/xif0q/board-game/r/k/d/5-scrabble-original-games-word-puzzle-game-complete-set-in-original-imagg9gshghbbtkk.jpeg?q=90&crop=false", price: 14.99 },
    { id: 18, category_id: 6, name: "Clue", image_url: "https://i5.walmartimages.com/asr/d5eb49f3-279d-49cf-a22c-7eae75a50c14.36ddc0f683bd72435367d6d9b7cd5049.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF", price: 15.99 },
    { id: 19, category_id: 7, name: "Ticket to Ride", image_url: "https://m.media-amazon.com/images/I/91YNJM4oyhL._AC_UF1000,1000_QL80_.jpg", price: 19.99 },
    { id: 20, category_id: 7, name: "Carcassonne", image_url: "https://target.scene7.com/is/image/Target/GUEST_7341757e-b40f-431a-a78c-4f3db4f2c8e1?wid=488&hei=488&fmt=pjpeg", price: 29.99 },
    { id: 21, category_id: 7, name: "Agricola", image_url: "https://x.boardgamearena.net/data/gamemedia/agricola/box/en_280.png?h=1651658162", price: 13.99 },
    { id: 22, category_id: 8, name: "Ticket to Ride: First Journey", image_url: "https://m.media-amazon.com/images/I/8173YdxHGMS._AC_UF1000,1000_QL80_.jpg", price: 20.99 },
    { id: 23, category_id: 8, name: "Sushi Go!", image_url: "https://m.media-amazon.com/images/I/61b2vsppJQL._AC_UF894,1000_QL80_.jpg", price: 12.99 },
    { id: 24, category_id: 8, name: "Kingdomino", image_url: "https://www.thegamesteward.com/cdn/shop/products/kingdomino-retail-edition-blue-orange-eu-34736816128152_600x.jpg?v=1634381504", price: 10.99 },
]     