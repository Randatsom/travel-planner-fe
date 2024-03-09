class BaseService {
  readonly baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL + '/api' || ''
  }

  protected getBaseUrl(url: string) {
    return `${this.baseUrl}${url}`;
  }
}

export default BaseService;
