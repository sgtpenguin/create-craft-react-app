export const idtype = `id
typeHandle`;

export const link = `
  url
  text
  type
  element {
    id
    uri
    title
  }
`;

export const linkTo = `
linkTo {
  ${link}
}
`;
