import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* About */}
        <div className={styles.footerCol}>
          <h3>The SuperChefs</h3>
          <hr />
          <p>
            <span style={{ fontWeight: 600 }}>At The SuperChefs,</span> The SuperChefs brings expert chefs and premium catering 
            services to your doorstep, making every event hassle-free. From initiate gatherings to grand celebrations, we serve fresh, 
            restaurant-quality cuisine tailored to your taste. Currently serving Delhi, Noida, Gurgaon, Ghaziabad, Faridabad, and Bangalore.
             Let us handle the food while you enjoy the moment!
          </p>
        </div>
        {/* Useful Links */}
        <div className={styles.footerCol}>
          <h3>Useful Links</h3>
          <hr />
          <ul>
            <li><span>&gt;</span> Privacy Policy</li>
            <li><span>&gt;</span> Refund & Cancellation policy</li>
            <li><span>&gt;</span> Terms & condition</li>
            <li><span>&gt;</span> FAQ's</li>
          </ul>
        </div>
        {/* Contact */}
        <div className={styles.footerCol}>
          <h3>Contact us</h3>
          <hr />
          <div>
            <div className={styles.footerContactItem} style={{ fontWeight: 600 }}>Swatantra Singh</div>
            <div className={styles.footerContactItem}>Email : <a href="mailto:swatantra.singh@thesuperchefs.com" className="hover:underline">swatantra.singh@thesuperchefs.com</a></div>
            <div className={styles.footerContactItem}>Call : <a href="tel:+918081035820" className="hover:underline">+91-8081-035-820</a></div>
            <div className={styles.footerContactItem + " mt-2"}>Get Social</div>
            <div className={styles.footerSocial}>
              <a href="#" aria-label="Instagram"><Image src="/instagram.png" alt="Instagram" width={28} height={28} /></a>
              <a href="#" aria-label="Facebook"><Image src="/facebook.png" alt="Facebook" width={28} height={28} /></a>
              <a href="#" aria-label="WhatsApp"><Image src="/whatsapp.png" alt="WhatsApp" width={28} height={28} /></a>
              <a href="#" aria-label="LinkedIn"><Image src="/link.png" alt="LinkedIn" width={28} height={28} /></a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyrightBar}>© Copyright 2025 The SuperChefs</div>
    </footer>
  );
} 