import { model, Schema } from "mongoose";
import { IAdministrator, TAccess } from "./admin.interface";
import { VALID_ACCESS_VALUES } from "./admin.constant";


const administratorSchema = new Schema<IAdministrator>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  access: {
    type: [String],
    validate: {
        validator: function (values) {
            return values.every((value: TAccess) => VALID_ACCESS_VALUES.includes(value));
        },
        message: props => `Invalid access values: ${props.value}. Allowed values are ${VALID_ACCESS_VALUES.join(", ")}.`
    }
  }
}, {
  timestamps: true,
  versionKey: false
});


const AdministratorModel = model<IAdministrator>("Administrator", administratorSchema);
export default AdministratorModel;