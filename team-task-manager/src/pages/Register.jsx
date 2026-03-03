import { useState } from "react";
import { registerUser } from "../api/auth.api";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        const res = await registerUser(email, password);
        if (!res.success) {
            alert(res.error);
            return;
        }

        const userId = res.data.user.id;

       
        const { count } = await supabase
            .from("profiles")
            .select("*", { count: "exact", head: true });

        
        const { data: team } = await supabase
            .from("teams")
            .select("id")
            .limit(1)
            .single();

     
        const role = count === 0 ? "admin" : "member";

        await supabase.from("profiles").insert({
            id: userId,
            team_id: team.id,
            role
        });

        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow w-96">
                <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="border p-2 w-full mb-4"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />

                <button
                    onClick={handleRegister}
                    className="bg-blue-600 text-white w-full py-2 rounded"
                >
                    Register
                </button>
            </div>
        </div>
    );
}