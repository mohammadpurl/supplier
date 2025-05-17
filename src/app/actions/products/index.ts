"use server";

import { OperationResult } from "@/types/operation-result";
import {  readData } from "@/core/http-service/http-service";
import { serverActionWrapper } from "../server-action-wrapper";
import { ProductList, ProductS } from "@/app/(root)/products/_types/product-types";
import { PaginatedResponse, PaginationRequest } from "@/types/pagination.interface";

export async function getProductList(
  prevState: OperationResult<PaginatedResponse<ProductS>> | undefined,
  formData: FormData
): Promise<OperationResult<PaginatedResponse<ProductS>>> {
  try {
    console.log("inside getProductList ....")
    const pagination: PaginationRequest = {
      pageSize: Number(formData.get('pageSize')) || 10,
      pageNumber: Number(formData.get('pageNumber')) || 1,
      searchTerm: formData.get('searchTerm')?.toString(),
      sortColumn: formData.get('sortColumn')?.toString(),
      sortDirection: formData.get('sortDirection') as 'asc' | 'desc' | undefined
    };

    const queryParams = new URLSearchParams({
      pageSize: pagination.pageSize.toString(),
      pageNumber: pagination.pageNumber.toString(),
      ...(pagination.searchTerm && { searchTerm: pagination.searchTerm }),
      ...(pagination.sortColumn && { sortColumn: pagination.sortColumn }),
      ...(pagination.sortDirection && { sortDirection: pagination.sortDirection })
    }).toString();

    const result = await serverActionWrapper(    
      async () => await readData<PaginatedResponse<ProductS>>(`/product/get-productList?${queryParams}`)
    );
    console.log("getProductList ....",result)
    if (result?.error) {
      return {
        isSuccess: false,
        error: {
          title: "Authentication Error",
          detail: result.error.detail || "Authentication failed",
          status: 401,
        },
      };
    }

    return result;
  } catch (error) {
    return {
      isSuccess: false,
      error: {
        title: "Error",
        detail: "Failed to fetch products",
        status: 500,
      }
    };
  }
}
