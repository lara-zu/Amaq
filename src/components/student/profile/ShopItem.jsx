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

export default ShopItem;
