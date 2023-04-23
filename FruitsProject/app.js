const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});

// FruitsDB fruits collection
const fruitSchema = { name: {type: String, required: "Name required"}, rating: {type: Number, min: 1, max: 10}, review: String };

const Fruit = mongoose.model('Fruit', fruitSchema);

const Apple = new Fruit({ name: 'Apple', rating: 7, review: "Pretty solid as a fruit" });
const Orange = new Fruit({ name: 'Orange', rating: 6, review: "Sour as i like it" });
const Banana = new Fruit({ name: 'Banana', rating: 8, review: "I think i like it" });
const Watermelon = new Fruit({ name: 'Watermelon', rating: 9, review: "Sweet as hell" });

const peaches = new Fruit({name: "Peaches", rating: 5, review: "Peaches are yummy but not so"})


// Fruit.deleteOne({_id: "60f1a187f10f200d2d36a867"}, function(err) {
//   if (err) {
//     console.log(err)
//   } else {

//     mongoose.connection.close();
//     console.log("Document deleted successfully");
//   }
// })

// peaches.save().then(function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close();
//     console.log("Saved succesfully to fruitsDB");
//   }
// })

// Fruit.insertMany([Apple, Orange, Banana, Watermelon]).then(function(err) {
//   if (err){
//     console.log(err);
//   } else {
//     console.log('fruits saved succesfully to fruitsDB');
//   }
// });


// FruitsDB people collection
const Person = mongoose.model('Person', {name: String, age: Number, favfruit: fruitSchema});

const person1 = new Person({name: "Jenny", age: 31});
const person2 = new Person({name: "Hana", age: 31});
const person3 = new Person({name: "Lucious", age: 31});
const person4 = new Person({name: "Jane", age: 31});


// Relationship in database

const strawberries = new Fruit({name: "Strawberries", rating: 8.5, review: "Its Juicy"});

// const john = new Person({name: "Jenny", age: 17, favfruit: pineapple});

strawberries.save()
Person.updateOne({name: "John"}, {favfruit: strawberries}, function(err) {
  if(err) {
    console.log(err)
  } else {
    console.log("Document updated");
  }
})



// Person.insertMany([person1, person2, person3, person4]).then(() => console.log("Person saved to database"));

// Person.deleteMany({name: ["John", "Jane", "Jenny", "Hana", "Lucious"]}, function(err) {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log("Deleted documents successfully")
//   }
// })

// Person.find(function(err, persons) {
//   if (err) {
//     console.log(err)
//   } else {
//     for (let i = 0; i < persons.length; i++) {
//       console.log(persons[i].name);
//     }
//   }
// })


// Fruit.find(function(err, fruits) {
//   if (err) {
//     console.log(err);
//   } else {

//     for (let i = 0; i < fruits.length; i++) {
//       console.log(fruits[i].name);  
//     }

//     mongoose.connection.close();
//   }
// })
