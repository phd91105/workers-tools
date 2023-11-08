import { Env } from '../../interfaces';
import { FilmServices } from '../../services';

const filmServices = FilmServices();

export function FilmApiController() {
  const search = async (request: Request, env?: Env) => {
    const body: any = await new Response(request.body).json();
    const response = await filmServices.search(body.filmName);

    return Response.json(response);
  };

  return {
    search,
  };
}
