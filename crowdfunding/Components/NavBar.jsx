import React, { useState, useContext, useRef } from "react";
import Link from "next/link";

// INTERNAL IMPORT
import { CrowdFundingContext } from "../Context/CrowdFunding";
import { Logo, Menu } from "../Components/index";

const NavBar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const menuList = ["White Paper", "Explore", "Activity", "Insights"];
  const menuList = [
    { name: "Explore", link: "/" },
    { name: "White Paper", link: "/whitepaper" },
    { name: "Activity", link: "/activity" },
    { name: "Insights", link: "/members" },
  ];

  const [btnHovered, setBtnHovered] = useState(false);
  const [mobileBtnHovered, setMobileBtnHovered] = useState(false);

  const btnStyle = {
    backgroundColor: btnHovered ? "#6B6A67" : "#888780",
    color: "#F1EFE8",
    transform: btnHovered ? "translateY(-1px)" : "translateY(0)",
    boxShadow: btnHovered ? "0 6px 16px rgba(0,0,0,0.35)" : "0 2px 6px rgba(0,0,0,0.2)",
    transition: "background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
  };

  const mobileBtnStyle = {
    backgroundColor: mobileBtnHovered ? "#6B6A67" : "#888780",
    color: "#F1EFE8",
    transform: mobileBtnHovered ? "translateY(-1px)" : "translateY(0)",
    boxShadow: mobileBtnHovered ? "0 6px 16px rgba(0,0,0,0.35)" : "0 2px 6px rgba(0,0,0,0.2)",
    transition: "background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
    
  };

  return (
    <div style={{ backgroundColor: "#2C2C2A" }} className="backgroundMain">
      <div className="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              aria-label="Company"
              title="Company"
              className="inline-flex items-center mr-8"
            >
              <Logo color="text-[#F1EFE8]" />
               <span
                style={{ fontFamily: "'Georgia', serif" }}
                className="ml-2 flex items-baseline"
              >
                <span
                  style={{ color: "#F1EFE8", fontSize: "20px", fontWeight: 700, letterSpacing: "0.06em" }}
                >
                  Veri
                </span>
                <span
                  style={{ color: "#888780", fontSize: "20px", fontWeight: 400, letterSpacing: "0.06em" }}
                >
                  Fund
                </span>
              </span>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center space-x-8">
              {menuList.map((el, i) => (
                <li key={i}>
                  <Link href={el.link}>
                    <span
                      style={{ color: "#B4B2A9" }}
                      className="font-medium tracking-wide transition-colors duration-200 hover:opacity-70 cursor-pointer"
                    >
                      {el.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Wallet Button */}
          {!currentAccount && (
            <ul className="hidden lg:flex items-center space-x-8">
              <li>
                <button
                  onClick={connectWallet}
                  style={btnStyle}
                  onMouseEnter={() => setBtnHovered(true)}
                  onMouseLeave={() => setBtnHovered(false)}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide rounded"
                  aria-label="Connect Wallet"
                >
                  Connect Wallet
                </button>
              </li>
            </ul>
          )}

          {/* Mobile Menu Button */}
          <div className="lg:hidden z-40">
            <button
              aria-label="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu />
            </button>u

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full">
                <div
                  style={{ backgroundColor: "#2C2C2A", borderColor: "#888780" }}
                  className="p-5 border rounded shadow-sm"
                >

                  <div className="flex items-center justify-between mb-4">
                    <a
                      href="/"
                      className="inline-flex items-center"
                    >
                      <Logo color="text-[#F1EFE8]" />
                      <span
                        style={{ color: "#F1EFE8" }}
                        className="ml-2 text-xl font-bold tracking-wide uppercase"
                      >
                        Company
                      </span>
                    </a>

                    <button
                      aria-label="Close Menu"
                      style={{ color: "#B4B2A9" }}
                      className="p-2 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ✕
                    </button>
                  </div>

                  <nav>
                    <ul className="space-y-4">
                      {menuList.map((el, i) => (
                        <li key={i}>
                          <Link href={el.link}>
                            <span
                              style={{ color: "#B4B2A9" }}
                              className="font-medium tracking-wide hover:opacity-70 cursor-pointer"
                            >
                              {el.name}
                            </span>
                          </Link>
                        </li>
                      ))}

                      <li>
                        <button
                          onClick={connectWallet}
                          style={{
                            backgroundColor: "#888780",
                            color: "#F1EFE8",
                          }}
                          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide rounded shadow-md hover:opacity-80"
                        >
                          Connect Wallet
                        </button>
                      </li>
                    </ul>
                  </nav>

                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;