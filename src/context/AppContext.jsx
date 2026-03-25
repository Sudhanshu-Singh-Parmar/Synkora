import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);

const STORAGE_KEYS = {
  users: "knit_users",
  session: "knit_session",
};

const featuredSkills = [
  { name: "Python", learners: 128, color: "from-teal-400/20 to-cyan-400/20" },
  { name: "Guitar", learners: 84, color: "from-coral-400/20 to-orange-300/20" },
  { name: "Spoken English", learners: 97, color: "from-gold-400/20 to-yellow-200/10" },
  { name: "UI Design", learners: 61, color: "from-violet-400/20 to-fuchsia-300/20" },
];

const defaultProfile = {
  id: "preview-user",
  name: "Your Profile",
  email: "user@knit.demo",
  password: "",
  city: "Your City",
  wallet: 0,
  skillsOffered: ["Add your skills"],
  skillsWanted: ["Choose what to learn"],
};

const nearbyMembers = [
  {
    name: "Aarav",
    distance: "1.2 km",
    teaches: "JavaScript",
    wants: "Public Speaking",
    rating: 4.9,
  },
  {
    name: "Mira",
    distance: "2.8 km",
    teaches: "Guitar",
    wants: "Figma",
    rating: 4.8,
  },
  {
    name: "Kabir",
    distance: "3.4 km",
    teaches: "Photography",
    wants: "Python",
    rating: 4.7,
  },
];

const platformStats = [
  { label: "Active skill swaps", value: "4.8k+" },
  { label: "Credits exchanged", value: "12.4k" },
  { label: "Hyperlocal circles", value: "96" },
];

const starterUsers = [
  {
    id: "starter-aarav",
    name: "Aarav Sharma",
    email: "aarav@knit.local",
    password: "pass1234",
    city: "Delhi",
    wallet: 10,
    skillsOffered: ["Coding", "JavaScript", "React"],
    skillsWanted: ["Guitar", "Music Theory"],
  },
  {
    id: "starter-mira",
    name: "Mira Khanna",
    email: "mira@knit.local",
    password: "pass1234",
    city: "Delhi",
    wallet: 8,
    skillsOffered: ["Guitar", "Music Theory", "Live Performance"],
    skillsWanted: ["Coding", "React"],
  },
  {
    id: "starter-kabir",
    name: "Kabir Singh",
    email: "kabir@knit.local",
    password: "pass1234",
    city: "Noida",
    wallet: 9,
    skillsOffered: ["Photography", "Video Editing"],
    skillsWanted: ["UI Design", "Coding"],
  },
  {
    id: "starter-neha",
    name: "Neha Verma",
    email: "neha@knit.local",
    password: "pass1234",
    city: "Delhi",
    wallet: 7,
    skillsOffered: ["Spoken English", "Public Speaking"],
    skillsWanted: ["Guitar", "Branding"],
  },
];

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

function normalizeSkillList(skills) {
  const seen = new Set();

  return skills
    .map((skill) => skill.trim())
    .filter(Boolean)
    .filter((skill) => {
      const key = skill.toLowerCase();

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
}

export function AppProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const storedUsers = readStorage(STORAGE_KEYS.users, null);
    return storedUsers?.length ? storedUsers : starterUsers;
  });
  const [sessionUserId, setSessionUserId] = useState(() => readStorage(STORAGE_KEYS.session, null));
  const [authMode, setAuthMode] = useState("register");
  const [pendingVerification, setPendingVerification] = useState(null);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    writeStorage(STORAGE_KEYS.users, users);
  }, [users]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.session, sessionUserId);
  }, [sessionUserId]);

  const currentUser = users.find((user) => user.id === sessionUserId) || null;
  const profile = currentUser || defaultProfile;
  const wallet = currentUser?.wallet ?? defaultProfile.wallet;
  const isAuthenticated = Boolean(currentUser);

  const clearAuthError = () => setAuthError("");

  const startVerification = (payload) => {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setPendingVerification({
      ...payload,
      code,
      createdAt: Date.now(),
    });
    setAuthError("");
  };

  const registerUser = ({ name, email, password, city, skillsOffered, skillsWanted }) => {
    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const trimmedCity = city.trim();
    const normalizedOfferedSkills = normalizeSkillList(skillsOffered);
    const normalizedWantedSkills = normalizeSkillList(skillsWanted);

    if (!trimmedName) {
      setAuthError("Please enter your name.");
      return false;
    }

    if (!normalizedEmail) {
      setAuthError("Please enter your email.");
      return false;
    }

    if (!trimmedPassword) {
      setAuthError("Please enter a password.");
      return false;
    }

    if (trimmedPassword.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return false;
    }

    if (!trimmedCity) {
      setAuthError("Please enter your city.");
      return false;
    }

    if (!normalizedOfferedSkills.length) {
      setAuthError("Add at least one skill you can teach.");
      return false;
    }

    if (!normalizedWantedSkills.length) {
      setAuthError("Add at least one skill you want to learn.");
      return false;
    }

    if (users.some((user) => user.email === normalizedEmail)) {
      setAuthError("This email is already registered.");
      return false;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: trimmedName,
      email: normalizedEmail,
      password: trimmedPassword,
      city: trimmedCity,
      wallet: 6,
      skillsOffered: normalizedOfferedSkills,
      skillsWanted: normalizedWantedSkills,
    };

    startVerification({ type: "register", user: newUser, email: newUser.email });
    return true;
  };

  const loginUser = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!normalizedEmail) {
      setAuthError("Please enter your email.");
      return false;
    }

    if (!trimmedPassword) {
      setAuthError("Please enter your password.");
      return false;
    }

    const existingUser = users.find((user) => user.email === normalizedEmail && user.password === trimmedPassword);

    if (!existingUser) {
      setAuthError("Invalid email or password.");
      return false;
    }

    startVerification({ type: "login", userId: existingUser.id, email: existingUser.email });
    return true;
  };

  const verifyTwoFactorCode = (code) => {
    if (!pendingVerification) {
      setAuthError("No verification is pending right now.");
      return false;
    }

    if (pendingVerification.code !== code) {
      setAuthError("Verification code is incorrect.");
      return false;
    }

    if (pendingVerification.type === "register") {
      setUsers((currentUsers) => [...currentUsers, pendingVerification.user]);
      setSessionUserId(pendingVerification.user.id);
    }

    if (pendingVerification.type === "login") {
      setSessionUserId(pendingVerification.userId);
    }

    setPendingVerification(null);
    setAuthError("");
    return true;
  };

  const logout = () => {
    setSessionUserId(null);
    setPendingVerification(null);
    setAuthMode("login");
    setAuthError("");
  };

  const value = useMemo(
    () => ({
      featuredSkills,
      nearbyMembers,
      platformStats,
      users,
      profile,
      wallet,
      isAuthenticated,
      currentUser,
      authMode,
      setAuthMode,
      authError,
      clearAuthError,
      pendingVerification,
      registerUser,
      loginUser,
      verifyTwoFactorCode,
      logout,
    }),
    [authError, authMode, currentUser, isAuthenticated, pendingVerification, profile, users, wallet]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}
