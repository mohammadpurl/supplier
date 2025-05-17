import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
    return (
        <>
            <div className="container flex relative justify-between items-center py-3 z-10">
                {/* Contact info */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600 text-xs font-semibold">ارتباط با ما<span className="hidden sm:inline"></span></span>
                    <Link className="text-gray-800 text-xs font-bold hover:text-primary-500" href="tel:+15053753082">021&nbsp;910&nbsp;96&nbsp;415</Link>
                </div>

                {/* Sale Banner */}
                <a className="hidden md:inline text-gray-600 text-sm font-semibold hover:text-primary" href="#!">🔥 بزرگترین تخفیف سال تا 50 درصد</a>

                {/* Navigation Links */}
                <ul className="flex space-x-4  ">
                    <li>
                        <Link className="text-gray-600 text-xs font-semibold hover:text-primary" href="#!">محصولات مورد علاقه</Link>
                    </li>
                    <li>
                        <Link className="text-gray-600 text-xs font-semibold hover:text-primary" href="#!">حساب کاربری</Link>
                    </li>
                </ul>

            </div>

            <header className="container z-50    top-0">
                <div className="shadow-lg bg-light  flex justify-between items-center px-5 py-3 rounded-4xl mt-1">
                <Image src="/images/logo.svg" width={190} height={50} alt="" />
                   
                    <nav>
                        <ul className="flex items-center gap-10 *:hover:text-primary">
                            <li>
                                <Link href="/">
                                    صفحه اصلی
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    فروشگاه
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    مشاوره طراحی
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog">
                                    اخبار و مقالات
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    ارتباط با ما
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    درباره ما
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex flex-row-reverse items-center gap-6">
                        <span className="bg-secondary/10 w-10 cursor-pointer hover:bg-secondary/20 transition-all h-10 flex items-center justify-center rounded-full">
                            <svg width="20" height="20" viewBox="0 0 24 24" className="stroke-secondary" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>


                        </span>
                        <svg className="cursor-pointer hover:fill-black/90" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)"><path opacity=".888" fillRule="evenodd" clipRule="evenodd" d="M11.463.866c2.19-.098 3.894.81 5.113 2.722.327.627.552 1.295.677 2.004.023.058.062.099.116.123.713-.032 1.429-.049 2.148-.049.819-.006 1.636.019 2.452.074.527.164.893.518 1.097 1.064.072.326.088.656.047.99a2768.8 2768.8 0 0 0-1.775 11.975c-.597 2.085-1.912 3.28-3.945 3.588-3.596.033-7.19.033-10.786 0-1.641-.247-2.847-1.146-3.619-2.697a7.34 7.34 0 0 1-.373-1.237c-.572-3.96-1.148-7.919-1.728-11.877-.01-1.094.495-1.712 1.517-1.855 1.463-.025 2.926-.033 4.39-.025.343-2.04 1.402-3.499 3.175-4.38.492-.188.99-.328 1.494-.42zm-.094 1.237c1.778-.184 3.17.492 4.18 2.029.265.472.46.975.583 1.51-2.74.032-5.479.032-8.218 0 .474-1.93 1.626-3.11 3.455-3.539zm-9.011 4.75H6.7c-.008 1.221 0 2.442.023 3.662a6.79 6.79 0 0 0 1.144.05 42.586 42.586 0 0 1-.046-2.573c.014-.376.046-.747.093-1.114 2.755-.024 5.51-.033 8.265-.024v3.711c.385.016.766 0 1.144-.05.008-1.215.031-2.428.07-3.637a87.234 87.234 0 0 1 4.155 0c.26.028.416.177.467.446-.59 3.999-1.173 7.999-1.75 12-.416 1.561-1.373 2.51-2.872 2.845-3.69.049-7.38.032-11.066-.05-1.297-.4-2.145-1.283-2.545-2.647A2825.13 2825.13 0 0 1 2.03 7.373a.656.656 0 0 1 .327-.52z" fill="#000" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h24v24H0z" /></clipPath></defs></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-secondary cursor-pointer hover:fill-black/70 transition-all" width="24" height="24" viewBox="0 0 24 24"><path d="M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm6.312-10.897c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z"/></svg>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
