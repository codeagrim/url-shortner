import jwt from 'jsonwebtoken';
import { usermodel } from '../models/auth.model.js';

const authCheck = async(req,res,next) =>
    {

        try {

        // Get token from Authorization header (Bearer <token>)

        const token = req.header('Authorization')?.replace('Bearer ', '');
        // console.log(token);
         if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await usermodel.findOne({_id: decoded.id});

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

 // Attach user to request object
    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }


}

export {authCheck}