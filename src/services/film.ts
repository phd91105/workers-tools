export const FilmServices = () => {
  const search = async (keyword: string) => {
    const response = await fetch(
      'https://thuvienhd.com?feed=timfsharejson&search=' + keyword,
      {
        method: 'get',
      },
    );

    const data: any = await response.json();
    return data;
  };

  return {
    search,
  };
};
