import { StaticImageData } from "next/image";

export type Navbar1Props = {
  className?: string;
  logo?: {
    url: string;
    src: StaticImageData | string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
};
export type MenuItem = {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
};
