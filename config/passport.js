const jwtStrategy  = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User  = mongoose.model('users');
const keys  = require('../config/keys');
const opts = {};
opts.jwtFormRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretKey  = keys.secretKey;

module.exports = passport=>{
passport.use(new jwtStrategy(opts,(jwt_payload, done)=>{
  User.findById(jwt_payload.id)
      .then(user=>{
      	if(user){
      		return done(null,user);
      	}
      	return done(null,false);
      })
      .catch(err=>console.log(err)); 
}));
};