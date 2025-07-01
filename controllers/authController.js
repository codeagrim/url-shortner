import {usermodel} from "../models/auth.model.js"


async function HandleSignup(req,res)
{

    const {username, email, password} = req.body;


    const existingUser = await usermodel.findOne({email})
   
    if(existingUser)
    {
        res.status(400).json({
            message: "User Already Exists"
        })
    }


    const newuser = usermodel.create({
        username,
        email,
        password
    })
    
    res.status(201).json({ message: 'User registered successfully' });
}


async function HandleLogin(req, res)

{


    const {email , password} = req.body;

    const user = await usermodel.findOne({email, password})
    
    if(!user){
        res.json({message: "User Not Found !! Sign Up First"})
    }

    

}


export { HandleLogin, HandleSignup};