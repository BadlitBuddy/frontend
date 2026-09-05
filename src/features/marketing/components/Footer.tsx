import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-100 border-t border-base-300 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="footer sm:footer-horizontal items-center justify-between gap-6 border-b border-base-300 pb-8">
          <aside className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href="/"
              className="text-lg font-bold text-base-content tracking-tight flex items-center gap-2"
            >
              <Image
                src="/logo/pulse-svgrepo-com.svg"
                alt="Badlit Buddy Logo"
                width={32}
                height={32}
              />
              <span>Badlit Buddy</span>
            </Link>
            <span className="text-[10px] tracking-wider font-semibold text-base-content/60 mt-1">
              AI POWERED TRANSCRIPTION
            </span>
          </aside>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link
              href="/privacy"
              className="link link-hover text-xs text-base-content/70 hover:text-base-content transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="link link-hover text-xs text-base-content/70 hover:text-base-content transition-colors"
            >
              Terms of Service
            </Link>
          </nav>
        </div>

        <div className="pt-8 text-center">
          <p className="text-xs text-base-content/60">
            © {new Date().getFullYear()} Badlit Buddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
