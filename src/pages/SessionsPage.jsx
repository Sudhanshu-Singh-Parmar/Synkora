import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const STORAGE_KEYS = {
  meetings: "swapmantra_meetings",
  chats: "swapmantra_chats",
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

function normalizeSkill(skill) {
  return skill.trim().toLowerCase();
}

function normalizeCity(city) {
  return city.trim().toLowerCase().replace(/\s+/g, " ");
}

function getSharedSkills(sourceSkills, targetSkills) {
  const targetSet = new Set(targetSkills.map(normalizeSkill));
  return sourceSkills.filter((skill) => targetSet.has(normalizeSkill(skill)));
}

function createMatch(user, candidate, index) {
  const candidateCanTeach = getSharedSkills(user.skillsWanted, candidate.skillsOffered);
  const userCanTeach = getSharedSkills(candidate.skillsWanted, user.skillsOffered);
  const sameCity = Boolean(user.city && candidate.city && normalizeCity(user.city) === normalizeCity(candidate.city));
  const localBonus = sameCity ? 4 : 0;
  const score = candidateCanTeach.length * 3 + userCanTeach.length * 3 + localBonus;

  if (!candidateCanTeach.length || !userCanTeach.length) {
    return null;
  }

  return {
    id: `${user.id}-${candidate.id}`,
    candidate,
    score,
    sameCity,
    candidateCanTeach,
    userCanTeach,
    compatibility: Math.min(98, 70 + score * 4),
  };
}

function formatSkillList(skills) {
  return skills.join(", ");
}

export default function SessionsPage() {
  const { currentUser, isAuthenticated, users } = useAppContext();
  const meetings = readStorage(STORAGE_KEYS.meetings, []);
  const chats = readStorage(STORAGE_KEYS.chats, {});

  const matchResults = useMemo(() => {
    if (!isAuthenticated || !currentUser) {
      return [];
    }

    const matches = users
      .filter((candidate) => candidate.id !== currentUser.id)
      .map((candidate, index) => createMatch(currentUser, candidate, index))
      .filter(Boolean)
      .sort((left, right) => {
        if (left.sameCity !== right.sameCity) {
          return Number(right.sameCity) - Number(left.sameCity);
        }

        return right.score - left.score;
      });

    const localMatches = matches.filter((match) => match.sameCity);
    return localMatches.length ? localMatches : matches;
  }, [currentUser, isAuthenticated, users]);

  const userMeetings = useMemo(() => {
    if (!currentUser) {
      return [];
    }

    return meetings
      .filter((meeting) => meeting.hostUserId === currentUser.id || meeting.guestUserId === currentUser.id)
      .sort((left, right) => `${left.date} ${left.time}`.localeCompare(`${right.date} ${right.time}`));
  }, [currentUser, meetings]);

  const pendingMatches = useMemo(
    () =>
      matchResults.filter(
        (match) =>
          !userMeetings.some(
            (meeting) =>
              (meeting.hostUserId === currentUser?.id && meeting.guestUserId === match.candidate.id) ||
              (meeting.hostUserId === match.candidate.id && meeting.guestUserId === currentUser?.id)
          )
      ),
    [currentUser, matchResults, userMeetings]
  );

  const activeChats = useMemo(
    () =>
      matchResults.filter((match) => {
        const thread = chats[match.id] || [];
        return thread.length > 0;
      }),
    [chats, matchResults]
  );

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-gold-300">Sessions</p>
          <h1 className="mt-4 font-display text-4xl text-white">Your sessions appear after you log in and get matched</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Login first, find a reciprocal skill swap, and then this page will show booked sessions, pending matches,
            and active chat threads.
          </p>
          <Link
            to="/auth?auth=login"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-950 transition hover:scale-[1.01]"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (!matchResults.length) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-gold-300">Sessions</p>
          <h1 className="mt-4 font-display text-4xl text-white">No sessions yet because no reciprocal match is available</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Sessions only unlock when someone can teach what you want to learn and also wants a skill you can teach in
            return.
          </p>
          <Link
            to="/discover"
            className="mt-8 inline-flex rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-teal-300"
          >
            Find Matches
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-gold-300">Sessions</p>
        <h1 className="mt-4 font-display text-4xl text-white">Your sessions and match follow-ups</h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          This route now shows session activity only for users who have real reciprocal matches.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <h2 className="font-display text-2xl text-white">Booked sessions</h2>
          <div className="mt-6 space-y-3">
            {userMeetings.length ? (
              userMeetings.map((meeting) => {
                const partnerId = meeting.hostUserId === currentUser?.id ? meeting.guestUserId : meeting.hostUserId;
                const partner = users.find((user) => user.id === partnerId)?.name || "Match";

                return (
                  <div key={meeting.id} className="rounded-2xl border border-white/10 bg-ink-900/70 p-4 text-slate-300">
                    <p className="font-medium text-white">{partner}</p>
                    <p className="mt-2 text-sm">{meeting.date} at {meeting.time}</p>
                    <p className="mt-1 text-sm">{meeting.mode} • {meeting.location}</p>
                    <p className="mt-1 text-sm">Focus: {meeting.focus}</p>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-white/10 bg-ink-900/70 p-4 text-slate-300">
                No session booked yet. Go to discover and schedule your first exchange.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <h2 className="font-display text-2xl text-white">Matched users</h2>
          <div className="mt-6 space-y-3">
            {pendingMatches.length ? (
              pendingMatches.map((match) => (
                <div key={match.id} className="rounded-2xl border border-white/10 bg-ink-900/70 p-4 text-slate-300">
                  <p className="font-medium text-white">{match.candidate.name}</p>
                  <p className="mt-2 text-sm">Learn: {formatSkillList(match.candidateCanTeach)}</p>
                  <p className="mt-1 text-sm">Teach: {formatSkillList(match.userCanTeach)}</p>
                  <p className="mt-1 text-sm">{match.sameCity ? `${match.candidate.city} local match` : "Remote-compatible match"}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-ink-900/70 p-4 text-slate-300">
                All current matches already have a booked session.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <h2 className="font-display text-2xl text-white">Active chats</h2>
          <div className="mt-6 space-y-3">
            {activeChats.length ? (
              activeChats.map((match) => {
                const thread = chats[match.id] || [];
                const latestMessage = thread[thread.length - 1];

                return (
                  <div key={match.id} className="rounded-2xl border border-white/10 bg-ink-900/70 p-4 text-slate-300">
                    <p className="font-medium text-white">{match.candidate.name}</p>
                    <p className="mt-2 text-sm">{latestMessage?.text || "Conversation started"}</p>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-white/10 bg-ink-900/70 p-4 text-slate-300">
                No active chats yet. Start a conversation from the discover page after selecting a match.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
