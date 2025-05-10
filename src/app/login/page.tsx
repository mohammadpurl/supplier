"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

const phoneSchema = z.object({
  phone: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست")
});
const codeSchema = z.object({
  code: z.string().length(5, "کد باید ۵ رقمی باشد")
});

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

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
  const onSendPhone = async (data: any) => {
    setPhone(data.phone);
    setStep(2);
    setMessage("کد تایید به شماره شما ارسال شد.");
    // اینجا می‌توانید درخواست ارسال کد به بک‌اند بفرستید

    const result = await signIn("credentials", {
      phone: data.phone,
      code: "",
      redirect: false
    });
    if (result?.ok) {
      // ریدایرکت به داشبورد
    }
  };

  // تایید کد
  const onVerifyCode = async (data: any) => {
    setMessage("ورود موفقیت‌آمیز بود!");
    // اینجا می‌توانید درخواست تایید کد به بک‌اند بفرستید و کاربر را لاگین کنید

    const result = await signIn("credentials", {
      phone: phone,
      code: data.code,
      redirect: false
    });
    if (result?.ok) {
      // ریدایرکت به داشبورد
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">ورود به داشبورد</h2>
        {step === 1 && (
          <form onSubmit={handlePhoneSubmit(onSendPhone)} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">شماره موبایل</label>
              <input
                type="text"
                dir="ltr"
                className="input-primary w-full"
                placeholder="مثلاً 09123456789"
                {...registerPhone("phone")}
              />
              {phoneErrors.phone && (
                <span className="text-red-500 text-sm">{phoneErrors.phone.message as string}</span>
              )}
            </div>
            <button type="submit" className="btn-primary w-full">ارسال کد تایید</button>
          </form>
        )}
        {step === 2 && (
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
            <button type="button" className="btn-secondary w-full" onClick={() => setStep(1)}>
              بازگشت به مرحله قبل
            </button>
          </form>
        )}
        {message && <div className="mt-4 text-green-600 text-center">{message}</div>}
      </div>
    </div>
  );
} 