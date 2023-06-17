import mogoose from 'mongoose';


const notificationSchema = new mogoose.Schema({
    user: {
        type: mogoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
        

    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
})
 

export default mogoose.model('Notification', notificationSchema);
