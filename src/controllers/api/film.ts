import { FilmServices } from '../../services/film';

export class FilmApiController {
  private readonly filmServices: FilmServices;

  constructor() {
    this.filmServices = new FilmServices();
  }

  async search(request: Request) {
    const body: any = await new Response(request.body).json();
    const response = await this.filmServices.search(body.filmName);

    return Response.json(response);
  }
}
