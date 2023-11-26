const express = require('express');
const app= express();
const path = require('path');
const Swal = require('sweetalert2')



//seteo urlencoded 
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//configuro puerto


//public
/* app.use('/resources',express.static('public'));
app.use('/resources',express.static(__dirname+'/public')); */

app.use(express.static(path.join(__dirname, 'public')));

//motor de plantilla
const ejs = require('ejs');
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views')); 


app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/conjuntoH', (req, res) => {
    res.render('conjuntoH');
});
app.get('/conjuntoI', (req, res) => {
    res.render('conjuntoI');
});
app.get('/conjuntoR', (req, res) => {
    res.render('conjuntoR');
});
app.get('/bolsos', (req, res) => {
    res.render('bolsos');
});
//bcryptjs para password
const bcryptjs = require('bcryptjs');

//session
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave:'true',
    saveUnitialazed:'true'
}));


//conexion
const connection = require('./database/db');

//REGISTER
app.post('/register',async(req,res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const password = req.body.password;
    let passwordHaash = await bcryptjs.hash(password,8);
    connection.query('INSERT INTO usuario SET ?',{user:user,name:name,rol:rol,password:passwordHaash},async(error,results)=>{
        if(error){
            console.log(error)
        }else{
            res.render('register',{
                alert: true,
                alertTitle: "Registro",
                alertMessage:"Registro Exitoso!",
                alertImageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEilqJA5TbPmuqCjpuhCSYj5Yv8S50PshGD4WNq3l29yBqlR9Ejv5V4nXVPkxSmmpkZZr1CyzIdvECvynQ0hKTYtPLabO66txTzqrnl-H0QsE22NRCU12V9PYtzAVXlqqsta-eFpqSK4rhkfvuYNMJoYQf8l1-UVjy8pZSiGGlfmLWz5mzkkkVzbVJunM_I=w640-h640",
                alertImageWidth: 150,
                alertImageHeight: 150,
                ruta:''
            })
        }
    })

})

//LOGIN
app.post('/auth',async(req,res)=>{
    const user = req.body.user;
    const password = req.body.password;
    let passwordHaash = await bcryptjs.hash(password,8);
    if(user && password){
        connection.query('SELECT * FROM usuario WHERE user = ? ',[user], async(error,results)=>{
            
            if(!results||results.length==0 || !(await bcryptjs.compare(password, results[0].password))){
               
                res.render('login',{
                alert: true,
                alertTitle: "Error",
                alertMessage:"Usuario o password incorrectos",
                alertImageUrl: "https://4.bp.blogspot.com/-syXhVWFDNlo/XJvq1xJBnsI/AAAAAAAAJdY/pGeef8mUre8QLy2FPp9MAA1xUcKahig_ACLcBGAs/s640/Grumpy%2Bbear%2B2.png",
                alertImageWidth: 150,
                alertImageHeight: 150,
                ruta:'login'
                })
            }else{
                req.session.loggedin = true;
                req.session.name=results[0].name;
                res.render('login',{
                    alert: true,
                alertTitle: "¡Bienvenido otra vez!",
                alertMessage:"Login correcto",
                alertImageUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEhwSB-p6wChNLqCP0nI0tBhiiLuC71Rnv_6Px3rrtq3URgVU7tKRGwB9SdRzeMyD2H695vJBmKMcFz5fXvg5l9cgD8rbgd4beh5wPQZf4VNc-XEpfAYyWNEuiwkKhn-JzkTiV7UNVpDqJUBw1GRQe3VUJ8rkhKzconRErq7e3lOZWp0gP6o5VlqpyJuWc8=w456-h640",
                alertImageWidth: 150,
                alertImageHeight: 300,
                ruta:''
                })
            }
        })
    }else{
        res.render('login',{

            alert: true,
                alertTitle: "Error",
                alertMessage:"Porfavor ingrese un usuario y/o password",
                alertImageUrl: "https://4.bp.blogspot.com/-syXhVWFDNlo/XJvq1xJBnsI/AAAAAAAAJdY/pGeef8mUre8QLy2FPp9MAA1xUcKahig_ACLcBGAs/s640/Grumpy%2Bbear%2B2.png",
                alertImageWidth: 150,
                alertImageHeight: 150,
                ruta:'login'

        })
    }

}
)

//autenticacion
app.get('/',(req,res)=>{
    if(req.session.loggedin){
        res.render('index',{
            login: true,
            name: req.session.name
        });
    }else{
            res.render('index',{
                login:false,
                name: 'Debe iniciar sesion'
            })
        
    }
})

//logout
app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})

app.set('port', process.env.PORT||4000);
app.listen(app.get('port'),()=>
console.log('Server is listening on port',app.get('port')
 )
);






