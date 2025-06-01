import Image from "next/image";
import styles from "./Header.module.css";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "../../../redux/auth/authSlice";
import type { RootState } from "../../../redux/store";

interface HeaderProps {
  currentPage?: string;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen, currentPage }: HeaderProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <header className={`${styles.header} sticky top-0 z-50`}>
      {/* Top Bar */}
      <div
        className={`${styles.topBar} flex justify-between items-center px-4 py-2 text-xs sm:text-sm`}>
        <div className="flex items-center gap-2">
          <span
            role="img"
            aria-label="phone">
            📞
          </span>
          <span>+91-8081-035-820</span>
        </div>
        <div className="hidden sm:block font-semibold tracking-wide">
          <span className={styles.blinkingCities}>
            Serving: Delhi, Noida, Gurgaon, Ghaziabad, Faridabad, Bangalore,
            Mumbai & Pune.
          </span>
        </div>
        <div className="flex gap-3">
          <a
            href="https://www.instagram.com/thesuperchefs_/"
            aria-label="Instagram"
            className="transition-transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/instagram.png"
              alt="Instagram"
              width={28}
              height={28}
            />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61573551214230"
            aria-label="Facebook"
            className="transition-transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/facebook.png"
              alt="Facebook"
              width={28}
              height={28}
            />
          </a>
          <a
            href="https://wa.me/918081035820"
            aria-label="WhatsApp"
            className="transition-transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/whatsapp.png"
              alt="WhatsApp"
              width={28}
              height={28}
            />
          </a>
          <a
            href="https://www.linkedin.com/company/the-superchefs/about/?viewAsMember=true"
            aria-label="LinkedIn"
            className="transition-transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/link.png"
              alt="LinkedIn"
              width={28}
              height={28}
            />
          </a>
        </div>
      </div>
      {/* Main Nav */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 gap-2 sm:gap-0">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="The Superchefs Logo"
            width={150}
            height={150}
          />
          {/* <span className="font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight font-sans drop-shadow-md">THE SUPERCHIEFS</span> */}
        </div>
        <nav
          className="flex gap-4 font-semibold text-base sm:text-lg mt-2 sm:mt-0"
          style={{ fontSize: "1rem" }}>
          <a
            href="#services"
            className={`${styles.navBtn} ${
              currentPage === "services" ? styles.activeNav : ""
            }`}>
            Our services
          </a>
          <a
            href="#contact"
            className={`${styles.navBtn} ${
              currentPage === "contact" ? styles.activeNav : ""
            }`}>
            Contact us
          </a>
          <a
            href="/aboutus"
            className={`${styles.navBtn} ${
              currentPage === "aboutus" ? styles.activeNav : ""
            }`}>
            About Us
          </a>
          {isLoggedIn ? (
            <button
              onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
          ) : (
            <a
              href="auth/login"
              className={`${styles.navBtn} ${
                currentPage === "contact" ? styles.activeNav : ""
              }`}>
              Login
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
