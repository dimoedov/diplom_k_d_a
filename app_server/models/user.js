let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');

let UserSchema = new Schema({
  username: {
        type: String,
        unique: true,
        required: true
    },
  password: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    middle_name: {
        type: String,
        required: false
    },
    position: {
        type: String,
        required: false
    }
});

// кодирование пароля с помощь bcrypt
UserSchema.pre('save', function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        // создание сальта для кодирования пароля
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            //кодирование пароля
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                // ставим кодированный пароль вместо введённого пользователем
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
