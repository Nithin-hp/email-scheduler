import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import nodemailer from 'nodemailer'

const createSchdule = asyncHandler(async (req, res) => {
  const { email } = req.body
 
  const product = new User({
    emailAddress:email
  })
 
  const createdProduct = await product.save()
  console.log(createdProduct)
  res.status(201).json(createdProduct)
})



//route get for all schedules
const getAllSchedules = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

const sendEmail =async(req,res)=>{
const users = await User.find({}).select('emailAddress failed ')



for(var i=0;i<users.length;i++){
 try{
  const mailoptions={
    from:'norbert30@ethereal.email',
    to:users[i].emailAddress,
    subject:"schduler",
    text:"hello from scheduler"
  }
//@dec fake smpt service by Ethereal
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'elbert.wolf@ethereal.email',
      pass: 'xFXvcWrst1veTmMGYb'
  }
});
   let info=await transporter.sendMail(mailoptions)
   //@dec checking for the rejected emails and if found marking failed in against particaular user  
    if(info.rejected>0){
      for(var j=0;j<info.rejected;j++)
    {
       if(users[i].emailAddress== info.rejected[j]){
          users[i].failed=true
          await users[i].save()
        

    }}
   }
  }catch(error ){
    console.log(error)
  }
}

res.json(users)

}
const deleteschedule = asyncHandler(async (req, res) => {
  const deletedUser = await User.findById(req.params.id)

  if (deletedUser) {
    await deletedUser.remove()
    res.json({ message: 'User deleted' })
  } else {
    res.status(404)
    throw new Error('user not found')
  }

})
const updateschedule = asyncHandler(async (req, res) => {
  const {
   email
  } = req.body

  const user = await User.findById(req.params.id)

  if (user) {
    user.emailAddress=email
    const updateduser = await user.save()
    res.json(updateduser)
  } else {
    res.status(404)
    throw new Error(' user not found')
  }
})

const failedEmails = asyncHandler(async (req, res) => {
  const users = await User.find({failed:true})
  if(users.length>0){
  res.json(users)}
  else{
    res.json({message:"No failed emails"})
  }
})


export {
  
  createSchdule,getAllSchedules,sendEmail,deleteschedule,updateschedule,failedEmails
}
