import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "YOUR_CLOUD_NAME",
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

type Data = string[] | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const resources = await cloudinary.v2.api.resources({
      type: "upload",
      prefix: "my-folder",
      max_results: 20,
    });
    const urls = resources.resources.map(
      (resource: any) => resource.secure_url
    );
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: "Error fetching images" });
  }
}
