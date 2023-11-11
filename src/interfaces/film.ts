export type FilmResponse = Array<{
  id: string;
  image: string;
  title: string;
  links: Array<{
    title: string;
    link: string;
  }>;
}>;
