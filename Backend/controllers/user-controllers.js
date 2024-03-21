import { compareSync, hashSync } from "bcryptjs";
import User from "../models/User";

export const getAllUsers = async (req, res) => {
    let users ;
    try{
        users = await User.find(); 
    }catch(err){
        return console.log(err); 
    }
    if(!users){
        return res.status(500).json({message: "Unexpected Error occured"}); 
    }
    return res.status(200).json({users});
}
export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 6) {
        return res.status(422).json({ message: 'Invalid Data' });
    }

    const saltRounds = 10; // Number of salt rounds for hashing
    const hashed_password = hashSync(password, saltRounds); // Providing the salt rounds to the hashSync function

    let user;
    try {
        user = new User({ email, name, password: hashed_password });
        await user.save();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    if (!user) {
        return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(201).json({ message: 'User is created' , user});
};
export const login = async(req, res, next) => {
    const {email, password} = req.body ; 
    if (!email || email.trim() === '' || !password || password.length < 6) {
        return res.status(422).json({ message: 'Invalid Data' });
    }
    let existingUser ; 
    try{
        existingUser = await User.findOne({email}); 
    }
    catch(err){
        return console.log(err); 
    }
    if(!existingUser){
        return res.status(404).json({message: 'no user found'})  ;
    }
    // check user's password
    const isPasswordCorrect =compareSync(password, existingUser.password); 
    if(!isPasswordCorrect){
        return res.status(400).json({message: "incorrect password"})
    }
    return res.status(200).json({id: existingUser._id, message: 'login successfull'}); 
}
export const getUserById = async (req, res) => {
    const id = req.params.id;
    let user;
    try{
        user = await User.findById(id).populate("posts");

    }
    catch(err){
        return console.log(err); 
    }
    if(!user){
        return res.status(404).json({message: "No user found "});
    }
    return res.status(200).json({user}); 
}