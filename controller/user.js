const service = require('../service');
const { userSignInSchema, userSignUpSchema, userUpdateSchema } = require('../service/schemas/userJoi');
const User = require('../service/schemas/user');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const secret = process.env.SECRET;

const getAll = async (req, res, next) => {
  try {
    const results = await User.find();
    res.status(200).json(results);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const singUp = async (req, res, next) => { 
    try {
        const allUsers = await service.getAllUsers();
        const { email, password, firstName, repeatedPassword } = await req.body;

        const confirmedPassword = password === repeatedPassword;
        if (!email || !password || !confirmedPassword) { 
            return res.status(400).json({ message: 'Missing field!' });
        }

        if (allUsers.includes(email)) {
            return res.status(409).json({ message: 'Email is in use!' });
        }

        const { error } = userSignUpSchema.validate({ email: email, password: password, });
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const verificationToken = uuidv4();
    
        const newUser = await service.registerUser({ email, password, firstName, verificationToken});
        
        if (!newUser) {
            res.status(409).json({ message: `Can't create user!` });
        } else { 
            res.status(201).json(newUser);
        }
    } catch (error) { 
        console.error(error.message);
        next(error);        
    }
}; 

const login = async (req, res, next) => {
    try { 
        const { email, password} = await req.body;

        const { error } = userSignInSchema.validate({ email: email, password: password, });
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const user = await service.getUserByEmail({ email });
        
        if (!user || !user.validPassword(password)) { 
            res.status(401).json({ message: 'Email or password is wrong' });
            return;
        }

        const payload = {
            id: user.id,
            email: user.email,
        };

        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        user.token = token;
        await user.save();
        res.status(200).json({ token, user: {email: user.email, } });

    } catch (error) { 
        next(error);  
    }
};

// punkt wylogowania od Dawida do przekopiowania, mój poniżej

// const logout = async (req, res, next) => {
//     try { 
//         const user = await service.getUserById({ _id: req.user._id});
//         if (!user) { 
//             res.status(401).json({ message: 'Not authorized' });
//             return;
//         }

//         await service.updateUser( user.id, { token: null } );
//         res.status(204).json();
//     } catch (error) { 
//         console.error(error.message);
//         next(error);  
//     }
// };

const current = async(req, res, next) => {
    const user = req.user;
    if (user) {
        return res.status(200).json({ message: "Current user", email: user.email, firstName: user.firstName, balance: user.balance, });
    } else {
        return res.status(401).json({ message: 'Not authorized' });
    }
};
    
const updateUserDetails = async (req, res, next) => { 
    try { 
        const { email, password, firstName } = await req.body;

        const { error } = userUpdateSchema.validate({ email: email, password: password, firstName: firstName});
        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }
        const user = await service.getUser({ token: req.user.token });
        if (!user) { 
            res.status(401).json({ message: 'Not authorized' });
            return;
        }
        const newUser = await service.updateUser(user.id, { email, password, firstName });
        res.status(200).json({ email: newUser.email, password: newUser.password, firstName: newUser.firstName });

    } catch (error) { 
        console.error(error.message);
        next(error);  
    }
};

module.exports = {
    getAll, singUp, login,
    // logout,
    current, updateUserDetails,
};