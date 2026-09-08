import { useNavigate } from "react-router-dom";



function About () {

    const nav = useNavigate();

    const handleAbout = () => {
        nav("/about");
    }

    return (
        <section className="relative flex flex-col-reverse md:flex-row items-center justify-between px-5 sm:px-10 md:px-20 py-10 gap-8">

            <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 sm:mb-8 md:mb-10 leading-snug">
                    The Idea Behind Us.
                </h1>

                <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 md:mb-10 max-w-xl mx-auto md:mx-0">
                    Most of us struggle with balancing work, rest, and personal goals. That’s why we created this activity tracker—to give you a clear view of your daily patterns and guide you toward more productive, fulfilling days. Whether you want to stay organized, monitor progress, or simply gain awareness, we’ve built a tool that grows with you.
                </p>

                <button className="bg-blue-400 py-3 px-8 sm:px-10 rounded cursor-pointer font-semibold transition-colors duration-300 hover:bg-blue-500 w-full md:w-auto" onClick={handleAbout}>
                    Read Full Story
                </button>
            </div>

            <div className="flex-1 w-full mb-6 md:mb-0">
                <img src="/about.png" className="w-full sm:w-3/4 md:w-125 rounded mx-auto" alt="About Illustration" />
            </div>
            
        </section>
    );
}

export default About;