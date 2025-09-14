type HamburgerProps = {
  size?: number;
  gap?: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Hamburger = ({
  size = 24,
  gap = 6,
  open,
  setOpen,
}: HamburgerProps) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="flex flex-col justify-center items-center focus:outline-none"
      style={{ width: size, height: size, gap: `${gap}px` }}
    >
      {/* Top bar */}
      <span
        className="block h-[2px] w-full bg-black rounded transition-transform duration-200"
        style={{
          transform: open
            ? `rotate(45deg) translate(4px, 6px)`
            : "none",
        }}
      />
      {/* Middle bar */}
      <span
        className="block h-[2px] w-full bg-black rounded transition-opacity duration-200"
        style={{
          opacity: open ? 0 : 1,
        }}
      />
      {/* Bottom bar */}
      <span
        className="block h-[2px] w-full bg-black rounded transition-transform duration-200"
        style={{
          transform: open
            ? `rotate(-45deg) translate(4px, -6px)`
            : "none",
        }}
      />
    </button>
  );
};

export default Hamburger;
