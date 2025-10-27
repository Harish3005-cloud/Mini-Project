"use client";

import { useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { incrementLikes } from "@/lib/actions/post.actions";

interface Props {
  postId: string;
  initialCount: number;
}

export default function SimpleLikeButton({ postId, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const onClick = () => {
    if (isPending || liked) return;
    // Optimistic increment + set liked visual state
    setLiked(true);
    setCount((c) => c + 1);
    startTransition(async () => {
      try {
        await incrementLikes(postId, pathname);
      } catch (e) {
        // Revert on error
        setLiked(false);
        setCount((c) => Math.max(0, c - 1));
      }
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 disabled:opacity-60"
      aria-label={liked ? "Liked" : "Like"}
      aria-pressed={liked}
      disabled={liked}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={liked ? "#ef4444" : "none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 21s-6.716-4.395-9.193-7.36C1.02 11.646 1 8.97 3.054 7.086 5.11 5.203 7.87 5.74 9.59 7.38L12 9.707l2.41-2.328c1.72-1.64 4.48-2.177 6.536-.294 2.054 1.884 2.034 4.56.247 6.555C18.716 16.605 12 21 12 21z"
          stroke={liked ? "#ef4444" : "#9ca3af"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-subtle-medium text-gray-1">{count}</span>
    </button>
  );
}
