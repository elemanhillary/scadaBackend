import dotenv from 'dotenv';
import request from 'request';
import debug from 'debug';

dotenv.config();
export const upload = async (req, res) => {
  debug.log(req);
  try {
    if (req.file === undefined) {
      return res.status(400).json({
        error: req.file,
      });
    }
    const subscriptionKey = process.env.MS_APIKEY;
    const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/vision/v2.1/analyze';
    const imageUrl = req.file.secure_url;
    const params = {
      visualFeatures: 'Categories,Description,Color',
      details: '',
      language: 'en',
    };

    const options = {
      uri: uriBase,
      qs: params,
      body: '{"url": ' + '"' + imageUrl + '"}',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
    };
    request.post(options, (error, response, body) => {
      if (error) {
        res.status(404).status({ error });
      }
      const jsonResponse = JSON.parse(body);
      return res.status(200).json({
        caption: jsonResponse.description.captions[0].text,
        image: imageUrl,
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: 'something went wrong',
    });
  }
};
