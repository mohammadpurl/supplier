"use client";

import { logout } from "@/app/actions";
import { Loading } from "@/app/_components/loading";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IconLogout, IconUserProfile } from "@/app/_components/icons/icons";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const HeadeUserSession = () => {
  const { data: session, status, update } = useSession();
  const [signoutState, action] = useFormState(logout, undefined);
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (signoutState?.isSuccess) {
      const fetchSession = async () => await getSession();
      fetchSession();
      toggleDropdown();
      location.reload();
      router.push("/");
    }
  }, [signoutState, router, status, update, session]);
  const handleClickOutside = (event: any) => {
    if (dropdownRef.current) {
      setDropdownOpen(false);
    }
  };

  return (
    <>
      {!session?.user ? (
        <Link
          href="/signin"
          className="bg-inherit text-black  hover:bg-accent/90"
        >
          <UserCircleIcon />
          
        </Link>
      ) : (
        <div className="relative" ref={dropdownRef}>
          <div className="relative inline-block text-left">
            <a className="w-10 h-10 rounded-full cursor-pointer">
              <Image
                src={"/assets/images/avatar.jpg"}
                // src={""}
                width={45}
                height={45}
                alt=""
                className="rounded-full bg-transparent  border-opacity-80 border-blue-600"
                onClick={toggleDropdown}
              />
            </a>
            {isOpen && (
              // <HeadeUserSession />
              <div
                className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-2 z-50 m-3 text-xs sm:text-sm"
                onMouseLeave={() => setDropdownOpen(!dropdownOpen)}
              >
                <ul
                  className="flex flex-col gap-5 items-center justify-start "
                  aria-labelledby="profileDropdown"
                  data-bs-popper="none"
                >
                  {/* <!-- Profile info --> */}
                  <li className="px-3 border-b-2 pb-1 border-gray-100">
                    <div className="flex gap-3 align-items-center">
                      {/* <!-- Avatar --> */}
                      {/* <div className="me-3">
                        <Image
                          src={"/assets/images/avatar.jpg"}
                          className=" rounded-full"
                          alt=""
                          width={45}
                          height={45}
                          id="userprofileAvatar"
                        />
                      </div> */}
                      <div>
                        <a className="h6" href="#"></a>
                        <p className="small m-0 mt-1 fw-bold">{session?.user.mobile}</p>
                      </div>
                    </div>
                  </li>
                  {/* <!-- Links --> */}

                  <li className="px-3 w-full flex gap-1 items-center border-b-2 pb-1 border-gray-100">
                    <IconUserProfile />
                    <Link
                      href="/profile"
                      className=" text-neutral-600  "
                      onClick={() => setIsOpen(false)}
                    >
                      پنل مدیریت حساب
                    </Link>
                  </li>
                  {/* <!-- signout --> */}
                  <li className="px-3 w-full flex gap-1 items-center justify-start">
                    <IconLogout />
                    <form action={action as () => void}>
                      <LogoutButton />
                    </form>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export const LogoutButton = () => {
  const { pending, data } = useFormStatus();
  return (
    <button className="block px-4 py-2 text-sm  text-neutral-600 ">
      {pending && <Loading size="tiny" />}
      خروج
    </button>
  );
};

export default HeadeUserSession;
