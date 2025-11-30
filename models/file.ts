import mongoose, { Schema, model, models } from "mongoose";

const FileSchema = new Schema(
  {
    filename: { type: String, required: true },
    owner: { type: String, required: true },
    allowedUsers: [{ type: String }],
    cloudinaryFileUrl: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
  },
  { timestamps: true }
);

const File = models.File || model("File", FileSchema);
export default File;
