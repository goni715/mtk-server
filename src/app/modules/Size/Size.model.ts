import { model, Schema } from "mongoose";
import { IDining } from "./Size.interface";


const diningSchema = new Schema<IDining>({
    name: {
        type: String,
        required: true,
        trim:true
    },
    slug: {
        type: String,
        required: true,
        trim: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Restaurant",
    },
},{
    timestamps: true,
    versionKey: false
})



const DiningModel = model<IDining>("Dining", diningSchema);
export default DiningModel;