import { useState } from "react";
import StudentFrame from "../../components/student/shared/StudentFrame";
import StudentPageHeader from "../../components/student/shared/StudentPageHeader";

const BODY_COLORS = [
  { id: "orange", name: "Clownfish",  c1: "#FF8C42", c2: "#FFD4A0", cost: 0   },
  { id: "blue",   name: "Blue Tang",  c1: "#3498db", c2: "#AED6F1", cost: 0   },
  { id: "pink",   name: "Coral Pink", c1: "#DD6584", c2: "#F9C8D6", cost: 50  },
  { id: "gold",   name: "Goldfish",   c1: "#f1c40f", c2: "#FEF3C7", cost: 80  },
  { id: "green",  name: "Sea Green",  c1: "#689931", c2: "#C6E6A0", cost: 100 },
  { id: "purple", name: "Amethyst",   c1: "#9b59b6", c2: "#D7BDE2", cost: 150 },
  { id: "teal",   name: "Deep Teal",  c1: "#1abc9c", c2: "#A3E4D7", cost: 200 },
  { id: "red",    name: "Fire Coral", c1: "#e74c3c", c2: "#F5B7B1", cost: 300 },
];

const HATS = [
  { id: null,     name: "None",      cost: 0,   emoji: "—"  },
  { id: "crown",  name: "Crown",     cost: 100, emoji: "👑" },
  { id: "tophat", name: "Top Hat",   cost: 150, emoji: "🎩" },
  { id: "cap",    name: "Cap",       cost: 80,  emoji: "🧢" },
  { id: "party",  name: "Party Hat", cost: 60,  emoji: "🎉" },
];

const GLASSES = [
  { id: null,          name: "None",         cost: 0,   emoji: "—"  },
  { id: "sunglasses",  name: "Sunglasses",   cost: 80,  emoji: "😎" },
  { id: "nerd",        name: "Nerd Glasses", cost: 60,  emoji: "🤓" },
  { id: "monocle",     name: "Monocle",      cost: 120, emoji: "🧐" },
];

const TABS = [
  { id: "colors",  label: "Colors",  icon: "🎨" },
  { id: "hats",    label: "Hats",    icon: "🎩" },
  { id: "glasses", label: "Glasses", icon: "😎" },
];

// ── Fish avatar SVG ────────────────────────────────────────────
const ProfileFish = ({ c1, c2, hat, glasses }) => (
  <div className="relative flex items-center justify-center" style={{ width: 240, height: 150 }}>
    {hat && (
      <div className="absolute text-5xl z-20" style={{ top: -8, left: "50%", transform: "translateX(-60%)" }}>
        {HATS.find((h) => h.id === hat)?.emoji}
      </div>
    )}

    <svg width="240" height="130" viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pgBodyGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor={c2} />
          <stop offset="100%" stopColor={c1} />
        </radialGradient>
        <radialGradient id="pgEyeGrad" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#ddd" />
        </radialGradient>
      </defs>
      <polygon points="170,60 210,20 210,100" fill={c1} opacity="0.85" />
      <polygon points="175,60 205,30 205,90"  fill={c2} opacity="0.5"  />
      <ellipse cx="100" cy="62" rx="85" ry="46" fill="url(#pgBodyGrad)" />
      <ellipse cx="90"  cy="75" rx="55" ry="22" fill={c2} opacity="0.3" />
      <path d="M 60 20 Q 90 4 120 18 L 110 36 Q 85 28 65 36 Z" fill={c1} opacity="0.9" />
      <ellipse cx="85" cy="62" rx="8" ry="40" fill="rgba(255,255,255,0.18)" />
      <circle cx="38" cy="52" r="14" fill="url(#pgEyeGrad)" />
      <circle cx="36" cy="51" r="8"  fill="#1a1a2e" />
      <circle cx="34" cy="49" r="3"  fill="#fff" />
      <path d="M 22 65 Q 30 72 38 65" stroke={c1} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="100" cy="55" rx="18" ry="12" fill="none" stroke={c2} strokeWidth="1.5" opacity="0.5" />
      <ellipse cx="130" cy="65" rx="15" ry="10" fill="none" stroke={c2} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="70"  cy="68" rx="15" ry="10" fill="none" stroke={c2} strokeWidth="1.5" opacity="0.4" />
      <path d="M 80 106 Q 100 115 120 106 L 115 90 Q 100 98 85 90 Z" fill={c1} opacity="0.85" />
    </svg>

    {glasses && (
      <div className="absolute text-3xl z-20" style={{ top: 30, left: "10%", transform: "scaleX(1.2)" }}>
        {GLASSES.find((g) => g.id === glasses)?.emoji}
      </div>
    )}
  </div>
);

// ── Reusable shop item row ─────────────────────────────────────
const ShopItem = ({ item, isOwned, isEquipped, accentColor, onAction, children }) => (
  <div
    onClick={onAction}
    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5"
    style={{
      background: isEquipped ? `${accentColor}18` : "rgba(8,16,32,0.6)",
      border: `1.5px solid ${isEquipped ? `${accentColor}55` : "rgba(255,255,255,0.07)"}`,
    }}
  >
    {children}
    <div className="flex-1 min-w-0">
      <p className="text-white text-xs font-bold truncate">{item.name}</p>
      {item.cost === 0
        ? <p className="text-green-400/70 text-[10px] font-bold">Free</p>
        : isOwned
          ? <p className="text-green-400/70 text-[10px] font-bold">Owned</p>
          : <p className="text-yellow-300/80 text-[10px] font-bold">⭐ {item.cost}</p>
      }
    </div>
    {isEquipped && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: accentColor }} />}
  </div>
);

// ── Main page ──────────────────────────────────────────────────
const StudentProfilePage = ({ user, onUpdateUser }) => {
  const [bodyColor,  setBodyColor]  = useState(user?.avatar_config?.bodyColor  || "orange");
  const [hat,        setHat]        = useState(user?.avatar_config?.hat        || null);
  const [glasses,    setGlasses]    = useState(user?.avatar_config?.glasses    || null);
  const [ownedItems, setOwnedItems] = useState(user?.avatar_config?.ownedItems || ["orange", "blue"]);
  const [stars,      setStars]      = useState(user?.stars || 0);
  const [activeTab,  setActiveTab]  = useState("colors");
  const [saveMsg,    setSaveMsg]    = useState(null);

  const currentBody = BODY_COLORS.find((b) => b.id === bodyColor) || BODY_COLORS[0];

  const isOwned = (itemId) => itemId === null || ownedItems.includes(itemId);

  const handleEquip = (category, itemId) => {
    if (category === "colors")  setBodyColor(itemId);
    if (category === "hats")    setHat(itemId);
    if (category === "glasses") setGlasses(itemId);
  };

  const handleBuy = (category, item) => {
    if (isOwned(item.id)) { handleEquip(category, item.id); return; }
    if (stars < item.cost) { alert("Not enough stars!"); return; }
    const newOwned = [...ownedItems, item.id];
    const newStars = stars - item.cost;
    setOwnedItems(newOwned);
    setStars(newStars);
    handleEquip(category, item.id);
    if (onUpdateUser && user) {
      onUpdateUser({ ...user, stars: newStars, avatar_config: { ...user.avatar_config, ownedItems: newOwned } });
    }
  };

  const handleSave = async () => {
    const config = { bodyColor, hat, glasses, ownedItems };
    if (onUpdateUser && user) {
      onUpdateUser({ ...user, stars, avatar_config: config });
    }
    setSaveMsg("Saved!");
    setTimeout(() => setSaveMsg(null), 2000);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-ocean-dark">
      <StudentFrame tint="pink" />

      <div className="relative z-20">
        <StudentPageHeader
          title="My Profile"
          subtitle="Customization Bay"
          backTo="/home"
          stars={stars}
          accentColor="#FC8181"
        />

        <div className="px-10 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">

            {/* LEFT — Avatar preview + info */}
            <div className="flex flex-col gap-5">
              <div className="avatar-preview flex flex-col items-center py-8 rounded-2xl">
                <ProfileFish c1={currentBody.c1} c2={currentBody.c2} hat={hat} glasses={glasses} />
                <p className="text-white/40 text-xs tracking-[0.3em] uppercase mt-4 font-bold">{currentBody.name}</p>
              </div>

              <div className="glass-panel-dark rounded-2xl px-5 py-4 flex flex-col gap-3">
                <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-bold mb-1">Explorer Info</p>
                {[
                  { label: "Name",  value: user?.firstName || user?.email?.split("@")[0] || "Explorer" },
                  { label: "Grade", value: user?.grade || "—" },
                  { label: "Email", value: user?.email || "—" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-white/35 text-xs tracking-wider uppercase">{item.label}</span>
                    <span className="text-white/70 text-sm font-bold">{item.value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSave}
                className="w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-1 save-btn"
              >
                {saveMsg || "Save Avatar"}
              </button>
            </div>

            {/* RIGHT — Shop */}
            <div className="flex flex-col gap-4">
              <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-bold">Customize & Shop</p>

              <div className="flex gap-2">
                {TABS.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                    style={{
                      background: activeTab === tab.id ? "rgba(221,101,132,0.2)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${activeTab === tab.id ? "rgba(221,101,132,0.5)" : "rgba(255,255,255,0.08)"}`,
                      color: activeTab === tab.id ? "#FC8181" : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === "colors" && (
                <div className="grid grid-cols-2 gap-3">
                  {BODY_COLORS.map((color, index) => (
                    <ShopItem
                      key={index}
                      item={color}
                      isOwned={isOwned(color.id)}
                      isEquipped={bodyColor === color.id}
                      accentColor={color.c1}
                      onAction={() => handleBuy("colors", color)}
                    >
                      <div
                        className="w-9 h-9 rounded-full flex-shrink-0"
                        style={{
                          background: `radial-gradient(circle at 35% 35%, ${color.c2}, ${color.c1})`,
                          boxShadow: bodyColor === color.id ? `0 0 12px ${color.c1}88` : "none",
                        }}
                      />
                    </ShopItem>
                  ))}
                </div>
              )}

              {activeTab === "hats" && (
                <div className="grid grid-cols-2 gap-3">
                  {HATS.map((item, index) => (
                    <ShopItem
                      key={index}
                      item={item}
                      isOwned={isOwned(item.id)}
                      isEquipped={hat === item.id}
                      accentColor="#FBD25A"
                      onAction={() => item.id === null ? handleEquip("hats", null) : handleBuy("hats", item)}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                    </ShopItem>
                  ))}
                </div>
              )}

              {activeTab === "glasses" && (
                <div className="grid grid-cols-2 gap-3">
                  {GLASSES.map((item, index) => (
                    <ShopItem
                      key={index}
                      item={item}
                      isOwned={isOwned(item.id)}
                      isEquipped={glasses === item.id}
                      accentColor="#63B3ED"
                      onAction={() => item.id === null ? handleEquip("glasses", null) : handleBuy("glasses", item)}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                    </ShopItem>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
