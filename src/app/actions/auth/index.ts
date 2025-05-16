"use server";

import { OperationResult } from "@/types/operation-result";
import { redirect } from "next/navigation";

import { createData } from "@/core/http-service/http-service";


import { Problem } from "@/types/http-errors.interface";
import { AuthroizeError, signIn, signOut } from "@/auth";
import { serverActionWrapper } from "../server-action-wrapper";
import { NewVerifyUserModel, NNewVerifyUserModel, SendAuthCode, VerifyUserModel } from "../../(auth)/verify/_types/verify-user.type";
import { SignIn } from "../../(auth)/signin/_types/signin.types";

export async function signInAction(
  formState: OperationResult<string> | null,
  formData: FormData
) {
  const mobile = formData.get("mobile") as string;
  console.log("mobile issssssssss:",mobile)
  // const validatedData = signInSchema.safeParse({
  //     mobile,
  // });

  // if (!validatedData.success) {
  //     return {
  //         message: "خطا در فرمت موبایل",
  //     };
  // } else {
  return serverActionWrapper(    
    async () =>
        
      await createData<SignIn, any>("/auth/get-otp", {
        mobile,
      })
  );
  // }
}

export async function sendAuthCode(
  formState: OperationResult<string> | null,
  mobile: string
) {
  return serverActionWrapper(
    async () =>
      await createData<SendAuthCode, string>("/send-auth-code", {
        mobile,
      })
  );
}

export async function verify(
  prevState: OperationResult<void> | undefined,
  model: NewVerifyUserModel
) {
  try {
    console.log("Verifying code for mobile:", model.formData);
    const result = await signIn("credentials", {
      username: model.formData.get("username") as string,
      password: model.formData.get("password") as string,
      redirect: false,
    });

    if (result?.error) {
      return {
        isSuccess: false,
        error: {
          title: "Authentication Error",
          detail: result.error,
          status: 401,
        },
      } satisfies OperationResult<void>;
    }

    return {
      isSuccess: true,
    } satisfies OperationResult<void>;
  } catch (error) {
    console.error("Verification error:", error);
    
    if (error instanceof AuthroizeError) {
      return {
        isSuccess: false,
        error: error.problem,
      } satisfies OperationResult<void>;
    }
    
    return {
      isSuccess: false,
      error: {
        title: "Verification Error",
        detail: "Verification failed. Please try again.",
        status: 500,
      },
    } satisfies OperationResult<void>;
  }
}

export async function logout(prevState: OperationResult<void> | undefined) {
  try {
    await signOut({ redirect: false });
    return {
      isSuccess: true,
    } satisfies OperationResult<void>;
  } catch (error) {
    throw new Error("");
  }
}
