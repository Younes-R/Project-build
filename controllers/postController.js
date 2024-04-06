const Post = require('../models/post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
//const { MongoClient } = require('mongodb');

const post_test2 = ( req, res) => {
    crt = req.body.sea
    console.log(crt);
    Post.find({ $or: [ {startPoint: crt}, {endPoint: crt} ] })   
    .then( result => res.render('index', { posts: result, title: 'Search Results'}))
    .catch( err => console.log(err))
}

const post_test = (req, res) => {
    crt = req.body.sea
    Post.find({startPoint: crt})
    .then( result =>{
        console.log(result)
        //res.render('index', {posts: result, title: 'Search Results'})
        res.json(result)
    } )
    .catch( err => console.log(err));
   /* crt = req.body.sea;
    result =  Post.find({startPoint:'blida'}) ;
    console.log(result)

    user = {
        "id": 123,
        "name": "Alice",
        "email": "alice@example.com"
      }
    console.log((req.body.sea));*/
}



const post_index2 = (req, res) => {
    Post.find({startPoint: "blida"})
        .then( result => res.render('index', {posts: result, title: 'All posts'}))
        .catch( err => console.log(err));

};

const post_index = (req, res) => {
    Post.find().sort( {createdAt: -1} )
        .then( result => res.render('index', {posts: result, title: 'All posts'}))
        .catch( err => console.log(err));

};

const post_details = (req, res) => {
    const id = req.params.id;
    //const db = MongoClient.db('Cluster0');
    //const cursor = db.collection('first-try/posts').find({_id: id})
    //console.log(cursor) ;
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, ' net ninja seret ');
    const userId = decoded.id;
    


    Post.findById(id)
        .then( result => res.render('details', { post: result, title: 'Post Details', userId : userId }))
        .catch( err => {
            console.log(err);
            res.render('404', {title: 'Post not found' });
        });
}

const post_create_get = (req, res) => {
    res.render('create', { title: 'Create a new post' });
}

const post_create_post = (req ,res) => {

    console.log(req.body.startPoint);
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, ' net ninja seret ');
    const userId = decoded.id;
    const people = [];
    const { startPoint, endPoint, body, price, seatsNumber } = req.body;
    const post = new Post( { startPoint, endPoint, body, price, seatsNumber, userId, people } );
    post.save()
        .then( result => res.redirect('/posts'))
        .catch( err => console.log(err));
}

const post_delete = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id)
        .then( result => res.json( {redirect: '/posts'}))
        .catch( err => console.log(err));
}

const post_update =  async(req, res) => {
    const id = req.params.id;
    //const post = Post.findById(id).exec();
    //console.log(post)
    //post.seatsNumber = post.seatsNumber - 1;
    //await post.save();
    console.log( Post.findOne(id) )


   // await Post.findOneAndUpdate(
    //    {_id: id},
   //     {$set: {seatsNumber : 11}},
   //     { new: true }
   // )

   const token = req.cookies.jwt;
   const decoded = jwt.verify(token, ' net ninja seret ');
   const userId = decoded.id;

   Post.findById(id)
   .then( (result) => {
        if (  !(result.people.includes(userId) ) ) {
            result.people.push(userId) ;
            result.seatsNumber = result.seatsNumber - 1 ;
            result.save() ;
            console.log('someone is added to the trip yaa !')
       }
        ;

   })
   .catch( err => {
       console.log(err);
       res.render('404', {title: 'Post not updated' });
   });

    
   

}

module.exports = { post_index, post_details, post_create_get, post_create_post, post_delete, post_index2, post_test, post_test2, post_update }