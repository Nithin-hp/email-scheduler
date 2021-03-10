import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    emailAddress: {
      type: String,
     
    },
    failed:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
