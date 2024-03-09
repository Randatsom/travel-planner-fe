class BaseService {
  readonly baseUrl: string;

  constructor() {
    // this.baseUrl = "https://travel-planner-be.onrender.com";
    this.baseUrl = "http://localhost:4444/api"
  }

  protected getBaseUrl(url: string) {
    return `${this.baseUrl}${url}`;
  }
}

export default BaseService;
