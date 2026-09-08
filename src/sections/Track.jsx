import { useNavigate } from "react-router-dom";



function Track () {

    const nav = useNavigate();

    const handleTracker = () => {
        nav("/tracker");
    }

    return (
        <section className="flex flex-col md:flex-row items-center justify-between px-5 sm:px-10 md:px-20 py-10 gap-8">
            <div className="flex-1 w-full mb-6 md:mb-0">
                <img src="/track.png" className="w-full sm:w-3/4 md:w-125 rounded mx-auto" alt="Tracker Illustration" />
            </div>
            

            <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-4 sm:mb-6 md:mb-10 leading-snug">Track. Learn. Improve.</h1>
                
                <p className="text-base sm:text-lg md:text-2xl mb-4 sm:mb-6 md:mb-10 max-w-xl mx-auto md:mx-0">
                    Every small step counts. With our activity tracker, you can see your daily progress in one place, discover patterns that affect your productivity, and take action toward a healthier and more balanced lifestyle.
                </p>
                <button className="bg-blue-400 py-3 px-8 sm:px-10 rounded cursor-pointer font-semibold transition-colors duration-300 hover:bg-blue-500 w-full md:w-auto md:self-end" onClick={handleTracker}>
                    Explore Tracking Tools
                </button>
            </div>
        </section>
    );
}

export default Track;