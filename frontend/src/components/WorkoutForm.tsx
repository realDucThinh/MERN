import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus } from "lucide-react";

interface WorkoutFormProps {
  onAdd: (workout: { title: string; load: number; reps: number }) => void;
}

export function WorkoutForm({ onAdd }: WorkoutFormProps) {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Please enter a workout title");
      return;
    }

    const loadNum = parseFloat(load);
    const repsNum = parseInt(reps);

    if (!load || isNaN(loadNum) || loadNum <= 0) {
      setError("Please enter a valid load (kg)");
      return;
    }

    if (!reps || isNaN(repsNum) || repsNum <= 0) {
      setError("Please enter a valid number of reps");
      return;
    }

    onAdd({
      title: title.trim(),
      load: loadNum,
      reps: repsNum,
    });

    setTitle("");
    setLoad("");
    setReps("");
  };

  return (
    <Card className="sticky top-20 border-green-200">
      <CardHeader className="bg-green-50 border-b border-green-100">
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Plus className="w-5 h-5" />
          Add New Workout
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-gray-700">
              Exercise Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="e.g., Bench Press"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5 border-gray-300 focus:border-green-600 focus:ring-green-600"
            />
          </div>

          <div>
            <Label htmlFor="load" className="text-gray-700">
              Load (kg)
            </Label>
            <Input
              id="load"
              type="number"
              placeholder="e.g., 50"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              step="0.5"
              min="0"
              className="mt-1.5 border-gray-300 focus:border-green-600 focus:ring-green-600"
            />
          </div>

          <div>
            <Label htmlFor="reps" className="text-gray-700">
              Reps
            </Label>
            <Input
              id="reps"
              type="number"
              placeholder="e.g., 10"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              min="1"
              className="mt-1.5 border-gray-300 focus:border-green-600 focus:ring-green-600"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Workout
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
