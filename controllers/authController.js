import usermodel from "../models/auth.model"


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

    

    
}


async function HandleLogin(req, res)

{


    const {email , password} = req.body;

    const user = await usermodel.findOne({email})
    
    if(!user){
        res.json({message: "User Not Found !! Sign Up First"})
    }


}


export { HandleLogin, HandleSignup}