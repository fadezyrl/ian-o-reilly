import { Nav } from "@/components/layout/Nav/Nav";
import { Book } from "@/components/sections/Book/Book";
import { Craft } from "@/components/sections/Craft/Craft";
import { Footer } from "@/components/sections/Footer/Footer";
import { Hero } from "@/components/sections/Hero/Hero";
import { Ian } from "@/components/sections/Ian/Ian";
import { Info } from "@/components/sections/Info/Info";
import { Place } from "@/components/sections/Place/Place";
import { Work } from "@/components/sections/Work/Work";

const Home = (): React.ReactElement => {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Craft />
        <Work />
        <Ian />
        <Place />
        <Book />
        <Info />
      </main>
      <Footer />
    </>
  );
};

export default Home;
