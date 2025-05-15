import styles from './special.module.css';

const features = [
  {
    title: 'Professional Chefs',
    desc: 'A professional chef blends skill, creativity, and precision to create extraordinary dining experiences with flawless flavors and presentation.',
  },
  {
    title: 'Quick & Easy Booking',
    desc: 'Book your chef effortlessly with a fast, hassle-free process—saving you time and ensuring a smooth, stress-free experience from start to finish',
  },
  {
    title: 'Always on Time',
    desc: 'We guarantee punctual, reliable, and efficient service, ensuring your meals are prepared and served right on schedule - every time',
  },
  {
    title: 'Fast Response',
    desc: 'We provide quick, reliable, and efficient support, ensuring your queries are resolved instantly for a seamless experience',
  },
];

function CheckIcon() {
  return (
    <svg className={styles.checkIcon} viewBox="0 0 48 48" fill="none" stroke="#444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="36" height="36" rx="6" fill="none" stroke="#444" strokeWidth="3" />
      <path d="M15 25l7 7 11-13" stroke="#444" strokeWidth="3.2" fill="none" />
    </svg>
  );
}

export default function Special() {
  return (
    <section className={styles.specialSection}>
      <div className={styles.centered}>
        <h2 className={styles.heading}>What Makes SuperChefs Special?</h2>
        <p className={styles.subheading}>
          SuperChefs brings expert chefs, customized menus, and a flawless dining experience, turning every meal into a gourmet celebration
        </p>
      </div>
      <div className={styles.featuresGrid}>
        {features.map((f, i) => (
          <div className={styles.feature} key={f.title}>
            <CheckIcon />
            <div className={styles.featureContent}>
              <div className={styles.featureTitle}>{f.title}</div>
              <div className={styles.featureDesc}>{f.desc}</div>
              <div className={styles.goldLine}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 