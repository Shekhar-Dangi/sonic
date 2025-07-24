import { useUserStore } from "../stores/userStore";

const LogsPage = () => {
  const { logs } = useUserStore();

  // Get the 10 most recent logs
  const recentLogs = logs
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return "N/A";
    return `${duration}hrs`;
  };

  if (recentLogs.length === 0) {
    return (
      <div className="flex-1/1 px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Recent Logs</h1>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-24 h-24 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No workout logs yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start logging your workouts using the voice recorder!
            </p>
            <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-blue-700">
                <strong>Tip:</strong> Use the microphone button in the sidebar
                to record your workout details like "Did 3 sets of bench press,
                10 reps each at 135 pounds"
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1/1 px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recent Logs</h1>
        <p className="text-gray-600">Your last 10 workout sessions</p>
      </div>

      <div className="space-y-4">
        {recentLogs.map((log) => (
          <div
            key={log.id}
            className="card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {formatDate(log.date)}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <span>Duration: {formatDuration(log.duration)}</span>
                  <span>•</span>
                  <span>
                    {log.exercises.length} exercise
                    {log.exercises.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                Completed
              </div>
            </div>

            {log.note && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Note:</span> {log.note}
                </p>
              </div>
            )}

            <div className="space-y-3">
              {log.exercises.map((exercise, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {exercise.name}
                      </h4>
                      <p className="text-sm text-gray-500 capitalize">
                        {exercise.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {exercise.sets.length} set
                        {exercise.sets.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {exercise.sets.map((set, setIndex) => (
                      <div
                        key={setIndex}
                        className="bg-white border rounded-md px-3 py-1 text-xs"
                      >
                        {set.reps && <span>{set.reps} reps</span>}
                        {set.weight && (
                          <span className="ml-1">@ {set.weight}lbs</span>
                        )}
                        {set.duration && (
                          <span className="ml-1">{set.duration}hrs</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {logs.length > 10 && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">
            Showing 10 most recent logs. You have {logs.length - 10} more older
            logs.
          </div>
        </div>
      )}
    </div>
  );
};

export default LogsPage;
