const {OAuth2Client} = require('google-auth-library')

const generateAuthUrl = async(req,res,next) => {
    req.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.header('Referrer-Policy', 'no-referrer-when-downgrade')
    
    const redirectUrl = 'http://127.0.0.1:4000/oauth'
    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID, 
        process.env.CLIENT_SECRET, 
        redirectUrl
    )

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile' ,'https://www.googleapis.com/auth/userinfo.email'],
        prompt: 'consent'
    })

    res.json({url : authorizeUrl})
}

module.exports = {generateAuthUrl}