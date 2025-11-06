import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Trash2, Weight } from "lucide-react";

interface WorkoutCardProps {
  id: string;
  title: string;
  load: number;
  reps: number;
  onDelete: (id: string) => void;
}

export function WorkoutCard({ id, title, load, reps, onDelete }: WorkoutCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow border-l-4 border-l-green-600">
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-gray-900 mb-2">{title}</h3>
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Weight className="w-4 h-4 text-green-600" />
                <span>{load} kg</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>{reps} reps</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => onDelete(id)}
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
