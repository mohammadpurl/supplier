import Image from "next/image";
import Header from "../_components/header/header";
import BreadCrumb from "../_components/header/breadcrumb";
import Sidebar from "../_components/sidebar/sidebar";
export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <div className="max-w-[1328px] mx-auto mb-20">
          <Header />
          <BreadCrumb />
          <div className="grid grid-cols-[340px_1fr] mt-10 relative">
            <div className="">
              <Sidebar />
            </div>
            {children}
          </div>
        </div>
        <div className="animate-pulse"></div>
    </>
  );
}
