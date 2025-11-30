// import { NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File;

//     if (!file) {
//       return NextResponse.json({ error: "No file received" }, { status: 400 });
//     }

//     // convert file → buffer
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Upload to Cloudinary (as raw file)
//     const uploadResult = await new Promise((resolve, reject) => {
//       cloudinary.uploader.upload_stream(
//         { resource_type: "raw" },
//         (err, result) => {
//           if (err) reject(err);
//           else resolve(result);
//         }
//       ).end(buffer);
//     });

//     return NextResponse.json(uploadResult);
//   } catch (err: any) {
//     console.error("UPLOAD ERROR:", err);
//     return NextResponse.json(
//       { error: err.message || "Upload failed" },
//       { status: 500 }
//     );
//   }
// }








import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    // --- NEW PART: preserve filename + extension ---
    const originalName = file.name; // e.g. "myfile.txt.enc"

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",           // must be RAW
          public_id: originalName,        // keep full filename WITH .enc
          use_filename: true,             // use this name
          unique_filename: false,         // do NOT randomize
          filename_override: originalName // force Cloudinary to keep it
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json(uploadResult);
  } catch (err: any) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
