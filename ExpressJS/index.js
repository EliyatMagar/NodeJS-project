// 




//render html and json file in browsers


// const express=require('express');

// const app=express();


// app.get('/',(req,res)=>{
//     res.send(`<h1>Hello this is home page.</h1>
//         <a href="/about">Go to about page</a>`);
//     console.log("data sent by browsers==>>>>>>",req.query.name); //http://localhost:5000/?name=eliyat
// });

// app.get('/about',(req,res)=>{
//     res.send(`<input type="text" placeholder="user name"/>
//         <button>click me</button>
//         <a href="/">Go to home page</a>`);
// })
// app.get('/contact',(req,res)=>{
//     res.send([
//         {
//             name:"eliyat thapa magar",
//             age:23,
//         }, {
//             name:"tezab thapa magar",
//             age:27,
//         }
//     ]);
// })
// const PORT=5000;
// app.listen(PORT,()=>{
//     console.log(`Server is runnig on localhost:${PORT}`);
// });




// const express=require('express');
// const path=require('path');

// const app=express();

// console.log(__dirname);

// const publicPath=path.join(__dirname,'public');

// console.log(publicPath);


// app.use(express.static(publicPath));

// app.listen(4000);


//remove extension URL

// const express=require('express');
// const path=require('path');

// const app=express();

// const publicPath=path.join(__dirname,'public');

// app.get('',(_,res)=>{
//     res.sendFile(`${publicPath}/index.html`)
// })
// app.get('/about',(_,res)=>{
//     res.sendFile(`${publicPath}/about.html`)
// })
// app.get('/help',(_,res)=>{
//     res.sendFile(`${publicPath}/help.html`)
// })
// app.get('*',(_,res)=>{
//     res.sendFile(`${publicPath}/nopage.html`)
// })


// app.listen(4000);




//EJS(Embeeded javascript)

// const express = require('express');
// const app = express();
// const path = require('path');

// // Set view engine to EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Define a route
// app.get('/', (req, res) => {
//   res.render('index', { title: 'EJS Example', message: 'Hello, EJS!' });
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server running at http://localhost:3000');
// });


// middleware in express js
/* 
Middleware refers to functions that execute 
during the lifecycle of a request to the server
Middleware function access to the request object(req)
, the response object(res) , and the middleware function
in the applications request-response cycle.


*/


// const express=require('express');


// const app=express();


// app.use((req,res,next)=>{
//     console.log(`${req.method} ${req.url}`);
//     next();//passes control to the next middleware/route
// })

// app.get('/',(req,res)=>{
//     res.send("This is a home page");
// })
// app.get('/about',(req,res)=>{
//     res.send("This is a about page");
// })


// app.use((err,req,res,next)=>{
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// })

// app.listen(3000);
