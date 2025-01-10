"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
const SidebarItem = ({
  href,
  title,
}: {
  href: string;
  title: string;
}): React.JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = href == pathname;
  return (
    <div>
      <button
        className={isActive ? "text-purple-400" : "text-blue-500"}
        onClick={() => {
          router.push(href);
        }}
      >
        {title}
      </button>
    </div>
  );
};
export default SidebarItem;
