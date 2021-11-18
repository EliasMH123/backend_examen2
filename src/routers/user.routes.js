import { Router } from 'express'
const router=Router();
import * as userCtr from '../controllers/user.controller'
const {checkToken}=require('../auth/token_validation')
router.post('/',userCtr.createUser);
export default router;