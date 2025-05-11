"use client";

import AuthCode from "@/app/_components/auth-code/auth-code";
import { AuthCodeRef } from "@/app/_components/auth-code/auth-code.types";
import { Button } from "@/app/_components/button/button";
import { Timer } from "@/app/_components/timer/timer";
import { TimerRef } from "@/app/_components/timer/timer.types";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { VerifyUserModel } from "../_types/verify-user.type";
import { useFormState } from "react-dom";
// import { sendAuthCode, verify } from "@/actions/auth";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { sendAuthCode, verify } from "@/app/actions";
import { useNotificationStore } from "@/stores/notification.store";


const getTwoMinutesFromNow = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 120);
  return time;
};

const VerificationForm = ({ mobile }: { mobile: string }) => {
  const [showResendCode, setShowResendCode] = useState<boolean>(false);
  const authCodeRef = useRef<AuthCodeRef>(null);
  const timerRef = useRef<TimerRef>(null);

  const {
    handleSubmit,
    setValue,
    register,
    formState: { isValid },
  } = useForm<VerifyUserModel>();

  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  const [sendAuthCodeState, sendAuthCodeAction] = useFormState(
    sendAuthCode,
    null
  );
  const [verifyState, verifyAction] = useFormState(verify, undefined);

  const [verifyPendingState, startTransition] = useTransition();

  const router = useRouter();

  const params = useSearchParams();
  const username = params.get("mobile")!;
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (verifyState && !verifyState.isSuccess && verifyState?.error?.detail) {
      showNotification({
        message: verifyState?.error.detail,
        type: "error",
      });
    } else if (verifyState?.isSuccess) {
      // 1. ذخیره وضعیت لاگین موفق در sessionStorage
      sessionStorage.setItem('auth_success', 'true');
      
      // 2. بروزرسانی جلسه
      const fetchSession = async () => {
        const session = await getSession();
        return session;
      };
      
      fetchSession().then((session) => {
        // 3. بروزرسانی سشن فعلی
        update().then(() => {
          // 4. ریدایرکت به داشبورد با ارسال پارامتر auth برای اطمینان از بروزرسانی
          window.location.href = "/dashboard" ;
        });
      });
    }
  }, [verifyState, update]);

  useEffect(() => {
    if (
      sendAuthCodeState &&
      !sendAuthCodeState.isSuccess &&
      sendAuthCodeState.error
    ) {
      showNotification({
        message: sendAuthCodeState.error.detail!,
        type: "error",
      });
    } else if (sendAuthCodeState && sendAuthCodeState.isSuccess) {
      console.log(sendAuthCodeState.response);
      showNotification({
        message: "کد تایید به شماره شما ارسال شد",
        type: "info",
      });
    }
  }, [sendAuthCodeState]);

  const onSubmit = (data: VerifyUserModel) => {
    data.mobile = username;

    startTransition(() => {
      verifyAction({
        mobile: data.mobile,
        code: data.code,
      });
    });
  };

  register("code", {
    validate: (value: string) => (value ?? "").length === 5,
  });

  const resendAuthCode = () => {
    timerRef.current?.restart(getTwoMinutesFromNow());
    setShowResendCode(false);
    authCodeRef.current?.clear();
    sendAuthCodeAction(mobile);
  };
  return (
    <>
      <h5 className="text-2xl">کد تایید</h5>
      <p className="mt-2">
        وکیل تو دستیار مبتنی بر هوش مصنوعی تو برای تهیه مستندات حقوقی
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 mt-10 flex-1"
      >
        <AuthCode
          className="mt-10"
          ref={authCodeRef}
          onChange={(value) => {
            setValue("code", value, { shouldValidate: true });
          }}
        />
        {/* <Timer
          ref={timerRef}
          className="mx-auto my-8"
          size="small"
          onExpire={() => {
            setShowResendCode(true);
          }}
          expiryTimestamp={getTwoMinutesFromNow()}
          showDays={false}
          showHours={false}
        /> */}
        <Button
          isLink={true}
          isDisabled={!showResendCode}
          onClick={resendAuthCode}
          className="text-blue-700"
        >
          ارسال مجدد کد تایید
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={verifyPendingState}
          isDisabled={!isValid}
          className="bg-blue-700"
        >
          تایید و ادامه
        </Button>
        <div className="flex items-start gap-1 justify-center mt-auto">
          <span>برای اصلاح شماره موبایل</span>
          <Link href="/signin" className="text-blue-500">
            اینجا
          </Link>
          <span>کلیک کنید</span>
        </div>
      </form>
    </>
  );
};

export default VerificationForm;
