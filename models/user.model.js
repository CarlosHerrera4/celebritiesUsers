const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Creamos esquema de usuario
const userSchema = new mongoose.Schema({
    email: {
       type: String,
       require: 'Email is required',
       unique: true
    },
    password:{
        type: String,
        require: 'Password is required'
    }
});

userSchema.pre('save', function(next) {
    // Si la password no ha sido modificada saltamos a la siguiente función (next)
    if (!this.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(saltRounds)
        .then((saltValue) => {    //saltValue es lo que devuelve bcrypt.genSalt
            return bcrypt.hash(this.password, saltValue);   
        })
        .then((hash) => {        // hash es la contraseña encriptada del bcrypt.hash()
            this.password = hash;
            console.log(this.password)
            next();
        })
});

userSchema.methods.checkPassword = function(passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password)
}

module.exports = mongoose.model('User', userSchema);



