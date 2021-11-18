import { Pool } from 'pg'
export const pool=new Pool({
    host:'ec2-107-23-135-132.compute-1.amazonaws.com',
    user:'wohwdtlrdeciqq',
    password:'01f28fdbd4aa13c39be3bf8f46c13aeb4d1f983d1456542a1528b22ea5417354',
    database:'d54aomo8o384u2',
    port:5432,
    ssl:{rejectUnauthorized:false}
});