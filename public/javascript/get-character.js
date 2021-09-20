const sequelize = require("../../config/connection");

async function getCharacter() {


    
    const char_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
    const response = await fetch(`/api/characters/${char_id}`, {
        method: 'GET',
        body: JSON.stringify({
            id,
            char_name,
            char_type,
            char_health,
            user_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        // document.location.replace('/dashboard');
        res.render(charname);
        document.createElement('div[name="char_name_div"]').setAttribute(text=char_name);
    } else {
        alert(response.statusText);
    }
};

getCharacter();

