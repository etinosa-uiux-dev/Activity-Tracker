import Header from "../sections/Header";
import Footer from "../sections/Footer"


function About () {

    const team = [
        { name: "Alice", img: "/team1.jpg" },
        { name: "Bob", img: "/team2.jpg" },
        { name: "Charlie", img: "/team3.jpg" },
        { name: "Diana", img: "/team4.jpg" },
        { name: "Ethan", img: "/team5.jpg" },
        { name: "Fiona", img: "/team6.jpg" },
        { name: "George", img: "/team7.jpg" },
        { name: "Hannah", img: "/team8.jpg" },
        { name: "Ian", img: "/team9.jpg" },
        { name: "James", img: "/team10.jpg" },
        { name: "kyle", img: "/team11.jpg" },
    ];

    const centerIndex = Math.floor(team.length / 2);


    return (
        <section className="bg-cover bg-center" style={{backgroundImage: `url('/homeBg.png')`}}>
            <Header />

            <div className="p-[5%] min-h-screen flex flex-col justify-center items-start">

                <h1 className="font-bold text-4xl mb-10">
                    The Idea Behind Us.
                </h1>

                <div className="flex justify-between items-center w-full">
                    <div className="w-280 leading-7">
                        <p className="mb-6">
                            Every day, we juggle countless tasks, goals, and responsibilities — yet at the end of the day, it often feels like time slipped away without clear progress. That frustration is what inspired us to create <span className="font-semibold">Tempo</span>: a simple yet powerful activity tracker built to help you stay in control of your time, energy, and habits.
                        </p>

                        <p  className="mb-6">
                            Our story began with a simple question: “What if we could see where our day truly goes?”
                        </p>

                        <p className="mb-6">
                            By tracking daily activities in an intuitive and visual way, we realized patterns that were easy to overlook — wasted hours, unhealthy routines, and missed opportunities for growth. We knew this wasn’t just our challenge; it was a universal one. That’s why we set out to design a tool that doesn’t just track your activities, but helps you understand them, so you can take meaningful action.
                        </p>

                        <p className="mb-6">
                            At <span className="font-semibold">Tempo</span>, we believe productivity isn’t about doing more; it’s about doing what matters most. By combining clean design, insightful analytics, and a personal touch, our tracker empowers you to:
                        </p>

                        <ul className="list-disc">
                            <li>
                                Visualize your day with clarity, spotting habits and trends instantly.
                            </li>
                            <li>
                                Stay accountable by monitoring your goals and routines.
                            </li>
                            <li>
                                Boost well-being by balancing productivity with rest and mindful activities.
                            </li>
                            <li>
                                Evolve over time with insights that help you grow personally and professionally.
                            </li>
                        </ul>

                        <p className="mt-6">
                            We’re not just building an app; we’re building a movement toward intentional living. And we’d love for you to be part of it.
                        </p>
                    </div>

                    <div className="h-110 w-100 bg-cover bg-bottom rounded-2xl" style={{backgroundImage: `url('/aboutImg.jpg')`}}>

                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center px-[5%] mb-20">
                <div className="bg-violet-500 w-150 h-80 flex flex-col items-center justify-start py-[2%] rounded-3xl">
                    <h2 className="text-5xl mb-10 font-bold">Our Mission</h2>

                    <p className="w-100 text-xl">
                        To empower individuals to take control of their time, habits, and goals by offering a clear picture of their daily lives — and inspiring meaningful change.
                    </p>
                </div>

                <div className="hidden md:block w-1 h-70 bg-gray-200 -mx-px"></div>

                <div className="bg-indigo-600 w-150 h-80 flex flex-col items-center justify-start py-[2%] rounded-3xl">
                    <h2 className="text-5xl mb-10 font-bold">Our Vision</h2>

                    <p className="w-100 text-xl">
                        A world where people live with balance, productivity, and well-being, unlocking their potential one small step at a time.
                    </p>
                </div>
            </div>

            {/* <div className="flex justify-center items-center px-[5%] flex-wrap">

                <div className="bg-red-800 w-full md:w-[300px] h-80 flex flex-col items-center justify-center rounded-3xl">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-center">
                        Our Mission
                    </h2>

                    <p className="w-11/12 md:w-10/12 text-center text-sm md:text-base lg:text-lg">
                        To empower individuals to take control of their time, habits, and goals by offering a clear picture of their daily lives — and inspiring meaningful change.
                    </p>
                </div>


                <div className="hidden md:block w-1 h-80 bg-gray-200 mx-[-1px]"></div>
    
                <div className="bg-green-800 w-full md:w-[300px] h-80 flex flex-col items-center justify-center rounded-3xl">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-center">
                        Our Vision
                    </h2>

                    <p className="w-11/12 md:w-10/12 text-center text-sm md:text-base lg:text-lg">
                        A world where people live with balance, productivity, and well-being, unlocking their potential one small step at a time.
                    </p>
                </div>
            </div> */}

            <div className="py-20 px-[5%]">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Meet Our Team</h2>

                <div className="flex justify-center items-end space-x-4 md:space-x-8">

                    {team.map( (member, index) => {
                        const distanceFromCenter = Math.abs(centerIndex - index);

                        const scale = 1 - distanceFromCenter * 0.1;
                        const size = 56 + scale * 40;

                        const translateY = distanceFromCenter * 8;

                        return (
                            <div key={member.name} className="flex flex-col items-center">
                                <div 
                                    className="rounded-full object-cover bg-red-300 cursor-pointer transform transition-transform duration-300 hover:scale-105" 
                                    style={{
                                        width: `${size}px`,
                                        height: `${size}px`,
                                        transform: `scale(${scale}) translateY(${translateY}px)`,
                                    }}
                                />
                                <p className="mt-2 text-center text-sm md:text-base">{member.name}</p>
                            </div>
                        );
                    })}

                </div>
            </div>

            <Footer />
        </section>
    );
}

export default About;