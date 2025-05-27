import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import RefundPolicyModal from "./RefundPolicyModal";
import TermsModal from "./TermsModal";
import FAQsModal from "./FAQsModal";

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [showRefund, setShowRefund] = React.useState(false);
  const [showTerms, setShowTerms] = React.useState(false);
  const [showFAQs, setShowFAQs] = React.useState(false);

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
            <li><span>&gt;</span> <button className={styles.footerLink} onClick={()=>setShowPrivacy(true)}>Privacy Policy</button></li>
            <li><span>&gt;</span> <button className={styles.footerLink} onClick={()=>setShowRefund(true)}>Refund & Cancellation policy</button></li>
            <li><span>&gt;</span> <button className={styles.footerLink} onClick={()=>setShowTerms(true)}>Terms & Conditions</button></li>
            <li><span>&gt;</span> <button className={styles.footerLink} onClick={()=>setShowFAQs(true)}>FAQ's</button></li>
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
              <a href="https://www.instagram.com/thesuperchefs_/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Image src="/instagram.png" alt="Instagram" width={28} height={28} /></a>
              <a href="https://www.facebook.com/profile.php?id=61573551214230" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><Image src="/facebook.png" alt="Facebook" width={28} height={28} /></a>
              <a href="https://wa.me/918081035820" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><Image src="/whatsapp.png" alt="WhatsApp" width={28} height={28} /></a>
              <a href="https://www.linkedin.com/company/the-superchefs/about/?viewAsMember=true" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><Image src="/link.png" alt="LinkedIn" width={28} height={28} /></a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyrightBar}>© Copyright 2025 The SuperChefs</div>
      {showPrivacy && <PrivacyPolicyModal onClose={()=>setShowPrivacy(false)} />}
      {showRefund && <RefundPolicyModal onClose={()=>setShowRefund(false)} />}
      {showTerms && <TermsModal onClose={()=>setShowTerms(false)} />}
      {showFAQs && <FAQsModal onClose={()=>setShowFAQs(false)} />}
    </footer>
  );
} 