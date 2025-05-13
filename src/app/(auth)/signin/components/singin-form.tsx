"use client";

import { Button } from "@/app/_components/button/button";
import { SignIn } from "../types/signin.types";
import { useForm } from "react-hook-form";
import { TextInput } from "@/app/_components/form-input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useNotificationStore } from "../../../../stores/notification.store";
import { signInSchema } from "../types/signin.schema";

import { useFormState } from "react-dom";
import { useEffect, useTransition } from "react";
import { signInAction } from "@/app/actions";
import { useNotificationStore } from "@/stores/notification.store";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  });

  const [formState, action] = useFormState(signInAction, null);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  useEffect(() => {
    if (formState && !formState.isSuccess && formState.error) {
      showNotification({
        message: formState.error?.detail!,
        type: "error",
      });
      console.log(errors);
      console.log(process.env.NEXT_PUBLIC_API_URL);
    } else if (formState && formState.isSuccess) {
      router.push(`/verify?mobile=${getValues("mobile")}`);
      showNotification({
        message: "کد تایید به شماره شما ارسال شد",
        type: "info",
      });
      console.log(formState.response);
    }
  }, [formState, showNotification, router, getValues, errors]);

  const onSubmit = (data: SignIn) => {
    const formData = new FormData();
    formData.append("mobile", data.mobile);
    startTransition(async () => {
      await action(formData);
    });
  };

  return (
    <div className="bg-white">
      <h5 className="text-2xl text-iconPrimary-100">ورود | ثبت نام</h5>
      {/* <p className="mt-2">تنظیم کلیه مستندات حقوقی با کمترین زمان و هزینه</p> */}
      <form
        className="flex flex-col gap-6 mt-8 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="mobile" className="">
          <span className="text-red-600">* </span>
          شماره موبایل
        </label>
        <TextInput<SignIn>
          register={register}
          name={"mobile"}
          className="h-12 p-4 rounded-md  border-gray-300 border-solid  border-2"
          errors={errors}
          placeholder="شماره موبایل خود را وارد کنید"
        />
        <Button
          type="submit"
          variant="primary"
          className="bg-iconSecondry-50 hover:bg-green-700 text-white inline-flex h-12 cursor-pointer select-none gap-2 border border-transparent px-7 text-center items-center justify-center rounded-md transition duration-100 ease-out"
          isLoading={isPending}
        >
          تایید و دریافت کد
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
