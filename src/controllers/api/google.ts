import { GoogleServices } from '../../services/google';

export class GoogleApiController {
  private readonly googleServices: GoogleServices;

  constructor() {
    this.googleServices = new GoogleServices();
  }

  async search(request: Request) {
    const body: {
      keyword: string;
      start?: number;
    } = await new Response(request.body).json();

    const [first, next] = await Promise.all([
      this.googleServices.search(body.keyword),
      this.googleServices.search(body.keyword, 10),
    ]);

    return Response.json([...first, ...next]);
  }
}
