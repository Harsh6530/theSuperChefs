import styles from './aboutus.module.css';
import Image from 'next/image';

const founders = [
  {
    name: 'Vivek Garg',
    college: 'IIT Kharagpur',
    linkedin: 'https://www.linkedin.com/in/vivek--garg/',
    img: '/founders/founder1.jpg',
    desc: 'Vivek Garg, an IIT Kharagpur alumnus with deep experience in scaling high-growth startups.'
  },
  {
    name: 'Swatantra Singh',
    college: 'IHM Bangalore',
    linkedin: 'https://www.linkedin.com/in/swatantra-singh-ab5410184/',
    img: '/founders/founder2.jpg',
    desc: 'Swatantra Singh, an IHM Bangalore alumnus with deep experience in business strategy and operations.'
  },
  {
    name: 'Harsh Sharma',
    college: 'IIT Kharagpur',
    linkedin: 'https://www.linkedin.com/in/harsh-sharma-669369227/',
    img: '/founders/founder3.jpg',
    desc: 'Harsh Sharma, an IIT Kharagpur CSE alumnus (2021-2025) who handles the technical aspects of the superchefs.'
  }
];

export default function AboutUsPage() {
  return (
    <div className={styles.aboutContainer}>
      <section className={styles.missionSection}>
        <h1>About Us</h1>
        <p className={styles.missionText}>
          At <span className={styles.brand}>The SuperChefs</span>, our mission is to make every event extraordinary by delivering world-class culinary experiences and seamless hospitality. We believe in innovation, quality, and creating memories that last a lifetime.
        </p>
      </section>
      <section className={styles.foundersSection}>
        <h2>Meet the Founders</h2>
        <div className={styles.foundersGrid}>
          {founders.map((f, i) => (
            <div className={styles.founderCard} key={i}>
              <div className={styles.founderImgWrap}>
                <Image src={f.img} alt={f.name} width={120} height={120} className={styles.founderImg} />
              </div>
              <div className={styles.founderInfo}>
                <h3>{f.name}</h3>
                <p className={styles.college}>{f.college}</p>
                <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedinLink}>
                  <Image src="/linkedin.svg" alt="LinkedIn" width={22} height={22} />
                </a>
                <p className={styles.founderDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 