const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017')
  .then(() => {
    console.log('You have successfully connected to MongoDB');
  })
  .catch(error => console.log('There is an error: ' + error));


const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  }
});

// Define method on the schema
userSchema.methods.display = function () {
 
  console.log('Hello ' + this.name);
};

userSchema.pre('save',async function(next){
  const check = await this.constructor.findOne({ name: this.name });
  if (check)
  {
    console.log('Document found. Connot save duplicate user.')
    return next(new Error('This document is found'));
  }
  else {
    console.log('Document saved!')
    next();
  }

})
const User = mongoose.model('User', userSchema);
const zack = new User({ name: 'Kutullo Innocent', surname: 'Moropane' });

// Now you can call the display method on the zack instance
zack.display();
zack.save().catch(error => console.error(error));
