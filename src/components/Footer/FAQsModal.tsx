import React from "react";
import styles from "./Footer.module.css";

interface FAQsModalProps {
  onClose: () => void;
}

const FAQsModal: React.FC<FAQsModalProps> = ({ onClose }) => (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <button className={styles.modalClose} onClick={onClose}>&times;</button>
      <h1 className={styles.modalTitle}>Frequently Asked Questions</h1>
      <div className={styles.modalBody} style={{ maxHeight: 500, overflowY: 'auto', paddingRight: 8 }}>
        <h3 className={styles.faqQuestion}>1. What is Chef for Party?</h3>
        <p>SuperChefs offers professional chefs for home gatherings and private events, ensuring a stress-free and flavorful experience.</p>

        <h3 className={styles.faqQuestion}>2. How many guests can I book a chef for?</h3>
        <p>You can hire a chef for up to 300 guests, including children, making your event smooth and enjoyable.</p>

        <h3 className={styles.faqQuestion}>3. What if I have a larger gathering or need catering?</h3>
        <p>For larger events, we provide comprehensive catering services. Get in touch with us at <b>8081035820</b> to discuss your requirements.</p>

        <h3 className={styles.faqQuestion}>4. Where do you offer services?</h3>
        <p>We currently serve Delhi, Noida, Gurgaon, Ghaziabad, Faridabad, Bangalore, Mumbai, and Pune.</p>

        <h3 className={styles.faqQuestion}>5. What cuisines can your chefs prepare?</h3>
        <p>Our chefs specialize in a wide range of cuisines, including Indian, Italian, Chinese, and Continental, and can personalize the menu to suit your taste.</p>

        <h3 className={styles.faqQuestion}>6. How much does the service cost?</h3>
        <p>Pricing is based on the menu, guest count, and any additional requirements, with rates starting at ₹2000.</p>

        <h3 className={styles.faqQuestion}>7. Do I need to arrange ingredients and kitchen tools?</h3>
        <p>Yes, you'll need to arrange ingredients, cookware, and serving dishes. A checklist will be provided in advance.</p>

        <h3 className={styles.faqQuestion}>8. How many chefs will be assigned for my event?</h3>
        <p>We provide one chef per booking, but additional chefs and assistants can be arranged upon request.</p>

        <h3 className={styles.faqQuestion}>9. Will the chef clean the kitchen after cooking?</h3>
        <p>Our chefs ensure that your cooking space remains tidy, but utensils cleaning is not included.</p>

        <h3 className={styles.faqQuestion}>10. Can I also book bartenders and serving staff?</h3>
        <p>Yes, we offer trained bartenders and servers to enhance your event.</p>

        <h3 className={styles.faqQuestion}>11. Can I modify my booking details later?</h3>
        <p>Yes, you can make changes to the menu or guest count up to one day before your event.</p>

        <h3 className={styles.faqQuestion}>12. When will the chef arrive, and how long will they stay?</h3>
        <p>The chef will arrive at least 3 hours before the meal is served and will stay for 2 hours after serving begins.</p>

        <h3 className={styles.faqQuestion}>13. How can I get support for my booking?</h3>
        <p>For assistance, call or WhatsApp us at <b>8081035820</b>.</p>
      </div>
    </div>
  </div>
);

export default FAQsModal; 