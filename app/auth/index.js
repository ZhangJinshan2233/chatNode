const passport=require ('passport');
const config=require('../config');
const FacebookStrategy=require('passport-facebook').Strategy;
const h=require('../helpers')
module.exports=()=>{
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    });

    passport.deserializeUser((id,done)=>{
        h.findById(id)
        .then(user=>{
            done(null,user)

        })
        .catch(error=>{
            console.log('Error when deserializing the user')
        })
    })
    
    let authProcessor=(accessToken,refreshToken,profile,done)=>{
        //find a user in the local db using profile.id
        //if the user is found, return the user data useing the done()
        //if the user not found,create one in the local db and return 
        h.findOne(profile.id)
        .then(result=>{
            if(result){
                done(null,result);
            }else{
                //create a new user and return
                h.createNewUser(profile)
                .then(newChatUser=>{
                    done(null,newChatUser)
                })
                .catch(error=>{
                    console.log('Create New User Error');
                })
            }
        })
    }
 
    passport.use(new FacebookStrategy(config.fb,authProcessor));
}