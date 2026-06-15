import { useState } from "react";

const ProfilePage = ({ user, onUpdateUser }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [birthday, setBirthday] = useState(user?.birthday || "");
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!firstName || !lastName) { setError("First and last name are required."); return; }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-role": user.role },
        body: JSON.stringify({ firstName, lastName, birthday, avatar }),
      });
      const data = await res.json();
      if (res.ok) {
        onUpdateUser({ ...user, firstName, lastName, birthday, avatar });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(data.message || "Failed to save.");
      }
    } catch (err) {
      onUpdateUser({ ...user, firstName, lastName, birthday, avatar });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const initials = firstName
    ? `${firstName[0]}${lastName?.[0] || ""}`.toUpperCase()
    : user?.email?.slice(0, 2)?.toUpperCase() || "T";

  const age = birthday
    ? Math.floor((new Date() - new Date(birthday)) / (365.25 * 24 * 60 * 60 * 1000))
    : null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">My Profile</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your account information</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Header banner */}
        <div className="h-28 bg-gradient-to-r from-brand-blue to-blue-400 relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          />
        </div>

        {/* Avatar + info */}
        <div className="px-8 pb-8">
          <div className="flex items-end gap-5 -mt-12 mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-brand-blue to-blue-400 flex items-center justify-center">
                {avatar ? (
                  <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-black text-2xl">{initials}</span>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-blue rounded-xl flex items-center justify-center cursor-pointer shadow-md hover:bg-blue-700 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
            </div>
            <div className="mb-2">
              <h2 className="text-xl font-black text-gray-900">
                {firstName || lastName ? `${firstName} ${lastName}`.trim() : user?.email?.split("@")[0]}
              </h2>
              <p className="text-sm text-gray-400">{user?.email}</p>
              {age && <p className="text-xs text-gray-400 mt-0.5">{age} years old</p>}
            </div>
            <div className="ml-auto mb-2">
              <span className="text-xs font-bold text-brand-blue bg-brand-blue/10 px-3 py-1.5 rounded-full uppercase tracking-wide">
                Teacher
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email address</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Birthday</label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {saved && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Profile saved successfully
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-brand-blue text-white font-bold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 text-sm shadow-sm"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
