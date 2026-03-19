import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";

const pages = ["home", "skills", "projects", "testimonials", "contact"];
const anchorOffset = 96;

const DotGroup = ({ selectedPage, setSelectedPage }) => {
  return (
    <motion.nav
      className="fixed right-7 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-5 rounded-full
      border border-white/15 bg-deep-blue/55 px-3 py-4 backdrop-blur-sm"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Section navigation"
    >
      {pages.map((page) => {
        const isActive = selectedPage === page;
        return (
          <AnchorLink
            key={page}
            href={`#${page}`}
            offset={anchorOffset}
            aria-label={`Go to ${page}`}
            className="group relative flex items-center"
            onClick={() => setSelectedPage(page)}
          >
            <span
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-yellow ring-4 ring-yellow/35"
                  : "bg-dark-grey group-hover:bg-white/85"
              }`}
            />
            <span
              className="pointer-events-none absolute right-7 whitespace-nowrap rounded-sm bg-deep-blue px-2 py-1
              text-xs font-opensans uppercase tracking-wider text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100"
            >
              {page}
            </span>
          </AnchorLink>
        );
      })}
    </motion.nav>
  );
};

export default DotGroup;
