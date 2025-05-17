import { API_URL } from "@/configs/global";

import { ApiError } from "@/types/http-errors.interface";
import axios, {
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import { errorHandler, networkErrorStrategy } from "./http-error-strategies";
import { auth } from "@/auth";

const httpService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response) {
      const statusCode = error?.response?.status;
      if (statusCode >= 400) {
        const errorData: ApiError = error.response?.data;

        errorHandler[statusCode](errorData);
      }
    } else {
      networkErrorStrategy();
    }
  }
);

async function apiBase<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse = await httpService(url, options);
  return response.data as T;
}

async function readData<T>(
  url: string,
  headers?: Record<string, string>
): Promise<T> {
  headers = await addAuthrizationHeader(headers)
  const options: AxiosRequestConfig = {
    headers,
    method: "GET",
  };
  const result =  await apiBase<T>(url, options);
  console.log("inside readData",result)
  return result
}

async function createData<TModel, TResult>(
  url: string,
  data: TModel,
  headers?: Record<string, string>
): Promise<TResult> {
  headers = await addAuthrizationHeader(headers);
  const options: AxiosRequestConfig = {
    method: "POST",    
    headers: {
      ...headers,
      "Content-Type": data && (data as any).formData instanceof URLSearchParams 
        ? "application/x-www-form-urlencoded" 
        : "application/json"
    },
    data: data && (data as any).formData instanceof URLSearchParams 
      ? (data as any).formData 
      : JSON.stringify(data)
  };
  
  return await apiBase<TResult>(url, options);
}

async function updateData<TModel, TResult>(
  url: string,
  data: TModel,
  headers?: Record<string, string>
): Promise<TResult> {
  headers = await addAuthrizationHeader(headers);
  const options: AxiosRequestConfig = {
    method: "PUT",
    headers: headers,
    data: JSON.stringify(data),
  };

  return await apiBase<TResult>(url, options);
}

async function deleteData(
  url: string,
  headers?: Record<string, string>
): Promise<void> {
  headers = await addAuthrizationHeader(headers);
  const options: AxiosRequestConfig = {
    method: "DELETE",
    headers: headers,
  };

  return await apiBase(url, options);
}

async function addAuthrizationHeader(headers?: Record<string, string>): Promise<Record<string, string>> {
  const session = await auth();
  headers = { ...headers };
  if (session?.user?.accessToken) {
    headers['Authorization'] = `Bearer ${session.user.accessToken}`;
  }
  return headers;
}

export { createData, readData, updateData, deleteData };
