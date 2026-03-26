import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div>
      <Link href={"/"} className="flex items-center gap-2">
        <span className="py-2 px-2 rounded-xl text-xl bg-[#0b5e4e]">💊</span>
        <span className="font-bold text-3xl ">
          Medi<span className="font-black text-[#0b5e4e]">Care</span>{" "}
        </span>
      </Link>
    </div>
  );
};

export default Logo;
