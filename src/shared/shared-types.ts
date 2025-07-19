type NavItem = {
  _id: string;
  title: string;
  fullSlug: string;
  children?: NavItem[];
};

type SanityImage = {
  _type: "image";
  alt?: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
};
export type { SanityImage, NavItem };
