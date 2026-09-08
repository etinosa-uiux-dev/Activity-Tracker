import { useEffect, useState } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

import { 
    BarChart, 
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend 
} from "recharts";



function Tracker () {

    const [activities, setActivities] = useState( () => {
        const saved = localStorage.getItem("activities");
        return saved ? JSON.parse(saved) : [];
    });

    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");

    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [editDuration, setEditDuration] = useState("");


    useEffect( () => {
        localStorage.setItem("activities", JSON.stringify(activities));
    }, [activities]);

    const dailyData = activities.reduce( (acc, activity) => {
        const day = activity.date;

        if (!acc[day]) {
            acc[day] = 0;
        }
        acc[day] += activity.duration;
        return acc;
    }, {});

    const dailyChartData = Object.entries(dailyData).map( ([date, total]) => ({
        date,
        total,
    }));

    const completedCount = activities.filter( (a) => a.completed).length;
    const pendingCount = activities.length - completedCount;

    const completionData = [
        {name: "Completed", value: completedCount},
        {name: "Pending", value: pendingCount}
    ]

    const COLORS = ["#4CAF50", "#FF9800"];

    const [category, setCategory] = useState("");
    const [editCategory, setEditCategory] = useState("")

    const categoryData =activities.reduce( (acc, activity) => {
        const cat = activity.category || "Uncategorized";

        if (!acc[cat]) {
            acc[cat] = 0;
        }
        acc[cat] += activity.duration;
        return acc;
    }, {});

    const categoryChartData = Object.entries(categoryData).map( ([cat, total]) => ({
        name: cat,
        value: total
    }));

    const CATEGORY_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#e412af"];

    const totalTime = activities.reduce( (sum, a) => sum + a.duration, 0);
    const completed = activities.filter( (a) => a.completed).length;
    
    // Get unique dates when activities were actually completed
    const completedDates = new Set( activities .filter((a) => a.completed && a.completedDate) .map((a) => a.completedDate) );

    // Calculate the current consecutive-day streak 
    let streak = 0; 
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    while (true) {
        const dateString = currentDate.toISOString().split("T")[0]; 
            if (!completedDates.has(dateString)) { 
                break; 
            } 
            
            streak++; 
            
            currentDate.setDate(currentDate.getDate() - 1); 
        }

    return (
        <section className="bg-cover bg-center" style={{backgroundImage: `url('/homeBg.png')`}}>
            <Header />

            <div className="p-[5%] min-h-screen flex flex-col items-center justify-center pt-50">

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Your Daily Progress at a Glance
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200">
                        Track, analyze, and improve your habits one step at a time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-md">
                        <p className="text-lg font-semibold">
                            Total Time Tracked
                        </p>

                        <h3 className="text-3xl font-bold">
                            {totalTime} mins
                        </h3>
                    </div>

                    <div className="bg-green-600 text-white p-6 rounded-xl shadow-md">
                        <p className="text-lg font-semibold">
                            Completed Activities
                        </p>

                        <h3 className="text-3xl font-bold">
                            {completed}
                        </h3>
                    </div>

                    <div className="bg-purple-600 text-white p-6 rounded-xl shadow-md">
                        <p className="text-lg font-semibold">
                            Current Streak
                        </p>

                        <h3 className="text-3xl font-bold">
                            {streak} days
                        </h3>
                    </div>
                </div>

                <div className="bg-indigo-600 flex justify-between items-center w-[70%] py-10 px-[5%] rounded-2xl">
                    <form className="flex flex-col justify-center h-70 gap-4 mb-6 w-[45%] p-[4%]" 
                        onSubmit={ (e) => {
                            e.preventDefault();
                            if (!name || !duration || !category) {
                                return;
                            }

                            const newActivity = {
                                id: Date.now(),
                                name,
                                duration: parseInt(duration),
                                category,
                                completed: false,
                                date: new Date().toISOString().split("T")[0],
                                completedDate: null
                            };

                            setActivities([...activities, newActivity]);
                            setName("");
                            setDuration("");
                            setCategory("");
                        }}
                    >

                        <input type="text" className="border rounded px-4 py-2 w-full" placeholder="Activity name" value={name} onChange={ (e) => setName(e.target.value)} />

                        <input type="number" className="border rounded px-4 py-2 w-full" placeholder="Duration (minutes)" value={duration} onChange={ (e) => setDuration(e.target.value)} />

                        <select required className="border rounded px-4 py-2 w-full bg-indigo-700" value={category} onChange={ (e) => setCategory(e.target.value)}>
                            <option value="">Select Category</option>
                            <option value="Work">Work</option>
                            <option value="Exercise">Exercise</option>
                            <option value="Study">Study</option>
                            <option value="Leisure">Leisure</option>
                            <option value="Other">Other</option>
                        </select>
                        
                        <button type="submit" className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600 cursor-pointer">
                            Add Activity
                        </button>

                        <button
                            onClick={() => {
                            if (window.confirm("Are you sure you want to delete all activities?")) {
                                setActivities([]);
                            }
                            }}
                            className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                        >
                            Clear All
                        </button>
                    </form>

                    <div className="space-y-4 max-h-75 w-[45%] p-2 overflow-auto scrollbar-hide">
                        {activities.length === 0 ? (
                            <p>
                                No activities logged yet.
                            </p>
                        ) :
                        [...activities].reverse().map( (activity) => (
                            <div key={activity.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-2 rounded">
                                <div className="flex items-center gap-4">
                                    <input type="checkbox" checked={activity.completed} onChange={ () => {
                                        setActivities(
                                            activities.map( (a) => {
                                                if (a.id !== activity.id) {
                                                    return a;
                                                }

                                                return {
                                                    ...a,
                                                    completed: completing,
                                                    completedDate: completing
                                                    ? new Date().toISOString().split("T")[0]
                                                    : null
                                                };
                                            })
                                        );
                                    }} className="w-5 h-5" />

                                    <div>
                                        {editId === activity.id ? (
                                            <div className="flex gap-2">
                                                <input type="text" value={editName} onChange={ (e) => setEditName(e.target.value)} className="border rounded px-2 py-1 w-32" />

                                                <input type="number" value={editDuration} onChange={ (e) => setEditDuration(e.target.value)} className="border rounded px-2 py-1 w-20" />

                                                <select value={editCategory} onChange={ (e) => setEditCategory(e.target.value)} className="border rounded px-2 py-1">
                                                    <option value="Work">Work</option>
                                                    <option value="Exercise">Exercise</option>
                                                    <option value="Study">Study</option>
                                                    <option value="Leisure">Leisure</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        ) 
                                        : (
                                            <>
                                                <p className={`font-medium ${activity.completed ? "line-through text-gray-400" : ""}`}>
                                                    {activity.name}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {activity.duration} mins • {activity.category}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="ml-3 flex gap-2">
                                    {editId === activity.id ? (
                                        <>
                                            <button onClick={ () => {
                                                setActivities(
                                                    activities.map( (a) => 
                                                        a.id === activity.id
                                                        ? {
                                                            ...a,
                                                            name: editName,
                                                            duration: parseInt(editDuration),
                                                            category: editCategory
                                                        }
                                                        : a
                                                    )
                                                );
                                                setEditId(null);
                                            }} className="text-green-500 hover:text-green-700 font-semibold cursor-pointer">
                                                Save
                                            </button>
                                            <button onClick={ () => setEditId(null)} className="text-gray-500 hover:text-gray-700 font-semibold cursor-pointer">
                                                Cancel
                                            </button>
                                        </>
                                    )
                                    : (
                                        <>
                                            <button onClick={ () => {
                                                setEditId(activity.id);
                                                setEditName(activity.name);
                                                setEditDuration(activity.duration);
                                                setEditCategory(activity.category || "Other");
                                            }} className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer">
                                                Edit
                                            </button>

                                            <button onClick={ () => 
                                            setActivities(activities.filter( (a) => a.id !== activity.id))} className="text-red-500 hover:text-red-700 font-semibold cursor-pointer">
                                            Delete
                                        </button>
                                    </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-indigo-500 mt-10 mb-20 w-[70%] py-10 px-[5%] rounded-2xl">
                    <h3 className="text-2xl font-bold mb-6">Your Stats</h3>

                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-4 rounded shadow">
                            <h4 className="text-black font-semibold mb-10 text-lg">Daily Activity (mins)</h4>

                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={dailyChartData}>
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="total" fill="#3B82F6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h4  className="text-black font-semibold mb-10 text-lg">Completion Status</h4>

                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={completionData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label 
                                    >
                                        {completionData.map( (entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <h4  className="text-black font-semibold mb-10 text-lg">Time by Category</h4>

                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={categoryChartData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label
                                    >
                                        {categoryChartData.map( (entry, index) => (
                                            <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
{/* 
                        <div className="bg-white p-4 rounded shadow">
                            [Daily Activity Chart]
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            [Completion Status Chart]
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            [Category Breakdown Chart]
                        </div> */}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl mb-12">
                    <h3 className="text-indigo-700 text-xl font-bold mb-4">
                        Recent Activities
                    </h3>

                    {activities.slice(-5).reverse().map( (a) => (
                        <p key={a.id} className="border-b py-2 text-gray-700">
                            {a.date} - {a.name} ({a.duration} mins, {a.category})
                        </p>
                    ))}
                </div>

                <div className="text-center text-white italic">
                    "Small consistent actions lead to big results."
                </div>
            </div>

            <Footer />
        </section>
    );
}

export default Tracker;