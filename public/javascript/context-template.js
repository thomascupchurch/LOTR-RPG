var template = 
@"<div class=""Example"">   
  <h1>{{header}}</h1>   
  <h2>{{subheader}}</h2>   

  <div class=""body"">
     {{body}}
  </div> 
</div>";


// var context = new
// {
//    header: "Hello World",
//    subheader: "Today is about...",
//    body: "Examples of using templating engines to generate ETL."
// };

// // Compiling the template
// var templateScript = Handlebars.Compile(template);  

// // Applying the context to the compiled template 
// var result = templateScript(context) 

// // Displaying the results
// Console.WriteLine(results);
// Console.ReadKey();


function try_a_template() {
   console.log('try_a_template function has been called');
    const template = document.getElementById('#example');
    // const char_name_div = document.getElementById('#charname');

    template.outerHTML = 'test';
   
    // Clone the new row and insert it into the table
    // template.textContent = "template worked"
    // char_name_div.innerText = 'test';
    // template.innerText = 'test';
    // char_name_div.innerHTML = 'test';
}

try_a_template();
