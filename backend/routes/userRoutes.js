import express from 'express'
const router = express.Router()
import {
  createSchdule,
  getAllSchedules,
  sendEmail,deleteschedule,updateschedule,failedEmails
} from '../controllers/userController.js'


router.route('/schedule').post(createSchdule).get(getAllSchedules)
router.route('/schedule/:id').delete(deleteschedule).put(updateschedule)
router.route('/sendEmail').post(sendEmail)
router.route('/failedEmails').get(failedEmails)
export default router
