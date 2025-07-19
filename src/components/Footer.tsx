import Link from "next/link";

export default function Footer() {
  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Links */}
        <div className="flex space-x-6 text-sm text-muted-foreground">
          <Link href="/ve-chung-toi" className="hover:underline">
            Về Chúng Tôi
          </Link>
          <Link href="/trach-nhiem" className="hover:underline">
            Trách Nhiệm
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
        </div>

        {/* Right: Social Icons */}
        <div className="flex space-x-4">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-primary"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.3.2 2.3.2v2.5H15c-1.2 0-1.6.8-1.6 1.6V12H17l-.5 3h-2.1v7A10 10 0 0022 12z" />
            </svg>
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-primary"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
