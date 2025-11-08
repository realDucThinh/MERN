import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { WorkoutCard } from "./components/WorkoutCard";
import { WorkoutForm } from "./components/WorkoutForm";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { Dumbbell } from "lucide-react";

interface Workout {
  id: string;
  title: string;
  load: number;
  reps: number;
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

type Page = "login" | "signup" | "app";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [user, setUser] = useState<User | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: "1",
      title: "Bench Press",
      load: 60,
      reps: 10,
    },
    {
      id: "2",
      title: "Squat",
      load: 80,
      reps: 12,
    },
    {
      id: "3",
      title: "Deadlift",
      load: 100,
      reps: 8,
    },
  ]);

  const handleLogin = (email?: string, password?: string) => {
    // Mock login - in production, this would authenticate with backend
    const mockUser = {
      name: email ? email.split("@")[0] : "John Doe",
      email: email || "john.doe@example.com",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email || "John"}`,
    };
    setUser(mockUser);
    setCurrentPage("app");
    toast.success("Logged in successfully!");
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    const mockUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    };
    setUser(mockUser);
    setCurrentPage("app");
    toast.success("Logged in with Google successfully!");
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Mock signup - in production, this would create account in backend
    const mockUser = {
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    };
    setUser(mockUser);
    setCurrentPage("app");
    toast.success("Account created successfully!");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("login");
    toast.success("Logged out successfully!");
  };

  const handleAddWorkout = (workout: Omit<Workout, "id">) => {
    if (!user) {
      toast.error("Please login to add workouts");
      return;
    }

    const newWorkout: Workout = {
      ...workout,
      id: Date.now().toString(),
    };

    setWorkouts([newWorkout, ...workouts]);
    toast.success("Workout added successfully!");
  };

  const handleDeleteWorkout = (id: string) => {
    if (!user) {
      toast.error("Please login to delete workouts");
      return;
    }

    setWorkouts(workouts.filter((w) => w.id !== id));
    toast.success("Workout deleted successfully!");
  };

  // Render login page
  if (currentPage === "login") {
    return (
      <>
        <LoginPage
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentPage("signup")}
        />
        <Toaster position="bottom-right" />
      </>
    );
  }

  // Render signup page
  if (currentPage === "signup") {
    return (
      <>
        <SignupPage
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentPage("login")}
        />
        <Toaster position="bottom-right" />
      </>
    );
  }

  // Render main app
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogin={handleGoogleLogin} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workout List */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-gray-900 mb-2">My Workouts</h1>
              <p className="text-gray-600">
                Track your exercises and progress
              </p>
            </div>

            {workouts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <Dumbbell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">No workouts yet</h3>
                <p className="text-gray-600">
                  {user
                    ? "Add your first workout to get started!"
                    : "Please login to add workouts"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {workouts.map((workout) => (
                  <WorkoutCard
                    key={workout.id}
                    {...workout}
                    onDelete={handleDeleteWorkout}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Add Workout Form */}
          <div className="lg:col-span-1">
            <WorkoutForm onAdd={handleAddWorkout} />
          </div>
        </div>
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}
