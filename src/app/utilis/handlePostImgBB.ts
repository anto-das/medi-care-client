import { env } from "@/env";
export const imgBB = async (file: File) => {
  // console.log("file from img bb deployment: ", file);
  try {
    let directUrl = "";
    const formData = new FormData();
    formData.append("image", file);

    const imgResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${env.NEXT_PUBLIC_HOSTING_IMG_KEY}`,
      {
        method: "POST",

        body: formData,
      },
    );

    const response = await imgResponse.json();

    if (response.success) {
      directUrl = response.data.url;
    }
    return directUrl;
  } catch (err: any) {
    alert(err);
  }
};
