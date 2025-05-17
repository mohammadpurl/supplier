'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC } from "react"

const SidebarTitle: FC = () => {
    const params = useSearchParams();
    const hasParams = Array.from(params.entries()).length > 0;
    return (
        <div className="font-semibold mb-5 flex justify-between items-center text-xs">
            فیلتر
            {
                hasParams && (
                    <Link href="/" className="text-primary cursor-pointer">حذف فیلتر X</Link>
                )
            }

        </div>
    )
}

export default SidebarTitle;