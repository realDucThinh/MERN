import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { WorkoutCard } from "./components/WorkoutCard";
import { WorkoutForm } from "./components/WorkoutForm";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { Dumbbell } from "lucide-react";
import { API_ENDPOINTS } from "./config";

interface Workout {
  _id: string;
  title: string;
  load: number;
  reps: number;
  createdAt?: string;
  updatedAt?: string;
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch workouts from API
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.workouts);
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        toast.error('Failed to fetch workouts');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleLogin = () => {
    // Mock Google login
    const mockUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    };
    setUser(mockUser);
    toast.success("Logged in successfully!");
  };

  const handleLogout = () => {
    setUser(null);
    toast.success("Logged out successfully!");
  };

  const handleAddWorkout = async (workout: Omit<Workout, "_id">) => {
    if (!user) {
      toast.error("Please login to add workouts");
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.workouts, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workout),
      });

      if (!response.ok) {
        throw new Error('Failed to add workout');
      }

      const newWorkout = await response.json();
      setWorkouts([newWorkout, ...workouts]);
      toast.success("Workout added successfully!");
    } catch (error) {
      console.error('Error adding workout:', error);
      toast.error('Failed to add workout');
    }
  };

  const handleDeleteWorkout = async (id: string) => {
    if (!user) {
      toast.error("Please login to delete workouts");
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINTS.workouts}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete workout');
      }

      setWorkouts(workouts.filter((w: Workout) => w._id !== id));
      toast.success("Workout deleted successfully!");
    } catch (error) {
      console.error('Error deleting workout:', error);
      toast.error('Failed to delete workout');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} />

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

            {loading ? (
              <div className="text-center py-16">
                <p className="text-gray-600">Loading workouts...</p>
              </div>
            ) : workouts.length === 0 ? (
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
                {workouts.map((workout: Workout) => (
                  <WorkoutCard
                    key={workout._id}
                    id={workout._id}
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
