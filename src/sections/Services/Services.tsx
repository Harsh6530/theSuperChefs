"use client";

import styles from "./services.module.css";
import { useRouter } from "next/navigation";

export default function Services() {
  const router = useRouter();
  const handleBookNow = () => {
    router.push("/book");
  };
  return (
    <section
      className={styles.servicesSection}
      id="services">
      <div className={styles.centered}>
        <h2 className={styles.heading}>Unlock the Best Service for You</h2>
        <p className={styles.subheading}>
          We bring top-tier services to your doorstep, ensuring convenience,
          quality, and satisfaction. Discover a hassle-free way to get things
          done with trusted professionals.
        </p>
        <div className={styles.goldLine}></div>
      </div>
      <div className={styles.cards}>
        {/* Card 1 */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            Professional Chef for Events
            <div className={styles.goldLine}></div>
            <div className={styles.cardSub}>
              Expert chef for fresh, customized, and hassle-free gourmet dining
              at your event!
            </div>
          </div>
          <div className={styles.cardBody}>
            <ul>
              <li>Multi-cuisine expertise</li>
              <li>Fresh, hygienic, and flavorful meals</li>
              <li>Hassle-free cooking & serving</li>
              <li>Bartenders, Waiters, etc.</li>
            </ul>
            <div>
              Reserve your chef today for a truly memorable celebration.
            </div>
            <div className={styles.price}>
              <small>Starting from</small>
              <strong> ₹2000</strong>/visit
            </div>
            <button
              className={styles.bookNowBtn}
              onClick={handleBookNow}>
              Book Now
            </button>
            <button className={styles.knowMoreBtn}>Know More</button>
          </div>
        </div>
        {/* Card 2 */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            Gourmet Catering for Party
            <div className={styles.goldLine}></div>
            <div className={styles.cardSub}>
              Chef-crafted gourmet catering with fresh flavors and elegant
              presentation!
            </div>
          </div>
          <div className={styles.cardBody}>
            <ul>
              <li>Customized Gourmet Menus</li>
              <li>Fresh & High-Quality Ingredients</li>
              <li>Professional Presentation</li>
              <li>Hassle-Free Service</li>
            </ul>
            <div>Book now and let us serve perfection on your plate.</div>
            <div className={styles.price}>
              <small>Starting from</small>
              <strong> ₹699</strong>/person
            </div>
            <button
              className={styles.bookNowBtn}
              onClick={handleBookNow}>
              Book Now
            </button>
            <button className={styles.knowMoreBtn}>Know More</button>
          </div>
        </div>
        {/* Card 3 */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            Elite Bartender & Waiter
            <div className={styles.goldLine}></div>
            <div className={styles.cardSub}>
              A bartender expertly crafts and serves drinks with precision,
              creativity, and flair.
            </div>
          </div>
          <div className={styles.cardBody}>
            <ul>
              <li>Expert Mixology</li>
              <li>Excellent Communication</li>
              <li>Fast & Efficient</li>
              <li>Responsible & Trustworthy</li>
            </ul>
            <div>Book a Bartender & Experience Mixology Perfection</div>
            <div className={styles.price}>
              <small>Starting from</small>
              <strong> ₹999</strong>/visit
            </div>
            <button
              className={styles.bookNowBtn}
              onClick={handleBookNow}>
              Book Now
            </button>
            <button className={styles.knowMoreBtn}>Know More</button>
          </div>
        </div>
      </div>
    </section>
  );
}
