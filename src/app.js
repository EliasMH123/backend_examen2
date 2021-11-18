import express from 'express';
import morgan from 'morgan';
import postRoutes from './routers/post.routes';
import authRoutes from './routers/auth.routes';
import userRoutes from './routers/user.routes';

const app=express();
var cors=require('cors');
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.get('/',function(req,res,next){
    res.send('Bienvenido a Node JS ....');
});
app.use('/api/auth',authRoutes);
app.use('/api/auth/user',userRoutes);
app.use('/api/auth/post',postRoutes);
export default app;