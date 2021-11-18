import { Router } from 'express'
const router=Router();

import * as postCtrl from '../controllers/post.controller';
const { checkToken } = require('../auth/token_validation')
router.get('/',checkToken,postCtrl.readAllPosts);
router.post('/',checkToken,postCtrl.createPost);
router.put('/:id',checkToken,postCtrl.updatePost);
router.get('/:id',checkToken,postCtrl.readPost);
router.delete('/:id',checkToken,postCtrl.delPost);
export default router;