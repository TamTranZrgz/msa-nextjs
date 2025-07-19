import Link from "next/link";
import { Home } from "lucide-react";

export const revalidate = 60;

export default function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Oooopppppp!!!!!!!</h1>
      <p className="text-lg md:text-xl mb-8">
        Cảm ơn bạn đã ghé thăm. Trang này khong ton tai
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 text-blue-600 hover:underline"
      >
        <Home className="w-5 h-5" />
        Quay lại trang chủ
      </Link>
    </div>
  );
}
