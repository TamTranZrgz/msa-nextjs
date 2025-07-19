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
export const GET_INFO_PAGE_BY_SLUG = `
  *[_type == "infoPage" && fullSlug == $fullSlug][0]{
    _id,
    title,
    content,
    slug,
    fullSlug,
    content[] {
    ...,
    _type == "cta" => {
      _type,
      label,
      "internalLink": internalLink->{
        _id,
        title,
        slug,
        fullSlug
      },
      externalUrl
    },
    _type == "quote" => {
      _type,
      quote,
      author
    },
    _type == "linkObject" => {
      _type,
      label,
      openInNewTab,
      externalLink,
      "internalLink": internalLink->{
        _id,
        title,
        slug,
        fullSlug
      }
    },
    _type == "linkGroup" => {
        _type,
        links[] {
          _key,
          label,
          openInNewTab,
          externalLink,
          "internalLink": internalLink->{
            _id,
            title,
            slug,
            fullSlug
          }
        }
    },
    _type == "imageWithCaption" => {
      _type,
      image {
        asset->,
        alt
      },
      caption
    },
    _type == "block" => {
      ...,
      markDefs[] {
        ...,
        _type == "linkObject" => {
          _type,
          label,
          openInNewTab,
          externalLink,
          "internalLink": internalLink->{
            _id,
            title,
            slug,
            fullSlug
          }
        }
      }
    }
  }
}
`;

export async function getInfoPageBySlug(fullSlug: string) {
  return serverClient.fetch(GET_INFO_PAGE_BY_SLUG, { fullSlug });
}
