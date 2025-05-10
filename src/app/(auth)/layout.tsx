import Image from "next/image";
export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <section className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        {children}
      </section>
    </div>
  );
}
