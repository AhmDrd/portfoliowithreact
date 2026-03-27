import { useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import useMediaQuery from "../hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = ["Home", "Skills", "Projects", "Testimonials", "Contact"];
const ANCHOR_OFFSET = 96;
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

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
  const isCompact = !isTopOfPage;

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

  const navTransition = {
    y: { duration: 0.55, ease: EASE_OUT_EXPO },
    opacity: { duration: 0.38, ease: EASE_OUT_EXPO },
    default: { duration: 0.42, ease: EASE_OUT_EXPO },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -28, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          paddingTop: isCompact ? 14 : 24,
          paddingBottom: isCompact ? 14 : 24,
          backgroundColor: isCompact
            ? "rgba(1, 0, 38, 0.62)"
            : "rgba(1, 0, 38, 0)",
          borderColor: isCompact
            ? "rgba(255, 255, 255, 0.14)"
            : "rgba(255, 255, 255, 0)",
          boxShadow: isCompact
            ? "0 22px 54px -26px rgba(0, 0, 0, 0.72)"
            : "0 0 0 rgba(0, 0, 0, 0)",
        }}
        transition={navTransition}
        style={{
          backdropFilter: isCompact ? "blur(18px) saturate(145%)" : "blur(0px)",
          WebkitBackdropFilter: isCompact
            ? "blur(18px) saturate(145%)"
            : "blur(0px)",
        }}
        className="fixed top-0 z-40 w-full overflow-hidden border-b"
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: isCompact ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          style={{
            background:
              "linear-gradient(90deg, rgba(220,68,146,0.18) 0%, rgba(1,0,38,0.06) 30%, rgba(1,0,38,0.12) 100%)",
          }}
        />
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-rainblue"
          animate={{ opacity: isCompact ? 0.5 : 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
        />

        <motion.div
          animate={{ gap: isCompact ? 24 : 32 }}
          transition={{ duration: 0.42, ease: EASE_OUT_EXPO }}
          className="relative mx-auto flex w-5/6 items-center justify-between"
        >
          <motion.h4
            className="font-playfair text-3xl font-bold tracking-[0.08em]"
            whileHover={{ y: isCompact ? -3 : -2 }}
            animate={{
              scale: isCompact ? 0.9 : 1,
              y: isCompact ? -1 : 0,
            }}
            transition={{ duration: 0.42, ease: EASE_OUT_EXPO }}
          >
            JE
          </motion.h4>

          {/* DESKTOP NAV */}
          {isDesktop ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0, gap: isCompact ? "2.25rem" : "3rem" }}
              transition={{
                opacity: { duration: 0.4, delay: 0.1 },
                y: { duration: 0.4, delay: 0.1 },
                gap: { duration: 0.42, ease: EASE_OUT_EXPO },
              }}
              className="flex items-center"
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
              className="rounded-full border border-white/10 bg-red/90 shadow-lg shadow-deep-blue/40"
              onClick={() => setIsMenuToggled(!isMenuToggled)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              animate={{
                padding: isCompact ? "0.42rem" : "0.52rem",
                boxShadow: isCompact
                  ? "0 14px 28px rgba(1, 0, 38, 0.38)"
                  : "0 18px 34px rgba(1, 0, 38, 0.28)",
              }}
              transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
              aria-label="Open navigation menu"
            >
              <img alt="menu-icon" src="../assets/menu-icon.svg" />
            </motion.button>
          )}
        </motion.div>
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
