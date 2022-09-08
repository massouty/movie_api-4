const mongoose = require ("mongoose");
let movieSchema = mongoose.Schema({Title:{type:string , required:true},
Description:{type:String , required:true},
Genre:{
    Name:String,
    Description:String
},
Director:{
    Name:String,
    Bio:String
},
ImagePath:String,
Featured:Boolean
});

let userSchema = mongoose.Schema({userName:{type:string , required:true},
password:{type:string , required:true},
email:{type:string,required:true},
Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;