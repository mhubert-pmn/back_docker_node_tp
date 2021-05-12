const postController = require('../controllers/postController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

module.exports = (server) => {
    server.route('/posts')
        .get(jwtMiddleware.verifyToken)
        .get(postController.listAllPosts)
        .post(jwtMiddleware.verifyTokenAdmin)
        .post(postController.createAPost);

    server.route('/posts/:id_post') // req.params.id_post
        .get(postController.getAPost)
        .put(postController.updateAPost)
        .delete(postController.deleteAPost);
}