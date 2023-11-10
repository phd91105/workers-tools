export class FilmServices {
  async search(keyword: string) {
    const response = await fetch(
      `https://thuvienhd.com?feed=timfsharejson&search=${keyword}`,
    );

    const data = await response.json();
    return data;
  }
}
