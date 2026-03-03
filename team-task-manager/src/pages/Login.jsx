import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (!error) navigate("/");
        else alert(error.message);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                <input
                    className="w-full mb-3 p-2 border rounded"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="w-full mb-4 p-2 border rounded"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>
        </div>
    );
}