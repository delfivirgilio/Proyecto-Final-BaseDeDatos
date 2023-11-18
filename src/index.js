
import express from 'express'
import {engine} from 'express-handlebars'
import {join, dirname} from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'

//inicio
const app= express();
const __dirname = dirname(fileURLToPath(import.meta.url))
//configuro
app.set('port', process.env.PORT||4000);
app.set('views', join(__dirname,'views'));
app.engine('.html',engine({
    defaultLayout: 'index',
    layoutsDir: join(app.get('views'),'layouts'),
    partialsDir:join(app.get('views'),'partials'),
    extname:'.html'
}));

app.set('view engine', 'html');


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//var globales

//rutas 
app.get('/',(req,res)=>{
    res.json({"message":"Hola"});
})

//publico
app.use(express.static(join(__dirname, 'public')));

//server
        app.listen(app.get('port'),()=>
        console.log('Server is listening on port',app.get('port')
         )
        );














