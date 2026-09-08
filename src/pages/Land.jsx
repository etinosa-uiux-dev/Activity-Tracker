import Header from "../sections/Header";
import Home from "../sections/Home";
import Footer from "../sections/Footer";
import About from "../sections/About";
import Track from "../sections/Track";



function Land () {

    return (
        <section className="bg-cover bg-center text-white" style={{backgroundImage: `url('/homeBg.png')`}}>

            <Home />
            <About />
            <Track />
            <Footer />
        </section>
    );
}

export default Land;