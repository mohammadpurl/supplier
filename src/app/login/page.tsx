"use client"
import { startTransition, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendAuthCode, verify } from "../actions";
import { SignIn } from "../(auth)/signin/_types/signin.types";
import { useFormState } from "react-dom";
import { signInAction } from "../actions";
import { VerifyUserModel } from "../(auth)/verify/_types/verify-user.type";

const phoneSchema = z.object({
  mobile: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست")
});

const codeSchema = z.object({
  code: z.string().length(5, "کد باید ۵ رقمی باشد"),
  mobile: z.string()
});

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [formState, action] = useFormState(signInAction, null);
  const [isPending, startTransition] = useTransition();
  const [verifyState, verifyAction] = useFormState(verify, undefined);

  // فرم شماره موبایل
  const {
    register: registerPhone,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors }
  } = useForm({
    resolver: zodResolver(phoneSchema)
  });

  // فرم کد
  const {
    register: registerCode,
    handleSubmit: handleCodeSubmit,
    formState: { errors: codeErrors }
  } = useForm({
    resolver: zodResolver(codeSchema)
  });

  // ارسال شماره موبایل
  const onSendPhone = async (data: SignIn) => {
    setMobile(data.mobile);
    setStep(2);
    setMessage("کد تایید به شماره شما ارسال شد.");

    const formData = new FormData();
    formData.append("mobile", data.mobile);
    startTransition(async () => {
      await action(formData);
    });
  };

  // تایید کد
  const onVerifyCode = (data: { code: string }) => {
    startTransition(() => {
      verifyAction({
        mobile: mobile,
        code: data.code,
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">ورود به داشبورد</h2>
        
        {step === 1 ? (
          <form onSubmit={handlePhoneSubmit(onSendPhone)} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">شماره موبایل</label>
              <input
                type="text"
                dir="ltr"
                className="input-primary w-full"
                placeholder="مثلاً 09123456789"
                {...registerPhone("mobile")}
              />
              {phoneErrors.mobile && (
                <span className="text-red-500 text-sm">{phoneErrors.mobile.message as string}</span>
              )}
            </div>
            <button type="submit" className="btn-primary w-full">ارسال کد تایید</button>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit(onVerifyCode)} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">کد تایید</label>
              <input
                type="text"
                dir="ltr"
                className="input-primary w-full"
                placeholder="کد ۵ رقمی"
                {...registerCode("code")}
              />
              {codeErrors.code && (
                <span className="text-red-500 text-sm">{codeErrors.code.message as string}</span>
              )}
            </div>
            <button type="submit" className="btn-primary w-full">ورود</button>
            <button 
              type="button" 
              className="btn-secondary w-full" 
              onClick={() => setStep(1)}
            >
              بازگشت به مرحله قبل
            </button>
          </form>
        )}
        
        {message && <div className="mt-4 text-green-600 text-center">{message}</div>}
      </div>
    </div>
  );
} 