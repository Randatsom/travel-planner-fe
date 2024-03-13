import axios, { AxiosRequestConfig } from "axios";
import BaseService from "./baseService";

class HttpService extends BaseService {
  async get<T>(
    url: string,
    params: Record<string, unknown> = {},
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return HttpService.operation<T>({
      method: "get",
      url: this.getBaseUrl(url),
      params,
      ...config,
    });
  }

  async post<T>(
    url: string,
    data: unknown = {},
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return HttpService.operation<T>({
      method: "post",
      url: this.getBaseUrl(url),
      data,
      ...config,
    });
  }

  async put<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return HttpService.operation<T>({
      method: "put",
      url: this.getBaseUrl(url),
      data,
      ...config,
    });
  }

  async patch<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return HttpService.operation<T>({
      method: "patch",
      url: this.getBaseUrl(url),
      data,
      ...config,
    });
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return HttpService.operation<T>({
      method: "delete",
      url: this.getBaseUrl(url),
      ...config,
    });
  }

  private static async operation<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const http = axios.create();
      const response = await http.request<T>({
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        ...config,
      });

      return response.data;
    } catch (error) {
      // @todo: dispatch error to redux
      return Promise.reject(error);
    }
  }
}

export default new HttpService();
