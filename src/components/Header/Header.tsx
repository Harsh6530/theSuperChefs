import Image from "next/image";
import styles from "./Header.module.css";

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <header className={`${styles.header} sticky top-0 z-50`}>
      {/* Top Bar */}
      <div className={`${styles.topBar} flex justify-between items-center px-4 py-2 text-xs sm:text-sm`}>
        <div className="flex items-center gap-2">
          <span role="img" aria-label="phone">📞</span>
          <span>+91-8081-035-820</span>
        </div>
        <div className="hidden sm:block font-semibold tracking-wide">
          <span className={styles.blinkingCities}>Serving: Delhi, Noida, Gurgaon, Ghaziabad, Faridabad, Bangalore, Mumbai & Pune.</span>
        </div>
        <div className="flex gap-3">
          <a href="#" aria-label="Instagram" className="transition-transform hover:scale-110">
            <Image src="/instagram.png" alt="Instagram" width={28} height={28} />
          </a>
          <a href="#" aria-label="Facebook" className="transition-transform hover:scale-110">
            <Image src="/facebook.png" alt="Facebook" width={28} height={28} />
          </a>
          <a href="#" aria-label="WhatsApp" className="transition-transform hover:scale-110">
            <Image src="/whatsapp.png" alt="WhatsApp" width={28} height={28} />
          </a>
          <a href="#" aria-label="LinkedIn" className="transition-transform hover:scale-110">
            <Image src="/link.png" alt="LinkedIn" width={28} height={28} />
          </a>
        </div>
      </div>
      {/* Main Nav */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 gap-2 sm:gap-0">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="The Superchefs Logo" width={150} height={150} />
          {/* <span className="font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight font-sans drop-shadow-md">THE SUPERCHIEFS</span> */}
        </div>
        <nav className="flex gap-4 font-semibold text-base sm:text-lg mt-2 sm:mt-0" style={{ fontSize: '1rem' }}>
          <a href="#services" className={`${styles.navBtn} ${currentPage === 'services' ? styles.activeNav : ''}`}>Our services</a>
          <a href="#contact" className={`${styles.navBtn} ${currentPage === 'contact' ? styles.activeNav : ''}`}>Contact us</a>
        </nav>
      </div>
    </header>
  );
} 