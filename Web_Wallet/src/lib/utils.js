import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Copy, Download } from "lucide-react"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
} 