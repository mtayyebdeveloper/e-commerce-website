import {createContactController} from '../controllers/Contact.controller.js'
import jwtVerify from '../middlewares/jwt.middleware.js'
import express from 'express'

const ContactRouter =express.Router()

ContactRouter.route("/contact").post(jwtVerify,createContactController)

export default ContactRouter