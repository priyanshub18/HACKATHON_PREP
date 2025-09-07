import mongoose from "mongoose";


const logsSchema = new mongoose.Schema({
   productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    movementType: {
        type: String,
        required: true,
        enum: ['in', 'out']
    },
    quantity: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    }
}, { timestamps: true });   

const Logs = mongoose.model('Logs', logsSchema);

export default Logs;