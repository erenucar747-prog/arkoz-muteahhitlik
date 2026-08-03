import { notFound } from "next/navigation";

// Eşleşmeyen tüm yollar locale'e uygun not-found sayfasına düşer
export default function YakalanmayanRota() {
  notFound();
}
