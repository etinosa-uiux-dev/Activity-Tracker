


function Footer () {

    return (
        <section className="py-[1%] px-[5%] flex justify-between items-center text-sm bg-white">
            <div>
                <p className="text-gray-500">© {new Date().getFullYear()} Activity Tracker. All rights reserved.</p>
            </div>

            <div className="flex gap-5 font-medium text-gray-800">
                <p className="cursor-pointer">Privacy</p>
                <p className="cursor-pointer">Terms</p>
            </div>
        </section>
    );
}

export default Footer;