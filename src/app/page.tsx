import Header from '../components/Header/Header';
import Hero from '../sections/Hero/Hero';
import Services from '../sections/Services/Services';
import Special from '../sections/Special/Special';
import Safety from '../sections/Safety/Safety';
import HowItWorks from '../sections/HowItWorks/HowItWorks';
import Gallery from '../sections/Gallery/Gallery';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Services />
        <Special />
        <Safety />
        <HowItWorks />
        <Gallery />
        {/* Add more sections here as needed */}
      </main>
      <Footer />
    </div>
  );
}
