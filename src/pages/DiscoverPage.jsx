import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

const STORAGE_KEYS = {
  meetings: "swapmantra_meetings",
  chats: "swapmantra_chats",
};

const initialMeetingForm = {
  date: "",
  time: "",
  mode: "Offline",
  location: "",
};

function readStorage(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function normalizeSkill(skill) {
  return skill.trim().toLowerCase();
}

function formatSkillList(skills) {
  return skills.join(", ");
}

function getSharedSkills(sourceSkills, targetSkills) {
  const targetSet = new Set(targetSkills.map(normalizeSkill));
  return sourceSkills.filter((skill) => targetSet.has(normalizeSkill(skill)));
}

function getDistanceLabel(currentCity, otherCity, index) {
  if (currentCity && otherCity && currentCity.toLowerCase() === otherCity.toLowerCase()) {
    return `${1.2 + index * 0.7} km`;
  }

  return `${6 + index * 1.5} km`;
}

function createMatch(user, candidate, index) {
  const candidateCanTeach = getSharedSkills(user.skillsWanted, candidate.skillsOffered);
  const userCanTeach = getSharedSkills(candidate.skillsWanted, user.skillsOffered);
  const localBonus = user.city && candidate.city && user.city.toLowerCase() === candidate.city.toLowerCase() ? 2 : 0;
  const score = candidateCanTeach.length * 3 + userCanTeach.length * 3 + localBonus;

  if (!candidateCanTeach.length || !userCanTeach.length) {
    return null;
  }

  return {
    id: `${user.id}-${candidate.id}`,
    candidate,
    score,
    candidateCanTeach,
    userCanTeach,
    distance: getDistanceLabel(user.city, candidate.city, index),
    compatibility: Math.min(98, 70 + score * 4),
  };
}

function MessageBubble({ message, isOwnMessage }) {
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 ${
          isOwnMessage ? "bg-teal-400 text-ink-950" : "border border-white/10 bg-white/5 text-slate-200"
        }`}
      >
        <p className={`text-[11px] uppercase tracking-[0.22em] ${isOwnMessage ? "text-ink-950/70" : "text-slate-500"}`}>
          {message.sender}
        </p>
        <p className="mt-1">{message.text}</p>
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  const { currentUser, isAuthenticated, profile, users } = useAppContext();
  const activeUser = currentUser || profile;

  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [meetingForm, setMeetingForm] = useState(initialMeetingForm);
  const [meetingStatus, setMeetingStatus] = useState("");
  const [messageDraft, setMessageDraft] = useState("");
  const [meetings, setMeetings] = useState(() => readStorage(STORAGE_KEYS.meetings, []));
  const [chats, setChats] = useState(() => readStorage(STORAGE_KEYS.chats, {}));

  const matchResults = useMemo(() => {
    if (!isAuthenticated || !currentUser) {
      return [];
    }

    return users
      .filter((candidate) => candidate.id !== currentUser.id)
      .map((candidate, index) => createMatch(currentUser, candidate, index))
      .filter(Boolean)
      .sort((left, right) => right.score - left.score);
  }, [currentUser, isAuthenticated, users]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.meetings, meetings);
  }, [meetings]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.chats, chats);
  }, [chats]);

  useEffect(() => {
    if (!selectedMatchId && matchResults.length) {
      setSelectedMatchId(matchResults[0].id);
    }

    if (selectedMatchId && !matchResults.some((match) => match.id === selectedMatchId)) {
      setSelectedMatchId(matchResults[0]?.id ?? null);
    }
  }, [matchResults, selectedMatchId]);

  const selectedMatch = matchResults.find((match) => match.id === selectedMatchId) || null;

  const selectedMeeting =
    meetings.find(
      (meeting) =>
        meeting.hostUserId === currentUser?.id && meeting.guestUserId === selectedMatch?.candidate.id
    ) || null;

  const selectedChat = chats[selectedMatchId] || [];

  const handleMeetingSubmit = (event) => {
    event.preventDefault();

    if (!selectedMatch || !currentUser) {
      return;
    }

    const newMeeting = {
      id: `meeting-${Date.now()}`,
      hostUserId: currentUser.id,
      guestUserId: selectedMatch.candidate.id,
      date: meetingForm.date,
      time: meetingForm.time,
      mode: meetingForm.mode,
      location: meetingForm.location.trim() || (meetingForm.mode === "Online" ? "Google Meet" : "Community Hub"),
      focus: `${selectedMatch.candidateCanTeach[0]} for ${selectedMatch.userCanTeach[0]}`,
      status: "Scheduled",
    };

    setMeetings((currentMeetings) => {
      const remainingMeetings = currentMeetings.filter(
        (meeting) =>
          !(meeting.hostUserId === currentUser.id && meeting.guestUserId === selectedMatch.candidate.id)
      );

      return [newMeeting, ...remainingMeetings];
    });

    setMeetingStatus(`Meeting booked with ${selectedMatch.candidate.name}.`);
    setMeetingForm(initialMeetingForm);

    setChats((currentChats) => {
      const currentThread = currentChats[selectedMatch.id] || [];

      return {
        ...currentChats,
        [selectedMatch.id]: [
          ...currentThread,
          {
            id: `msg-${Date.now()}`,
            sender: activeUser.name,
            text: `Booked a ${newMeeting.mode.toLowerCase()} session on ${newMeeting.date} at ${newMeeting.time} for ${newMeeting.focus}.`,
          },
          {
            id: `msg-${Date.now() + 1}`,
            sender: selectedMatch.candidate.name,
            text: `Perfect. See you at ${newMeeting.location}. I will prepare a quick plan for ${selectedMatch.candidateCanTeach[0]}.`,
          },
        ],
      };
    });
  };

  const handleSendMessage = (event) => {
    event.preventDefault();

    const cleanedMessage = messageDraft.trim();

    if (!cleanedMessage || !selectedMatch) {
      return;
    }

    setChats((currentChats) => {
      const thread = currentChats[selectedMatch.id] || [];

      return {
        ...currentChats,
        [selectedMatch.id]: [
          ...thread,
          {
            id: `msg-${Date.now()}`,
            sender: activeUser.name,
            text: cleanedMessage,
          },
        ],
      };
    });

    setMessageDraft("");
  };

  const quickMessages = selectedMatch
    ? [
        `Can we focus on ${selectedMatch.candidateCanTeach[0]} first?`,
        `I can help you with ${selectedMatch.userCanTeach[0]} in return.`,
        `Would evening work for our first session?`,
      ]
    : [];

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading
          eyebrow="Discover"
          title="The matching engine is ready once you log in"
          description="This prototype compares what you want to learn with what another user can teach, then checks whether you can teach something they want in return."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">How it works</p>
            <h2 className="mt-4 font-display text-4xl text-white">Mutual skill swap matching</h2>
            <p className="mt-4 text-slate-300">
              Example: User A offers Coding and wants Guitar. User B offers Guitar and wants Coding. The engine flags
              that as a strong two-way match and unlocks meeting plus chat.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-ink-900/75 p-4">Checks both offered and wanted skills</div>
              <div className="rounded-2xl border border-white/10 bg-ink-900/75 p-4">Boosts people from the same city</div>
              <div className="rounded-2xl border border-white/10 bg-ink-900/75 p-4">Stores meetings and chats in local storage</div>
            </div>
          </div>
          <div className="rounded-[30px] border border-teal-300/20 bg-teal-400/10 p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-teal-200">Next step</p>
            <h2 className="mt-4 font-display text-4xl text-white">Login to test the prototype</h2>
            <p className="mt-4 text-slate-200">
              Use the demo account `aarav@knit.local` with password `pass1234` and you will immediately see a reciprocal
              guitar-coding match.
            </p>
            <Link
              to="/auth?auth=login"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-950 transition hover:scale-[1.02]"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Discover"
        title="Mutual matches, meeting setup, and chat in one prototype"
        description="The page now compares what you want to learn with what another member can teach, verifies the reverse match, and keeps your planning data in local storage."
      />

      <div className="mt-10 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <aside className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Your live profile</p>
          <h2 className="mt-4 font-display text-3xl text-white">{activeUser.name}</h2>
          <p className="mt-2 text-sm text-slate-400">{activeUser.city}</p>

          <div className="mt-6 grid gap-4">
            <div className="rounded-[26px] border border-white/10 bg-ink-900/70 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">You can teach</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">{formatSkillList(activeUser.skillsOffered)}</p>
            </div>
            <div className="rounded-[26px] border border-white/10 bg-ink-900/70 p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">You want to learn</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">{formatSkillList(activeUser.skillsWanted)}</p>
            </div>
          </div>

          <div className="mt-6 rounded-[26px] border border-gold-300/20 bg-gold-400/10 p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-gold-200">Matching logic</p>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              We only show strong swaps where both sides get value. One person teaches what the other wants, and the
              exchange works in reverse too.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-sm uppercase tracking-[0.35em] text-coral-300">Best matches</p>
            <div className="mt-4 grid gap-3">
              {matchResults.length ? (
                matchResults.map((match) => (
                  <button
                    key={match.id}
                    type="button"
                    onClick={() => {
                      setSelectedMatchId(match.id);
                      setMeetingStatus("");
                    }}
                    className={`rounded-[26px] border p-4 text-left transition ${
                      selectedMatchId === match.id
                        ? "border-teal-300/40 bg-teal-400/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-2xl text-white">{match.candidate.name}</p>
                        <p className="mt-1 text-sm text-slate-400">{match.candidate.city}</p>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-teal-200">
                        {match.compatibility}% fit
                      </span>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-slate-300">
                      <p>They teach: {formatSkillList(match.candidateCanTeach)}</p>
                      <p>You teach: {formatSkillList(match.userCanTeach)}</p>
                      <p>{match.distance} away</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-[26px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
                  No two-way matches yet. Try registering another local user with complementary skills to test the engine.
                </div>
              )}
            </div>
          </div>
        </aside>

        <div className="grid gap-6">
          {selectedMatch ? (
            <>
              <section className="rounded-[30px] border border-white/10 bg-white/5 p-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Reciprocal match found</p>
                    <h2 className="mt-4 font-display text-4xl text-white">{selectedMatch.candidate.name}</h2>
                    <p className="mt-3 max-w-2xl text-slate-300">
                      {selectedMatch.candidate.name} can teach you {formatSkillList(selectedMatch.candidateCanTeach)} and
                      wants help with {formatSkillList(selectedMatch.userCanTeach)} from you.
                    </p>
                  </div>
                  <div className="rounded-[26px] border border-teal-300/20 bg-teal-400/10 px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-teal-200">Compatibility</p>
                    <p className="mt-2 text-4xl font-semibold text-white">{selectedMatch.compatibility}%</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-[26px] border border-white/10 bg-ink-900/70 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">What they teach you</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedMatch.candidateCanTeach.map((skill) => (
                        <span key={skill} className="rounded-full bg-teal-400/15 px-3 py-1.5 text-sm text-teal-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[26px] border border-white/10 bg-ink-900/70 p-5">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">What you teach them</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedMatch.userCanTeach.map((skill) => (
                        <span key={skill} className="rounded-full bg-coral-400/15 px-3 py-1.5 text-sm text-coral-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-gold-300">Meeting section</p>
                  <h3 className="mt-3 font-display text-3xl text-white">Book the first exchange</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Schedule a session for the matched pair. The booking is stored in local storage so the prototype keeps
                    it after refresh.
                  </p>

                  {selectedMeeting ? (
                    <div className="mt-6 rounded-[26px] border border-teal-300/20 bg-teal-400/10 p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-teal-200">Scheduled</p>
                      <p className="mt-3 text-xl font-semibold text-white">
                        {selectedMeeting.date} at {selectedMeeting.time}
                      </p>
                      <div className="mt-3 space-y-2 text-sm text-slate-200">
                        <p>Mode: {selectedMeeting.mode}</p>
                        <p>Place: {selectedMeeting.location}</p>
                        <p>Focus: {selectedMeeting.focus}</p>
                      </div>
                    </div>
                  ) : null}

                  <form className="mt-6 grid gap-4" onSubmit={handleMeetingSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        type="date"
                        value={meetingForm.date}
                        onChange={(event) => setMeetingForm((current) => ({ ...current, date: event.target.value }))}
                        className="rounded-2xl border border-white/10 bg-ink-900/70 px-4 py-3 text-white outline-none"
                        required
                      />
                      <input
                        type="time"
                        value={meetingForm.time}
                        onChange={(event) => setMeetingForm((current) => ({ ...current, time: event.target.value }))}
                        className="rounded-2xl border border-white/10 bg-ink-900/70 px-4 py-3 text-white outline-none"
                        required
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <select
                        value={meetingForm.mode}
                        onChange={(event) => setMeetingForm((current) => ({ ...current, mode: event.target.value }))}
                        className="rounded-2xl border border-white/10 bg-ink-900/70 px-4 py-3 text-white outline-none"
                      >
                        <option>Offline</option>
                        <option>Online</option>
                      </select>
                      <input
                        value={meetingForm.location}
                        onChange={(event) => setMeetingForm((current) => ({ ...current, location: event.target.value }))}
                        placeholder={meetingForm.mode === "Online" ? "Google Meet / Zoom link" : "Cafe, library, or hub"}
                        className="rounded-2xl border border-white/10 bg-ink-900/70 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink-950 transition hover:scale-[1.01]"
                    >
                      Save meeting
                    </button>
                    {meetingStatus ? <p className="text-sm text-teal-200">{meetingStatus}</p> : null}
                  </form>
                </div>

                <div className="rounded-[30px] border border-white/10 bg-white/5 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-coral-300">Chat section</p>
                  <h3 className="mt-3 font-display text-3xl text-white">Plan the swap</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Use this thread to align the session goal, share availability, and confirm the format.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {quickMessages.map((message) => (
                      <button
                        key={message}
                        type="button"
                        onClick={() => setMessageDraft(message)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.18em] text-slate-300 transition hover:border-teal-300/30 hover:text-white"
                      >
                        {message}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 h-[320px] space-y-3 overflow-y-auto rounded-[26px] border border-white/10 bg-ink-900/70 p-4">
                    {selectedChat.length ? (
                      selectedChat.map((message) => (
                        <MessageBubble
                          key={message.id}
                          message={message}
                          isOwnMessage={message.sender === activeUser.name}
                        />
                      ))
                    ) : (
                      <div className="flex h-full items-center justify-center text-center text-sm leading-7 text-slate-400">
                        Start the conversation. Messages are stored in local storage for this prototype.
                      </div>
                    )}
                  </div>

                  <form className="mt-4 flex gap-3" onSubmit={handleSendMessage}>
                    <input
                      value={messageDraft}
                      onChange={(event) => setMessageDraft(event.target.value)}
                      placeholder={`Message ${selectedMatch.candidate.name}`}
                      className="flex-1 rounded-2xl border border-white/10 bg-ink-900/70 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                    />
                    <button
                      type="submit"
                      className="rounded-2xl bg-teal-400 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-teal-300"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </section>
            </>
          ) : (
            <section className="rounded-[30px] border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">No match selected</p>
              <h2 className="mt-4 font-display text-4xl text-white">Add more complementary skills</h2>
              <p className="mt-4 max-w-2xl text-slate-300">
                The engine looks for mutual exchanges, not one-way requests. If you want more results, make sure each
                user has both offered skills and wanted skills that overlap with another person.
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
