import { userService } from "@/service/user.service";
import React from "react";

const page = async () => {
  const { data } = await userService.getSession();
  return (
    <div className="min-h-screen justify-center items-center flex">
      profile pageeee....
    </div>
  );
};

export default page;
