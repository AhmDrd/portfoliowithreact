import { useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import useMediaQuery from "../hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = ["Home", "Skills", "Projects", "Testimonials", "Contact"];
const ANCHOR_OFFSET = 96;

const Link = ({ page, selectedPage, setSelectedPage, onNavigate }) => {
  const lowerCasePage = page.toLowerCase();
  const isActive = selectedPage === lowerCasePage;

  return (
    <AnchorLink
      className={`group relative pb-1 font-opensans text-sm font-semibold tracking-[0.12em] uppercase transition duration-300 ${
        isActive ? "text-yellow" : "text-white/90 hover:text-white"
      }`}
      href={`#${lowerCasePage}`}
      offset={ANCHOR_OFFSET}
      onClick={() => {
        setSelectedPage(lowerCasePage);
        if (onNavigate) {
          onNavigate();
        }
      }}
    >
      {page}
      <span
        className={`absolute left-0 -bottom-[3px] h-[2px] bg-gradient-rainblue transition-all duration-300 ${
          isActive
            ? "w-full opacity-100"
            : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
        }`}
      />
    </AnchorLink>
  );
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (isDesktop) {
      setIsMenuToggled(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop && isMenuToggled) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDesktop, isMenuToggled]);

  return (
    <>
      <motion.nav
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 z-40 w-full border-b transition-all duration-500 ${
          isTopOfPage
            ? "border-transparent bg-transparent py-6"
            : "border-white/20 bg-red/90 py-4 shadow-[0_14px_40px_-16px_rgba(0,0,0,0.7)] backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex w-5/6 items-center justify-between">
          <motion.h4
            className="font-playfair text-3xl font-bold"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            JE
          </motion.h4>

          {/* DESKTOP NAV */}
          {isDesktop ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-12"
            >
              {NAV_LINKS.map((page) => (
                <Link
                  key={page}
                  page={page}
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                />
              ))}
            </motion.div>
          ) : (
            <motion.button
              className="rounded-full bg-red p-2 shadow-lg shadow-deep-blue/40"
              onClick={() => setIsMenuToggled(!isMenuToggled)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              transition={{ duration: 0.2 }}
              aria-label="Open navigation menu"
            >
              <img alt="menu-icon" src="../assets/menu-icon.svg" />
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* MOBILE MENU POPUP */}
      <AnimatePresence>
        {!isDesktop && isMenuToggled && (
          <>
            <motion.button
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-deep-blue/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMenuToggled(false)}
            />

            <motion.div
              className="fixed right-0 top-0 z-50 h-full w-[min(84vw,340px)] border-l border-white/20 bg-blue px-8 py-8 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-10 flex justify-end">
                <motion.button
                  onClick={() => setIsMenuToggled(false)}
                  whileHover={{ rotate: 90, scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  aria-label="Close navigation menu"
                >
                  <img alt="close-icon" src="../assets/close-icon.svg" />
                </motion.button>
              </div>

              <div className="flex flex-col gap-7 text-xl">
                {NAV_LINKS.map((page, index) => (
                  <motion.div
                    key={page}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ delay: 0.06 * index + 0.04, duration: 0.28 }}
                  >
                    <Link
                      page={page}
                      selectedPage={selectedPage}
                      setSelectedPage={setSelectedPage}
                      onNavigate={() => setIsMenuToggled(false)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
