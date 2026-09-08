import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn, signUp } from "../firebase";

function Login () {

    const navigate = useNavigate();

    const [signState, setSignState] = useState("Sign In");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const userAuth = async (e) => {
        e.preventDefault();

        if (signState === "Sign In") {
            const success = await logIn(email, password);

            console.log("LOGIN RESULT:", success);

            if (success) {
                console.log("NAVIGATE TO LAND");
                navigate("/land")
            }
        } else {
            const user = await signUp(name, email, password);

            if (user) {
                navigate("/verify-email")
            }
        }
    };

    return (
        <section className='relative h-screen flex justify-center items-center bg-cover bg-center' style={{backgroundImage: `url('/homeBg.png')`}}>

            <div className="absolute top-5 left-25">
                <h1 className="text-4xl font-bold">
                    TEMPO <span className="text-sm font-light">
                        keeping pace with your life’s rhythm
                    </span>
                </h1>
            </div>

            <div className="bg-linear-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center rounded-2xl py-8 gap-y-8 ">

                <h1 className='text-3xl font-bold text-white'>{signState}</h1>

                <form onSubmit={userAuth} className='w-96 font-semibold flex flex-col items-center justify-center gap-y-8'>

                    {
                        signState === "Sign Up" ? 
                            <input 
                                type="text" 
                                placeholder='Name' 
                                className='bg-white text-gray-500 placeholder:text-gray-300 p-2 rounded w-[80%] focus:outline-none' 
                                value={name} 
                                onChange={ (e) => {setName(e.target.value)}} 
                            /> : 
                            <></>
                    }

                    <input 
                        type="email" 
                        placeholder='Email' 
                        className='bg-white text-gray-500 placeholder:text-gray-300 p-2 rounded w-[80%] focus:outline-none' 
                        value={email} 
                        onChange={ (e) => {setEmail(e.target.value)}} 
                    />

                    <input 
                        type="password" 
                        placeholder='Password' 
                        className='bg-white text-gray-500 placeholder:text-gray-300 p-2 rounded w-[80%] focus:outline-none' 
                        value={password} 
                        onChange={ (e) => {setPassword(e.target.value)}} 
                    />
                    
                    <button 
                        type='submit' 
                        className='bg-blue-600 text-white w-[80%] p-2 rounded cursor-pointer hover:bg-linear-to-r hover:from-sky-700 hover:to-purple-500 font-bold'
                    >
                        Let's Go
                    </button>
                </form>

                <div>
                    {
                        signState === "Sign In" ? 
                            <p className="text-gray-300">
                                Are you new here? <span onClick={ () => {setSignState("Sign Up")}} className="cursor-pointer text-white font-medium">Sign Up</span>
                            </p> :
                            <p className="text-gray-300">
                                Not new here? <span  onClick={ () => {setSignState("Sign In")}} className="cursor-pointer text-white font-medium">Sign In</span>
                            </p>
                    }            
                </div>
            </div>
        </section>
    );
}

export default Login;