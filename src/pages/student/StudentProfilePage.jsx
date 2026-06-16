import { useState } from "react";
import StudentFrame from "../../components/student/shared/StudentFrame";
import StudentPageHeader from "../../components/student/shared/StudentPageHeader";
import FishAvatar, { HatPreview } from "../../components/student/profile/FishAvatar";
import ShopItem from "../../components/student/profile/ShopItem";
import API_URL from "../../api.js";

const BODY_COLORS = [
  { id: "orange", name: "Clownfish",  c1: "#FF8C42", c2: "#FFD4A0", cost: 0  },
  { id: "blue",   name: "Blue Tang",  c1: "#3498db", c2: "#AED6F1", cost: 0  },
  { id: "pink",   name: "Coral Pink", c1: "#DD6584", c2: "#F9C8D6", cost: 2  },
  { id: "gold",   name: "Goldfish",   c1: "#f1c40f", c2: "#FEF3C7", cost: 3  },
  { id: "green",  name: "Sea Green",  c1: "#689931", c2: "#C6E6A0", cost: 4  },
  { id: "purple", name: "Amethyst",   c1: "#9b59b6", c2: "#D7BDE2", cost: 5  },
  { id: "teal",   name: "Deep Teal",  c1: "#1abc9c", c2: "#A3E4D7", cost: 6  },
  { id: "red",    name: "Fire Coral", c1: "#e74c3c", c2: "#F5B7B1", cost: 8  },
];

const HATS = [
  { id: null,      name: "None",    cost: 0 },
  { id: "crown",   name: "Crown",   cost: 5 },
  { id: "tophat",  name: "Top Hat", cost: 6 },
  { id: "cap",     name: "Cap",     cost: 3 },
  { id: "pirate",  name: "Pirate",  cost: 7 },
  { id: "viking",  name: "Viking",  cost: 8 },
  { id: "wizard",  name: "Wizard",  cost: 9 },
];

const TABS = [
  { id: "colors", label: "Colors", icon: "🎨" },
  { id: "hats",   label: "Hats",   icon: "🎩" },
];

// ── Main page ──────────────────────────────────────────────────
const StudentProfilePage = ({ user, onUpdateUser }) => {
  const [bodyColor,  setBodyColor]  = useState(user?.avatar_config?.bodyColor  || "orange");
  const [hat,        setHat]        = useState(user?.avatar_config?.hat        || null);
  const [ownedItems, setOwnedItems] = useState(user?.avatar_config?.ownedItems || ["orange", "blue"]);
  const [stars,      setStars]      = useState(user?.stars || 0);
  const [activeTab,  setActiveTab]  = useState("colors");
  const [saveMsg,    setSaveMsg]    = useState(null);

  const currentBody = BODY_COLORS.find((b) => b.id === bodyColor) || BODY_COLORS[0];

  const isOwned = (itemId) => itemId === null || ownedItems.includes(itemId);

  const handleEquip = (category, itemId) => {
    if (category === "colors") setBodyColor(itemId);
    if (category === "hats")   setHat(itemId);
  };

  const handleBuy = async (category, item) => {
    if (isOwned(item.id)) { handleEquip(category, item.id); return; }
    if (stars < item.cost) { alert("Not enough stars!"); return; }
    try {
      const res = await fetch(`${API_URL}/api/profile/buy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, item_cost: item.cost }),
      });
      const updatedUser = await res.json();
      const newOwned = [...ownedItems, item.id];
      setOwnedItems(newOwned);
      setStars(updatedUser.stars);
      handleEquip(category, item.id);
      if (onUpdateUser) onUpdateUser({ ...updatedUser, avatar_config: { ...updatedUser.avatar_config, ownedItems: newOwned } });
    } catch (err) {
      console.log(err);
      alert("Failed to buy item.");
    }
  };

  const handleSave = async () => {
    const config = { bodyColor, hat, ownedItems };
    try {
      const res = await fetch(`${API_URL}/api/profile/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar_config: config }),
      });
      const updatedUser = await res.json();
      if (onUpdateUser) onUpdateUser({ ...updatedUser, stars });
    } catch (err) {
      console.log(err);
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
                <FishAvatar c1={currentBody.c1} c2={currentBody.c2} hat={hat} />
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
                      <div className="w-10 h-8 flex items-center justify-center flex-shrink-0">
                        <HatPreview hatId={item.id} />
                      </div>
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
