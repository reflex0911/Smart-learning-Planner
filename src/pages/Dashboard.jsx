import { useState, useEffect } from "react";

const Dashboard = () => {
  const [studyHours, setStudyHours] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [subjects, setSubjects] = useState([{ name: "", level: "Hard" }]);

  // wake
  const [wakeHour, setWakeHour] = useState("7");
  const [wakePeriod, setWakePeriod] = useState("AM");

  // sleep
  const [sleepHour, setSleepHour] = useState("11");
  const [sleepPeriod, setSleepPeriod] = useState("PM");

  // college
  const [goesCollege, setGoesCollege] = useState(false);
  const [collegeStartHour, setCollegeStartHour] = useState("9");
  const [collegeStartPeriod, setCollegeStartPeriod] = useState("AM");
  const [collegeEndHour, setCollegeEndHour] = useState("4");
  const [collegeEndPeriod, setCollegeEndPeriod] = useState("PM");

  // ---------- autosave load ----------
  useEffect(() => {
    const savedSchedule = localStorage.getItem("schedule");
    const savedSubjects = localStorage.getItem("subjects");

    if (savedSchedule) setSchedule(JSON.parse(savedSchedule));
    if (savedSubjects) setSubjects(JSON.parse(savedSubjects));
  }, []);

  useEffect(() => {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  // ---------- helpers ----------
  const convertTo24 = (hour, period) => {
    let h = parseInt(hour);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return h;
  };

  const convertTo12 = (time) => {
    const totalMinutes = Math.round(time * 60);
    const hours24 = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const period = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 || 12;

    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: "", level: "Hard" }]);
  };

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  // ---------- generate ----------
  const generateSchedule = () => {
    let remaining = parseFloat(studyHours);
    if (!remaining) return;

    const hard = subjects.filter(s => s.level === "Hard" && s.name);
    const medium = subjects.filter(s => s.level === "Medium" && s.name);
    const easy = subjects.filter(s => s.level === "Easy" && s.name);
    const ordered = [...hard, ...medium, ...easy];

    const wake24 = convertTo24(wakeHour, wakePeriod);
    const sleep24 = convertTo24(sleepHour, sleepPeriod);

    const collegeS = convertTo24(collegeStartHour, collegeStartPeriod);
    const collegeE = convertTo24(collegeEndHour, collegeEndPeriod);

    let start = wake24 + 0.5;
    let list = [];
    let i = 0;

    while (remaining > 0 && start < sleep24) {
      const sub = ordered[i % ordered.length];

      let block = 1;
      if (sub.level === "Hard") block = 2;
      if (sub.level === "Medium") block = 1.5;

      if (remaining < block) block = remaining;

      let end = start + block;

      if (goesCollege) {
        if (start < collegeE && end > collegeS) {
          start = collegeE + 1;
          continue;
        }
      }

      list.push({
        subject: sub.name,
        time: `${convertTo12(start)} - ${convertTo12(end)}`,
        completed: false
      });

      start = end;
      remaining -= block;
      i++;

      if (remaining > 0) {
        let bEnd = start + 0.25;
        list.push({
          subject: "Break ☕",
          time: `${convertTo12(start)} - ${convertTo12(bEnd)}`,
          completed: false
        });
        start = bEnd;
      }
    }

    setSchedule(list);
  };

  const toggleDone = (index) => {
    const updated = [...schedule];
    updated[index].completed = !updated[index].completed;

    if (updated[index + 1] && updated[index + 1].subject === "Break ☕") {
      updated[index + 1].completed = updated[index].completed;
    }

    setSchedule(updated);
  };

  const total = schedule.filter(i => i.subject !== "Break ☕").length;
  const done = schedule.filter(i => i.completed && i.subject !== "Break ☕").length;
  const progress = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl mb-6 font-bold">Smart Planner 🧠</h1>

      <div className="space-y-3 max-w-md">

        {/* wake */}
        <div className="flex gap-2">
          <select value={wakeHour} onChange={(e)=>setWakeHour(e.target.value)} className="p-2 rounded bg-white/20">
            {[...Array(12)].map((_,i)=><option key={i+1}>{i+1}</option>)}
          </select>
          <select value={wakePeriod} onChange={(e)=>setWakePeriod(e.target.value)} className="p-2 rounded bg-white/20">
            <option>AM</option><option>PM</option>
          </select>
        </div>

        {/* sleep */}
        <div className="flex gap-2">
          <select value={sleepHour} onChange={(e)=>setSleepHour(e.target.value)} className="p-2 rounded bg-white/20">
            {[...Array(12)].map((_,i)=><option key={i+1}>{i+1}</option>)}
          </select>
          <select value={sleepPeriod} onChange={(e)=>setSleepPeriod(e.target.value)} className="p-2 rounded bg-white/20">
            <option>AM</option><option>PM</option>
          </select>
        </div>

        {/* college */}
        <label className="flex gap-2 items-center">
          College?
          <input type="checkbox" checked={goesCollege}
            onChange={()=>setGoesCollege(!goesCollege)} />
        </label>

        {goesCollege && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <select value={collegeStartHour} onChange={(e)=>setCollegeStartHour(e.target.value)} className="p-2 rounded bg-white/20">
                {[...Array(12)].map((_,i)=><option key={i+1}>{i+1}</option>)}
              </select>
              <select value={collegeStartPeriod} onChange={(e)=>setCollegeStartPeriod(e.target.value)} className="p-2 rounded bg-white/20">
                <option>AM</option><option>PM</option>
              </select>
            </div>

            <div className="flex gap-2">
              <select value={collegeEndHour} onChange={(e)=>setCollegeEndHour(e.target.value)} className="p-2 rounded bg-white/20">
                {[...Array(12)].map((_,i)=><option key={i+1}>{i+1}</option>)}
              </select>
              <select value={collegeEndPeriod} onChange={(e)=>setCollegeEndPeriod(e.target.value)} className="p-2 rounded bg-white/20">
                <option>AM</option><option>PM</option>
              </select>
            </div>
          </div>
        )}

        <input
          type="number"
          placeholder="Total study hours"
          value={studyHours}
          onChange={(e)=>setStudyHours(e.target.value)}
          className="w-full p-2 rounded bg-white/20"
        />

        {/* subjects */}
        {subjects.map((s,i)=>(
          <div key={i} className="flex gap-2">
            <input
              placeholder="Subject"
              value={s.name}
              onChange={(e)=>updateSubject(i,"name",e.target.value)}
              className="flex-1 p-2 rounded bg-white/20"
            />
            <select
              value={s.level}
              onChange={(e)=>updateSubject(i,"level",e.target.value)}
              className="p-2 rounded bg-white/20"
            >
              <option>Hard</option>
              <option>Medium</option>
              <option>Easy</option>
            </select>
          </div>
        ))}

        <button onClick={addSubject} className="bg-gray-600 px-4 py-2 rounded">
          + subject
        </button>

        <button onClick={generateSchedule}
          className="bg-blue-500 px-6 py-2 rounded">
          Generate
        </button>
      </div>

      {schedule.length>0 && (
        <div className="mt-6 max-w-md">
          <p>Progress: {progress}%</p>
          <div className="w-full bg-white/20 h-4 rounded">
            <div className="bg-green-500 h-4 rounded"
              style={{width:`${progress}%`}}></div>
          </div>
        </div>
      )}

      <div className="mt-10 space-y-3">
        {schedule.map((item,i)=>(
          <div key={i} className="bg-white/10 p-4 rounded flex justify-between">
            <div>
              <h2 className={`${item.completed?"line-through text-green-400":""}`}>
                {item.subject}
              </h2>
              <p>{item.time}</p>
            </div>

            {item.subject!=="Break ☕" && (
              <button
                onClick={()=>toggleDone(i)}
                className={`px-3 py-1 rounded ${item.completed?"bg-green-500":"bg-gray-500"}`}
              >
                Done
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;