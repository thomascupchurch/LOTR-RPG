// module.exports = {
//     get_char_name: (CharacterData) => {
//         return `Your character is ${char_name}`;
//     }
// };





const Handlebars = require('handlebars');


// Handlebars.registerHelper('sequelizeGet', function(get_char_name, char_name) {
//   return character.get(char_name);
// }); 



const get_char_name = (req, res) => {
    return req.body.char_name;
}

module.exports = get_char_name;
