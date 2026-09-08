import Header from "./Header";

function Home () {

    return (
        <section className="relative">

            <Header />

            <div className="min-h-screen flex flex-col md:flex-row items-center justify-between px-5 sm:px-10 md:px-20 py-25 gap-8">
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-4 sm:mb-6 md:mb-10 leading-snug">
                        Build Better Habits, One Day at a Time.
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-10 max-w-xl mx-auto md:mx-0">
                        Gain a clear picture of how you spend your time and take small, actionable steps toward improving both productivity and well-being. With summaries that are easy to follow and insights that grow with you, this activity tracker helps you stay consistent while keeping life in balance.
                    </p>

                    <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-10 max-w-xl mx-auto md:mx-0">
                        By logging your daily activities, you’ll begin to uncover patterns in how you use your time — whether it’s work, study, exercise, or leisure. These insights make it easier to identify what energizes you, what drains you, and where small adjustments can create a big difference in your lifestyle.
                    </p>
                </div>

                <div className="flex-1 w-full mb-6 md:mb-0">
                    <img src="/homeImg.png" className="w-full sm:w-3/4 md:w-[80%] rounded mx-auto" alt="Home Illustration" />
                </div>
            </div>

        </section>
    );
}

export default Home;