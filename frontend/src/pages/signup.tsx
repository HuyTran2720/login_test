import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { Loader2Icon } from "lucide-react"
import { useRouter } from "next/router";
import { ToastContainer, toast, Bounce } from 'react-toastify';

import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

export default function signUp () {
    const [ email, setEmail ] = useState<string> ("");
    const [ password, setPassword ] = useState<string> ("");
    const [ confirmPass, setConPassword ] = useState<string> ("");

    const [ passMasked, setPassMasked ] = useState<boolean> (true);
    const [ confirmMasked, setConMasked ] = useState<boolean> (true);

    const [ loading, setLoading ] = useState<boolean> (false);

    const router = useRouter()

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (!validEmail() || !validPassword() || !validConPassword()) {
                toast.error('Some inputs are invalid. Please check and try again.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            } else if (password !== confirmPass) {
                toast.error('Your password and confirmation password do not match.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            } else {
                const res = await fetch("http://localhost:3001/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });

                const data = await res.json();
                if (!data.error) router.push("/login");
                else {
                    toast.error('Error signing up. Please try again.', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    });
                }
            }
        } catch (error) {
            console.error(`Error signing up: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    // TODO: form validation
    const validEmail = (): boolean => {
        
        return true;
    }
    const validPassword = (): boolean => {
        
        return true;
    }
    const validConPassword = (): boolean => {
        
        return true;
    }

    return (
        <div className={`w-screen h-screen ${inter.className}`}>
            <main 
                className="
                    w-full h-full
                    flex 
                    items-center justify-center
                    bg-gray-100
                "
            >
                <div 
                    className="
                        bg-white px-10 py-8 rounded-xl shadow-lg
                        w-3/10 h-5/10
                        flex flex-col items-center justify-between
                    "
                >
                    <p style={{ fontWeight: 700 }} className="text-2xl text-blue-500"> 
                        Sign Up 
                    </p>
                    <form onSubmit={(e)=> handleSignup(e)}
                        className="
                            w-7/10 h-[85%]
                            flex flex-col justify-between
                        "
                    >
                        <div>
                            <Label className="pb-2"> Email </Label>
                            <Input 
                                type="email" 
                                value={email}
                                placeholder="e.g johndoe@email.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <div className="w-full">
                            <Label className="pb-2"> Password </Label>
                            <div className="
                                relative w-full max-w-sm
                            "
                            >
                                <Input 
                                    type={`${passMasked ? "password" : "text"}`} 
                                    value={password}
                                    placeholder="Enter Password" 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button type="button" onClick={() => setPassMasked(!passMasked)} className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent hover:cursor-pointer"> 
                                    {passMasked ? <EyeClosed color="black" /> : <Eye color="black" />}
                                </Button>
                            </div>
                        </div>

                        <div>
                            <Label className="pb-2"> Confirm Password </Label>
                            <div className="
                                relative w-full max-w-sm
                            ">
                                <Input 
                                    type={`${confirmMasked ? "password" : "text"}`} 
                                    value={confirmPass}
                                    placeholder="Confirm Password" 
                                    onChange={(e) => setConPassword(e.target.value)}
                                />
                                <Button type="button" onClick={() => setConMasked(!confirmMasked)} className="absolute right-0 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent hover:cursor-pointer"> 
                                    {confirmMasked ? <EyeClosed color="black" /> : <Eye color="black" />}
                                </Button>
                            </div>
                        </div>

                        <Button type="submit" disabled={loading} className="bg-blue-500"> 
                            {loading ? 
                                <> <Loader2Icon className="animate-spin" /> Please Wait </>
                                : 
                                "Sign Up!"
                            } 
                        </Button>

                        <p className="text-center"> Already a member? 
                            <Link href={"login"} className="text-blue-500"> Sign in </Link> 
                        </p>
                    </form>
                </div>

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="colored"
                    transition={Bounce}
                />
            </main>
        </div>
    );
}
