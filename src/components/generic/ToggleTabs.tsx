import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface ToggleTabsProps {
  options: { label: string; path: string }[];
}

const ToggleTabs: React.FC<ToggleTabsProps> = ({ options }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState<string>(options[0].path);

  // Set default selection based on URL
  useEffect(() => {
    const foundOption = options.find((opt) => opt.path === location.pathname);
    if (foundOption) setSelected(foundOption.path);
  }, [location.pathname, options]);

  const handleChange = (path: string) => {
    setSelected(path);
    // navigate(path);
  };

  return (
    <div className="relative w-64 bg-lavender font-body rounded-full flex p-1">
      {/* Animated background */}
      <motion.div
        className="absolute top-1 bottom-1 left-1 righ-1 w-[48.5%] bg-main rounded-full"
        initial={false}
        animate={{ x: selected === options[0].path ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
      
      {/* Toggle Buttons */}
      {options.map(({ label, path }) => (
        <label
          key={path}
          className={`relative flex-1 text-center py-2 text-lg font-medium cursor-pointer rounded-lg transition-colors duration-200 ${
            selected === path ? "text-light" : "text-lavender-300"
          }`}
        >
          <input
            type="radio"
            name="toggle"
            value={path}
            checked={selected === path}
            onChange={() => handleChange(path)}
            className="hidden"
          />
          {label}
        </label>
      ))}
    </div>
  );
};

export default ToggleTabs;
