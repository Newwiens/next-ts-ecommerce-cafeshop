// src/components/layout/Navbar.tsx
import Link from "next/link";
import { navItems } from "@/config/navItems";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="bg-pink-400 p-6">
      <nav>
        <ul className="flex justify-center items-center gap-6">
          <Link href="/">
            <Image
              src="/assets/logo/logo-newwiens.png"
              width={400}
              height={400}
              className="w-20 h-auto"
              alt="newwiens logo"
            ></Image>
          </Link>
          {navItems.map((item) => (
            <li key={item.id}>
              <Link href={item.href} className="text-lg">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
