import { env } from "@/env";
export const imgBB = async (file: File) => {
  try {
    let directUrl = "";
    const formData = new FormData();
    formData.append("image", file);
    // console.log("form data: ",formData)
    const imgResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${env.NEXT_PUBLIC_HOSTING_IMG_KEY}`,
      {
        method: "POST",

        body: formData,
      },
    );
    console.log("imgResponse: ", imgResponse);
    const response = await imgResponse.json();
    console.log("response: ", response);
    if (response.success) {
      directUrl = response.data.url;
    }

    return directUrl;
  } catch (err: any) {
    console.log(err);
  }
};
