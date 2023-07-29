export default function getPathname(path: string) {
  const pathnames = [];
  const regex = /\/(\w+)/g;

  let match;
  while ((match = regex.exec(path)) !== null) {
    const [, u] = match;
    pathnames.push(u);
  }

  return pathnames;
}
