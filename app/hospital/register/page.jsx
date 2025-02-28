import Image from "next/image";
import DarkModeToggle from "@/app/Components/DarkMode";
import Logo from "@/app/Components/Logo";
import AnimatedBackground from "@/app/Components/AnimatedBackground";
import RegisterForm from "./components/register";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="relative flex-1 bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
        
        <AnimatedBackground />
        
        
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            Welcome to
            <br />
            LifeLine
          </h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 transition-colors duration-200">
        <DarkModeToggle/>
        <Logo />
        <RegisterForm />
      </div>
    </div>
  );
}
