import {Contact} from '../models/Contact.model.js'
import {TryCatch} from '../middlewares/error_handle.middleware.js'

const createContactController =TryCatch(async(req,res)=>{
    const data =req.body;
    
    if(!data){
        return res.status(201).json({message:"Please fill the all feilds"})
    }

    const contact =await Contact.create(data)

    if(!contact){
        return res.status(201).json({message:"Server error cannot sended your contact"})
    }

    return res.status(200).json({
        message:"Contact sended successfully please wait...",
        data:contact
    })
})

export {createContactController}