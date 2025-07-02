import {usermodel} from "../models/auth.model.js"


async function HandleSignup(req,res)
{

    const {username, email, password} = req.body;


    const existingUser = await usermodel.findOne({email})
   
    if(existingUser)
    {
        return res.status(400).json({
            message: "User Already Exists"
        })
    }


    const newuser = await usermodel.create({
        username,
        email,
        password
    })
    
    return res.status(201).json({ message: 'User registered successfully' });
}


async function HandleLogin(req, res)

{


    const {email , password} = req.body;

    const user = await usermodel.findOne({email, password})
    
    if(!user){
        return res.json({message: "User Not Found !! Sign Up First"})
    }

    const isMatch = await bcrypt.compare(password, user.password);


}


export { HandleLogin, HandleSignup};