import { useState } from "react";
import "./rippleButton.css";
interface RippleButtonProps {
  children: React.ReactNode;
  modalOpen?: boolean;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>; 
}
export default function RippleButton({children, modalOpen, setModalOpen}:RippleButtonProps) {
  const [ripples, setRipples] = useState<
    { x: number; y: number; size: number; id: number }[]
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // ripple size calculation (big enough to cover button fully)
    const size = Math.max(rect.width, rect.height) * 2;

    const newRipple = { x, y, size, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
    // if Modal is Here
    setModalOpen?.(!modalOpen);
  };

  return (
    <button
      onClick={handleClick}
      className="
        relative w-full flex items-center justify-center gap-2 text-base 
        rounded py-3 bg-white overflow-hidden cursor-pointer 
        transition transform active:scale-95
      "
    >
      {/* Ripple Elements */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple bg-amber-600"
          style={{
            top: r.y - r.size / 2,
            left: r.x - r.size / 2,
            width: r.size,
            height: r.size,
          }}
        />
      ))}

      {/* Text */}
      <span className="flex items-center gap-1 text-amber-600 font-semibold text-md uppercase">
        {children}
      </span>
    </button>
  );
}
