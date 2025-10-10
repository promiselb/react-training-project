import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Left side */}
        <p className="text-sm text-center sm:text-left">
          <strong className="text-white font-semibold">GearRent Dashboard</strong> — A React Training Project by{" "}
          <a
            href="https://github.com/promiselb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            promiselb
          </a>.
        </p>

        {/* Right side */}
        <p className="text-sm text-center sm:text-right text-gray-400">
          Licensed under{" "}
          <a
            href="https://github.com/promiselb/react-training-project/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            MIT
          </a>{" "}
          • Lebanon, Beirut © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
