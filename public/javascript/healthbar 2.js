"use strict";
const Bar = require("rpg-bars");
 
//- * choose a bar * -//
 
// var basic = new Bar.basic({
//   name: "Basic Bar",
//   total: 20
// });
 
var h = new Bar.health({
  name: "Health",
  total: 20
});
 
// var m = new Bar.mana({
//   name: "Mana",
//   total: 15
// });
 
// var s = new Bar.stamina({
//   name: "Stamina",
//   total: 10
// });
 
// var xp = new Bar.xp({
//   name: "XP",
//   total: 30
// });
 
// basic.display();
h.display();
// m.display();
// s.display();
// xp.display();
 