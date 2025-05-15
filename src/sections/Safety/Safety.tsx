import styles from './safety.module.css';

export default function Safety() {
  return (
    <section className={styles.safetySection}>
      <div className={styles.safetyContent}>
        <div className={styles.safetyTag}>Safety Comes First Because</div>
        <div className={styles.safetyTitle}>You Deserve The Best Care</div>
        <div className={styles.safetyDesc}>
          At SuperChefs, your safety is our top priority. We maintain the highest hygiene standards, follow strict safety protocols, and ensure every chef is professionally trained to deliver a secure and worry-free experience. From food preparation to service, we take every measure to provide clean, safe, and high-quality dining—because you deserve nothing but the best
        </div>
      </div>
      <div className={styles.safetyImage}>
        <img src="bg/bg04.jpg" alt="Safety and food hygiene" />
      </div>
    </section>
  );
} 