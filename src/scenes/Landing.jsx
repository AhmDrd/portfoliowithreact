import SocialMediaIcons from "../components/SocialMediaIcons";
import useMediaQuery from "../hooks/useMediaQuery";
import { motion, useReducedMotion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";

const transitionEase = [0.22, 1, 0.36, 1];
const anchorOffset = 96;

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: transitionEase },
  },
};

const portraitFrame = {
  hidden: { opacity: 0, x: 34, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.85, ease: transitionEase },
  },
};

const Landing = ({ setSelectedPage }) => {
  const isAboveLarge = useMediaQuery("(min-width: 1060px)");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden md:flex md:items-center md:justify-between gap-16 md:h-full py-10"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-10 h-[280px] w-[280px] rounded-full bg-blue/20 blur-3xl"
        animate={
          shouldReduceMotion
            ? { opacity: 0.4 }
            : { y: [0, -20, 0], x: [0, 12, 0], scale: [1, 1.06, 1] }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* IMAGE SECTION */}
      <motion.div
        className="basis-3/5 z-10 mt-16 md:mt-32 flex justify-center md:order-2"
        variants={portraitFrame}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
      >
        {isAboveLarge ? (
          <div
            className="relative z-0 ml-20 before:absolute before:-top-20 before:-left-20 before:rounded-t-[400px]
            before:h-full before:w-full before:max-w-[400px] before:border-2 before:border-blue before:z-[-1] md:before:max-w-[600px]"
          >
            <motion.img
              alt="profile"
              className="z-10 w-full max-w-[400px] md:max-w-[600px]"
              src="assets/profile-image.png"
              whileHover={
                shouldReduceMotion ? {} : { scale: 1.03, filter: "saturate(1.15)" }
              }
              animate={
                shouldReduceMotion ? {} : { y: [0, -8, 0], rotate: [0, -0.8, 0] }
              }
              transition={{
                duration: 6.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        ) : (
          <motion.img
            alt="profile"
            className="z-10 w-full max-w-[400px] md:max-w-[600px]"
            src="assets/profile-image.png"
            animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>

      {/* MAIN TEXT */}
      <motion.div
        className="z-30 basis-2/5 mt-12 md:mt-32"
        variants={heroContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* HEADINGS */}
        <motion.div variants={heroItem}>
          <p className="text-6xl font-playfair z-10 text-center md:text-start">
            Jane {""}
            <span
              className="xs:relative xs:text-deep-blue xs:font-semibold z-20 xs:before:content-brush
              before:absolute before:-left-[25px] before:-top-[70px] before:z-[-1]"
            >
              Esper
            </span>
          </p>

          <p className="mt-10 mb-7 text-sm text-center md:text-start">
            Adipiscing arcu, in aliquam fringilla cursus. Elit arcu elementum
            viverra malesuada sem ac faucibus dolor. Sagittis scelerisque.
          </p>
        </motion.div>

        {/* CALL TO ACTIONS */}
        <motion.div
          variants={heroItem}
          className="flex mt-5 justify-center md:justify-start"
        >
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <AnchorLink
              className="bg-gradient-rainblue text-deep-blue rounded-sm py-3 px-7 font-semibold
              hover:bg-blue hover:text-white transition duration-500"
              onClick={() => setSelectedPage("contact")}
              href="#contact"
              offset={anchorOffset}
            >
              Contact Me
            </AnchorLink>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
            <AnchorLink
              className="rounded-r-sm bg-gradient-rainblue py-0.5 pr-0.5"
              onClick={() => setSelectedPage("contact")}
              href="#contact"
              offset={anchorOffset}
            >
              <div className="bg-deep-blue hover:text-red transition duration-500 w-full h-full flex items-center justify-center px-10 font-playfair">
                Let's talk.
              </div>
            </AnchorLink>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-5 flex justify-center md:justify-start"
          variants={heroItem}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.65, ease: transitionEase }}
          >
            <SocialMediaIcons />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Landing;
