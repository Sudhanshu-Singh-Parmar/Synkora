import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const initialRegisterState = {
  name: "",
  email: "",
  password: "",
  city: "",
  skillsOffered: [],
  skillsWanted: [],
};

const initialLoginState = {
  email: "",
  password: "",
};

function SkillInput({ label, skills, onAddSkill, onRemoveSkill, placeholder, tint }) {
  const [value, setValue] = useState("");

  const addSkill = () => {
    const cleaned = value.trim();

    if (!cleaned) {
      return;
    }

    onAddSkill(cleaned);
    setValue("");
  };

  return (
    <div>
      <label className="text-sm font-medium text-slate-200">{label}</label>
      <div className="mt-3 flex gap-2">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addSkill();
            }
          }}
          placeholder={placeholder}
          className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-teal-300/40"
        />
        <button
          type="button"
          onClick={addSkill}
          className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/15"
        >
          Add
        </button>
      </div>
      <div className="mt-3 flex min-h-10 flex-wrap gap-2">
        {skills.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => onRemoveSkill(skill)}
            className={`rounded-full px-3 py-1.5 text-sm ${tint}`}
          >
            {skill} x
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AuthPanel() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    authMode,
    setAuthMode,
    authError,
    clearAuthError,
    registerUser,
    loginUser,
    isAuthenticated,
    currentUser,
    logout,
  } = useAppContext();

  const [registerForm, setRegisterForm] = useState(initialRegisterState);
  const [loginForm, setLoginForm] = useState(initialLoginState);
  const requestedMode = searchParams.get("auth");
  const panelTargetId = "auth-panel";

  useEffect(() => {
    if (requestedMode === "login" || requestedMode === "register") {
      setAuthMode(requestedMode);
      clearAuthError();
    }
  }, [clearAuthError, requestedMode, setAuthMode]);

  useEffect(() => {
    const panel = document.getElementById(panelTargetId);

    if (!panel) {
      return;
    }

    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [authMode]);

  const updateRegisterField = (field, value) => {
    setRegisterForm((current) => ({ ...current, [field]: value }));
  };

  const addRegisterSkill = (field, skill) => {
    setRegisterForm((current) => {
      if (current[field].some((item) => item.toLowerCase() === skill.toLowerCase())) {
        return current;
      }

      return {
        ...current,
        [field]: [...current[field], skill],
      };
    });
  };

  const removeRegisterSkill = (field, skill) => {
    setRegisterForm((current) => ({
      ...current,
      [field]: current[field].filter((item) => item !== skill),
    }));
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    clearAuthError();
    const registered = registerUser(registerForm);

    if (registered) {
      setRegisterForm(initialRegisterState);
      setLoginForm(initialLoginState);
      navigate("/discover", { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    clearAuthError();
    const loggedIn = loginUser(loginForm);

    if (loggedIn) {
      setLoginForm(initialLoginState);
      navigate("/discover", { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isAuthenticated) {
    return (
      <div id={panelTargetId} className="rounded-[28px] border border-teal-300/20 bg-ink-900/85 p-6 shadow-glow">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Logged in</p>
        <h3 className="mt-3 font-display text-3xl text-white">{currentUser.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Your profile is saved in local storage and Start Swapping is now active.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {currentUser.skillsOffered.map((skill) => (
            <span key={skill} className="rounded-full bg-teal-400/15 px-3 py-1.5 text-sm text-teal-100">
              {skill}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={logout}
          className="mt-6 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/15"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div
      id={panelTargetId}
      className="min-h-[720px] rounded-[28px] border border-white/10 bg-ink-900/85 p-6 shadow-glow transition-all duration-300"
    >
      <div className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1">
        {["register", "login"].map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => {
              setSearchParams({ auth: mode });
              setAuthMode(mode);
              clearAuthError();
            }}
            className={`flex-1 rounded-full px-4 py-3 text-sm font-medium capitalize transition ${
              authMode === mode ? "bg-white text-ink-950" : "text-slate-300 hover:text-white"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {authMode === "register" ? (
        <form className="mt-6 space-y-4" onSubmit={handleRegisterSubmit}>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Create account</p>
            <h3 className="mt-3 font-display text-3xl text-white">Register and add your skills</h3>
          </div>
          <input
            value={registerForm.name}
            onChange={(event) => updateRegisterField("name", event.target.value)}
            placeholder="Full name"
            autoComplete="name"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-300/40"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={registerForm.email}
              onChange={(event) => updateRegisterField("email", event.target.value)}
              placeholder="Email"
              type="email"
              autoComplete="email"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-300/40"
            />
            <input
              value={registerForm.city}
              onChange={(event) => updateRegisterField("city", event.target.value)}
              placeholder="City"
              autoComplete="address-level2"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-300/40"
            />
          </div>
          <input
            value={registerForm.password}
            onChange={(event) => updateRegisterField("password", event.target.value)}
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-300/40"
          />
          <SkillInput
            label="Skills you are proficient in"
            skills={registerForm.skillsOffered}
            onAddSkill={(skill) => addRegisterSkill("skillsOffered", skill)}
            onRemoveSkill={(skill) => removeRegisterSkill("skillsOffered", skill)}
            placeholder="Example: UI Design"
            tint="bg-teal-400/15 text-teal-100"
          />
          <SkillInput
            label="Skills you want to learn"
            skills={registerForm.skillsWanted}
            onAddSkill={(skill) => addRegisterSkill("skillsWanted", skill)}
            onRemoveSkill={(skill) => removeRegisterSkill("skillsWanted", skill)}
            placeholder="Example: Guitar"
            tint="bg-coral-400/15 text-coral-200"
          />
          {authError ? <p className="text-sm text-rose-300">{authError}</p> : null}
          <button
            type="submit"
            className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink-950 transition hover:scale-[1.01]"
          >
            Create account
          </button>
        </form>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={handleLoginSubmit}>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-coral-300">Welcome back</p>
            <h3 className="mt-3 font-display text-3xl text-white">Login to continue</h3>
          </div>
          <input
            value={loginForm.email}
            onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="Email"
            type="email"
            autoComplete="email"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-300/40"
          />
          <input
            value={loginForm.password}
            onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-300/40"
          />
          {authError ? <p className="text-sm text-rose-300">{authError}</p> : null}
          <button
            type="submit"
            className="w-full rounded-full bg-teal-400 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-teal-300"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
}
