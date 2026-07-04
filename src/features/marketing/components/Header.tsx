import Image from "next/image";
import Link from "next/link";
import { HistoryIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-6 h-16 justify-between">
        <div className="navbar-start w-auto">
          <Link
            href="/"
            className="text-xl font-bold text-base-content tracking-tight flex items-center gap-2"
          >
            <Image
              src="/logo/pulse-svgrepo-com.svg"
              alt="WordScribe Logo"
              width={32}
              height={32}
            />
            <span>WordScribe</span>
          </Link>
        </div>

        <nav className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-1 p-0">
            <li>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-base-content/85 hover:text-base-content"
              >
                How it works
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="text-sm font-medium text-base-content/85 hover:text-base-content"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-sm font-medium text-base-content/85 hover:text-base-content"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="text-sm font-medium text-base-content/85 hover:text-base-content"
              >
                FAQ
              </a>
            </li>
          </ul>
        </nav>

        <div className="navbar-end w-auto gap-4">
          {/* // TODO: Implement recent files functionality */}
          <button
            className="btn btn-ghost btn-circle btn-sm"
            title="Recent Files"
          >
            <HistoryIcon size={20} />
          </button>

          <Link
            href="/login"
            className="btn btn-ghost btn-sm text-sm font-medium"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="btn btn-primary btn-sm text-xs font-semibold px-4 hidden sm:inline-flex"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
