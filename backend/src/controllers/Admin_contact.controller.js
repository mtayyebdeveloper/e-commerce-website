import {Contact} from '../models/Contact.model.js'
import {TryCatch} from '../middlewares/error_handle.middleware.js'

const GetAllContactsController = TryCatch(async (req, res) => {
    const contacts = await Contact.find({});
    if (!contacts) {
        return res.status(400).json({
            success: false,
            message: "no conatcs found",
        });
    }
    res.status(200).json({
        success: true,
        data: contacts,
    });
});

const DeleteContactController = TryCatch(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "contact id is required",
        });
    }
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
    res.status(200).json({
        success: true,
        message: "Contact deleted successfully",
    });
});

export {GetAllContactsController,DeleteContactController}