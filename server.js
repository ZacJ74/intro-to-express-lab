const express = require('express');

const app = express();

const port = 3000;

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

  const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];


app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    const greetingMessage = `Hello there, ${username}!`;
    res.send(greetingMessage);
});


// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });

// ---------------route handlers--------------

app.get('/', (req, res) => { // root 
    res.send("Welcome to my Express server!");
});


app.get('/roll/:number', (req, res) => { // gets the number parameter from the URL and converts it into an Integer
    
    const maxRoll = parseInt(req.params.number); // we use parseInt() to ensure that it is a number, not a string

    
    if (isNaN(maxRoll) || maxRoll < 1) {
        // If validation fails, send the error message.
        res.send("You must specify a positive number.");
    } else {
        // If validation passes, generate a random number.
        const rollResult = Math.floor(Math.random() * (maxRoll + 1));

        const responseMessage = `You rolled a ${rollResult}`;

        res.send(responseMessage);
    } 
});

app.get('/collectibles/:index', (req, res) => {
   
    // const indexAsString = req.params.index; ---- old way
   
    // const indexAsNumber = parseInt(indexasString); ----- old way

    const index = parseInt(req.params.index); // more concise, does the same things, both retrieves the parameter and the conversion, and the index variable holds the value now.

    if ( // checks for all conditions that would make the input invalid. if all conditions are false, the if block is skipped
        isNaN(index) // validation check
        || index < 0
        || index >= collectibles.length
    ) { 
        res.send("This item is not yet in stock. Check back soon!"); // sends this message if the 'if' condition is true, meaning it is invalid.
    } else { // should only run if the 'if' condition is false
        const selectedItem = collectibles[index]; // accesses the item from the array using the validated index that we wrote earlier

        const { name, price } = selectedItem; // accesses the properties, the name and price in this case.

        const responseMessage = `So, you want ${name}? For ${price}, it can be yours!`; // constructs the final response string

        res.send(responseMessage); // sends response message back to the user
    }
});




app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;

    if (req.query['min-price']) { // validation. 
        const minPrice = parseInt(req.query['min-price']); // parse it to turn it into a number

        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice); // filters through the shoes and if any return as true, they are put into a new array
    } if (req.query['max-price']) {
        const maxPrice = parseInt(req.query['max-price']);

        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice); // same as above but this time for maxPrice shoes
    } if (req.query.type) { 
        const shoeType = req.query.type;

        filteredShoes = filteredShoes.filter(shoe => shoe.type === shoeType); // filter for type  
    }
    res.json(filteredShoes);
});



app.listen(port, () => { // moved .listen to last position
    console.log(`Server is listening on port ${port}`);
});