import styles from './hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <video
        className={styles.videoBg}
        src="/2.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.heading}>
          Bringing <span className={styles.cursiveEmphasis}>Expert</span> Chefs<br />
          & Gourmet Catering<br />
          to Your <span className={styles.cursiveEmphasis}>Doorstep</span>
        </h1>
        <p className={styles.subheading}>
          Enjoy restaurant quality meals<br />
          at home with skilled Chefs, personalized menus,<br />
          and a hassle-free cooking experience.
        </p>
      </div>
    </section>
  );
} 