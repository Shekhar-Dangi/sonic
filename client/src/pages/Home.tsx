import Footer from "../components/layout/Footer";
import Hero from "../components/marketing/Hero";
import How from "../components/marketing/How";
import Navbar from "../components/layout/Navbar";
import Plan from "../components/marketing/Plan";

function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Navbar />
      <main>
        <Hero />
        <How />
        <Plan />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
