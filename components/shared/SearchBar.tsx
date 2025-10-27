"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  initialValue?: string;
  placeholder?: string;
  paramKey?: string; // defaults to 'q'
  debounceMs?: number; // defaults to 400ms
}

export default function SearchBar({
  initialValue = "",
  placeholder = "Search...",
  paramKey = "q",
  debounceMs = 400,
}: Props) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildUrl = useMemo(() => {
    return (next: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      if (next && next.trim().length > 0) {
        params.set(paramKey, next.trim());
      } else {
        params.delete(paramKey);
      }
      const query = params.toString();
      return query ? `${pathname}?${query}` : pathname;
    };
  }, [pathname, searchParams, paramKey]);

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace(buildUrl(value));
    }, debounceMs);
    return () => clearTimeout(t);
  }, [value, router, buildUrl, debounceMs]);

  return (
    <div className="w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-dark-4 bg-dark-3 px-4 py-3 text-light-1 outline-none placeholder:text-light-4"
        aria-label="Search"
      />
    </div>
  );
}
