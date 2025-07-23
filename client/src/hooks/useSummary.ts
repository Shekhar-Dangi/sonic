import { useEffect, useState } from "react";
import { getCardioDuration, getSessionCount, getVolume } from "../lib/summary";
import { useUserStore } from "../stores/userStore";

export function useSummary() {
  const { logs } = useUserStore();
  const [volume, setVolume] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    const vol = getVolume(logs, 7);
    const dur = getCardioDuration(logs, 7);
    const ses = getSessionCount(logs, 7);

    setVolume(vol);
    setDuration(dur);
    setSessions(ses);
  }, [logs, volume]);
  return { volume, duration, sessions };
}
