import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { WorkoutCard } from "./components/WorkoutCard";
import { WorkoutForm } from "./components/WorkoutForm";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { Dumbbell } from "lucide-react";
import { API_ENDPOINTS } from "./config";
import { useAuthContext } from "./hooks/useAuthContext";
import { useLogout } from "./hooks/useLogout";

interface Workout {
  _id: string;
  title: string;
  load: number;
  reps: number;
  createdAt?: string;
  updatedAt?: string;
}

function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  // Fetch workouts from API
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.workouts, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }

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
  }, [user]);

  const handleLogout = () => {
    logout();
    setWorkouts([]);
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
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(workout),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add workout');
      }

      const newWorkout = await response.json();
      setWorkouts([newWorkout, ...workouts]);
      toast.success("Workout added successfully!");
    } catch (error: any) {
      console.error('Error adding workout:', error);
      toast.error(error.message || 'Failed to add workout');
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
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
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

  const mockUser = user ? {
    name: user.email.split('@')[0],
    email: user.email,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
  } : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={mockUser} onLogin={() => {}} onLogout={handleLogout} />

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
                  Add your first workout to get started!
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

export default function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
