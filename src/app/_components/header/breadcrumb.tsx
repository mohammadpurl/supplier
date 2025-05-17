import { FC } from "react";

const BreadCrumb: FC = () => {
    return (
        <nav className="position-relative pt-3 my-3 my-md-4" aria-label="breadcrumb">
          <ol className="flex items-center gap-2">
            <li className="breadcrumb-item"><a href="home-furniture.html">کلاسبن </a></li>
            <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" className="rotate-180 size-4 stroke-2"><path d="M9 18L15 12L9 6" strokeWidth="2"></path></svg>
            </li>
            <li className="breadcrumb-item active text-secondary" aria-current="page">فروشگاه</li>
          </ol>
        </nav>
    )
}

export default BreadCrumb;