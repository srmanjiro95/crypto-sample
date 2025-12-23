import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CryptoCardData } from "~/types/crypto";
import { CryptoCard } from "./CryptoCard";

type Props = {
  data: CryptoCardData;
};

export function SortableCryptoCard({ data }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.symbol });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!mounted) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <CryptoCard {...data} />
    </div>
  );
}
