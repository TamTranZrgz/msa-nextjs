import { serverClient } from "./sanity";

// Get nav links for desktop and mobile menus in header
export const GET_NAVBAR_LINKS = `
  *[_type == "infoPage" && !defined(parent)] | order(menuOrder asc) {
  _id,
  title,
  fullSlug,
  menuOrder,
  "children": *[_type == "infoPage" && parent._ref == ^._id] | order(menuOrder asc){
    _id,
    title,
    fullSlug,
    menuOrder
  }
}
`;

export async function getNavbarLinks() {
  return serverClient.fetch(GET_NAVBAR_LINKS);
}

// Get info of Info Page by slug
export const GET_INFO_PAGE_BY_SLUG = ``;

export async function getInfoPageBySlug(fullSlug: string) {
  return serverClient.fetch(GET_INFO_PAGE_BY_SLUG, { fullSlug });
}
