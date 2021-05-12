const Post = require('../models/postModel');
const User = require('../models/userModel');
const spaceXApiProvider = require('../providers/spaceXApiProvider');



// permet de ne rendre visible les post qu'aux users
// fonctionne avec postman mais je n'arrivee à le rendre compatible avec le front
// exports.listAllPosts = (req, res) => {
//     User.findOne({
//         email: req.body.email
//     }, (error, user) => {
//         // Si l'utilisateur n'est pas trouvé
//         if (error) {
//             res.status(500);
//             console.log(error);
//             res.json({
//                 message: "Erreur serveur."
//             });
//         }
//         // Si l'utilisateur est trouvé
//         else {
//             // Si l'email et le mot de passe correspondent
//             if (user != null) {
//                 Post.find({}, (error, posts) => {
//                     if (error) {
//                         res.status(500);
//                         console.log(error);
//                         res.json({
//                             message: "Erreur serveur."
//                         });
//                     } else {
//                         res.status(200);
//                         res.json(posts);
//                     }
            
//                 })
//             }
//             else {
//                 res.status(403);
//                 console.log(error);
//                 res.json({
//                     message: "Authentification incorrect."
//                 });
//             }
//         }
//     })
// }

exports.listAllPosts = (req, res) => {
    Post.find({}, (error, posts) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            res.status(200);
            res.json(posts);
        }
    });
}

exports.createAPost = (req, res) => {
    let newPost = new Post(req.body);

    // let lastMission = spaceXApiProvider.getLastMission();
    let lastLaunche = spaceXApiProvider.getLastLaunche();

    // lastMission.then(response => {
    lastLaunche.then(response => {




        if (!newPost.content) {
            console.log(response)
            // newPost.content = response.description;
            newPost.content = response.details;
        }

        newPost.save((error, post) => {
            if (error) {
                res.status(500);
                console.log(error);
                res.json({
                    message: "Erreur serveur."
                });
            } else {
                res.status(201);
                res.json(post);
            }
        });


        
    });
}

// exports.createAPost = (req, res) => {
//     let newPost = new Post(req.body);

//     // let lastMission = spaceXApiProvider.getLastMission();
//     let lastLaunche = spaceXApiProvider.getLastLaunche();

//     // lastMission.then(response => {
//         User.findOne({
//             email: req.body.email
//         }, (error, user) => {
//             // Si l'utilisateur n'est pas trouvé
//             if (error) {
//                 res.status(500);
//                 console.log(error);
//                 res.json({
//                     message: "Erreur serveur."
//                 });
//             }
//             // Si l'utilisateur est trouvé
//             else {
//                 // Si l'email et le mot de passe correspondent
//                 // Vérifie que le user existe et qu'il possède le rôle d'admin pour pouvoir poster
//                 console.log("test" + user)
//                 if (user != null && user.admin === true) {
//                     lastLaunche.then(response => {

//                         if (!newPost.content) {
//                             console.log(response)
//                             // newPost.content = response.description;
//                             newPost.content = response.details;
//                         }
                
//                         newPost.save((error, post) => {
//                             if (error) {
//                                 res.status(500);
//                                 console.log(error);
//                                 res.json({
//                                     message: "Erreur serveur."
//                                 });
//                             } else {
//                                 res.status(201);
//                                 res.json(post);
//                             }
//                         });                    
//                     });
//                 }
//                 else {
//                     res.status(403);
//                     console.log(error);
//                     res.json({
//                         message: "Authentification incorrect."
//                     });
//                 }
//             }
//         })
// }

exports.getAPost = (req, res) => {
    Post.findById(req.params.id_post, (error, post) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            res.status(200);
            res.json(post);
        }
    })
}

exports.updateAPost = (req, res) => {
    Post.findByIdAndUpdate(req.params.id_post, req.body, {
        new: true
    }, (error, post) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            res.status(200);
            res.json(post);
        }
    })
}

exports.deleteAPost = (req, res) => {
    Post.findByIdAndDelete(req.params.id_post, (error) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        } else {
            res.status(200);
            res.json({
                message: "Article supprimé"
            });
        }
    });
}