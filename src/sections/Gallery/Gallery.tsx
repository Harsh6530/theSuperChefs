"use client";
import React, { useState } from 'react';
import styles from './gallery.module.css';

const images = [
  '/gallery/1.jpg',
  '/gallery/2.jpg',
  '/gallery/3.jpg',
  '/gallery/4.jpg',
  '/gallery/5.jpg',
  '/gallery/6.jpg',
  '/gallery/7.jpg',
  '/gallery/8.jpg',
];

export default function Gallery() {
  const [modalIdx, setModalIdx] = useState<number | null>(null);

  const openModal = (idx: number) => setModalIdx(idx);
  const closeModal = () => setModalIdx(null);
  const prevImg = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setModalIdx((idx) => (idx !== null ? (idx + images.length - 1) % images.length : null));
  };
  const nextImg = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setModalIdx((idx) => (idx !== null ? (idx + 1) % images.length : null));
  };

  // Keyboard navigation
  React.useEffect(() => {
    if (modalIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevImg();
      if (e.key === 'ArrowRight') nextImg();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [modalIdx]);

  return (
    <section className={styles.gallerySection} id="gallery">
      <div className={styles.centered}>
        <h2 className={styles.heading}>Gallery</h2>
        <p className={styles.subheading}>
          Explore our collection of stunning images capturing the essence of our services. From beautifully plated dishes to expertly crafted culinary experiences, our photo gallery brings our passion to life.
        </p>
        <div className={styles.goldLine}></div>
      </div>
      <div className={styles.grid}>
        {images.map((src, i) => (
          <div className={styles.imgCard} key={src} onClick={() => openModal(i)}>
            <img src={src} alt={`Gallery image ${i + 1}`} />
          </div>
        ))}
      </div>
      {modalIdx !== null && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeModal} aria-label="Close">&times;</button>
            <button className={`${styles.arrowBtn} ${styles.arrowLeft}`} onClick={prevImg} aria-label="Previous">&#8592;</button>
            <img className={styles.modalImg} src={images[modalIdx]} alt={`Gallery image ${modalIdx + 1}`} />
            <button className={`${styles.arrowBtn} ${styles.arrowRight}`} onClick={nextImg} aria-label="Next">&#8594;</button>
            <div className={styles.modalFooter}>
              THE SUPERCHEFS &nbsp;&nbsp; {modalIdx + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 