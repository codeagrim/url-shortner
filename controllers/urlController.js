import { customAlphabet, nanoid } from "nanoid";
import { urlmodel } from "../models/url.model.js";

async function HandleShortenUrl(req, res) {

    const { originalUrl } = req.body; // req.body.originalUrl
    
    try {

    let url = await urlmodel.findOne({ originalUrl });
    if(url){
       return res.json({
        message: "Url Already Exists"
        })
    }

    // it generates id with length 8
    const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',8)
    const shortID = nanoid()
    await urlmodel.create({
      originalUrl,
      shortUrl: shortID,
    });

    res.status(200).json({ shortId: `${shortID}` });
  } catch(err) {
    res.status(500).json({ error: `Server error ${err}`});
  }
}

export { HandleShortenUrl };
