import QRCode from 'qrcode';
import { customAlphabet, nanoid } from "nanoid";
import { urlmodel } from "../models/url.model.js";



async function HandleDashboard(req, res){

  try {
    const userId = req.user._id;
    const urls = await urlmodel.find({ createdBy: userId });

    return res.status(200).json(urls);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function HandleShortenUrl(req, res) {

    const { originalUrl } = req.body; // req.body.originalUrl
    
    try {

    let url = await urlmodel.findOne({ originalUrl });
    if(url){
       return res.status(409).json({
        message: "Url Already Exists"
        , shortId: url.shortUrl})
    }

    // it generates id with length 8
    const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',8)
    const shortID = nanoid()
    await urlmodel.create({
      originalUrl,
      shortUrl: shortID,
      // createdBy: req.user._id,
    });

    res.status(200).json({ shortId: `${shortID}` });
  } catch(err) {
    res.status(500).json({ error: `Server error ${err}`});
  }
}



async function HandleRedirectUrl (req, res)
{
  try{
     const shortid = req.params.shortid;
  const url = await urlmodel.findOne({shortUrl: shortid}) 

  if(!url){
   return res.status(404).json({error: 'URL not found'})
  }

  // increment click when someone redirect
  url.clicks += 1;

  // update LastVisited
    url.lastVisited = new Date();

  await url.save();

  res.redirect(url.originalUrl)
  
}

  catch(err){
    res.status(500).json({ success: false,
  message: err.message })
  }
 
}


async function HandleUrlAnalytics(req,res){

    const shortid = req.params.shortid;
    try{

      const url = await urlmodel.findOne({shortUrl : shortid})
      if(!url)
      {
       return res.status(404).json({error: 'URL not found'})
      }

      res.json({
      shortid,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
    });

    }

    catch(err){
        res.json({success: false, message: err.message})

    }
  

}

async function HandleQRCode(req,res) {
  

  try{

  const shortid = req.params.shortid;

const url = await urlmodel.findOne({ shortUrl: shortid });

  // const url = await urlmodel.findOne({shortUrl: shortid})

  if(!url)
  {
   return res.status(404).json({error: 'URL not found'})
  }

  const redirectUrl = `${process.env.BASE_URL}/${url.shortUrl}`

    QRCode.toDataURL(redirectUrl)
  .then(url => {
    // res.setHeader('Content-Type', 'image/png'); // response body will be a PNG image
    // res.send(Buffer.from(url.split(',')[1], 'base64'));  // Converts the base64-encoded string into a binary buffer
    res.json({QRimage: url})
  })
  .catch(err => {
    console.error('QR generation failed:', err);
    res.status(500).json({ message: 'QR generation failed' });
  });

  }

  catch(err){
    res.status(500).json({message: err.message})
  }

}

export { HandleDashboard, HandleShortenUrl, HandleRedirectUrl, HandleUrlAnalytics , HandleQRCode};

