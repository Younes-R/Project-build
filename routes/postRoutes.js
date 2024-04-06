const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/create',postController.post_create_get);
router.get('/', postController.post_index);
router.post('/', postController.post_create_post);
router.get('/:id', postController.post_details);
router.delete('/:id', postController.post_delete);

router.put('/:id', postController.post_update); 
//router.get('/finding', postController.post_index2);
router.post('/test',postController.post_test);
router.post('/test2',postController.post_test2);

module.exports = router;
