const {OAuth2Client} = require('google-auth-library')
const studentModel = require('../models/student.model')
const instructorModel = require('../models/instructor.model')
const adminModel = require('../models/admin.model')
const bcrypt = require('bcrypt')
const {v4: uuidv4} = require('uuid')

const uuid = uuidv4()

const getUserDetailsViaAuth = async(access_token) => {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`)
    const data = await response.json()
    return data
}

const sendAuthRequest = async(req,res,next) => {
    const code = req.query.code

    try{
        const redirectUrl = "http://127.0.0.1:4000/oauth"

        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID, 
            process.env.CLIENT_SECRET, 
            redirectUrl
        )

        const response = await oAuth2Client.getToken(code)
        await oAuth2Client.setCredentials(response.tokens)
        console.log('Token Received!')
        const user = oAuth2Client.credentials
        const userData = await getUserDetailsViaAuth(user.access_token)
        
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(uuid, saltRounds);

        //check provided email is already registered as any role
        const duplicate = await studentModel.findOne({ email: userData.email }).exec();

        // if (!duplicate) {
        //     duplicate = await instructorModel.findOne({ email: userData.email }).exec();
        // }

        // if (!duplicate) {
        //     duplicate = await adminModel.findOne({ email: userData.email }).exec();
        // }

        if (!duplicate) {
            try {
                await studentModel.create({
                  email: userData.email,
                  username: userData.name,
                  password: hashedPassword,
                  profile_picture: userData.picture,
                });
            
              } catch (error) {
                res.redirect(`http://localhost:3000/create-account/student`)
              }
        }
            const serializedObject = encodeURIComponent(JSON.stringify(userData))
            res.redirect(`http://localhost:3000/sign-in?data=${serializedObject}`);
    }
    catch(error){
        console.log('Error occured when signing in with google!');
        response.redirect('http://localhost:3000');
        console.log(error.message)  
    }
}

module.exports = {sendAuthRequest}