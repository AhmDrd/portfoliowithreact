import LineGradient from "../components/LineGradient";
import useMediaQuery from "../hooks/useMediaQuery";
import { motion } from "framer-motion";

const transitionEase = [0.22, 1, 0.36, 1];

const skillCards = [
  {
    id: "01",
    title: "Experience",
    colorClass: "bg-blue",
    body: "A auctor pharetra hendrerit mattis amet etiam interdum platea. Est morbi porttitor scelerisque fermentum, sagittis non egestas. Amet odio sit sagittis.",
  },
  {
    id: "02",
    title: "Innovative",
    colorClass: "bg-red",
    body: "Urna, eget pulvinar dolor cursus dictum odio. Nec in neque nibh tortor. Libero sed pretium justo nulla blandit nulla amet habitant iaculis. Iaculis in congue vitae sollicitudin faucibus a.",
  },
  {
    id: "03",
    title: "Imaginative",
    colorClass: "bg-yellow",
    body: "Accumsan eu fringilla nisi, eget. Vitae, eget ut id proin arcu in curabitur. Lectus libero, egestas enim aliquam quis felis amet. Sagittis, amet netus fringilla netus lobortis odio sed platea. Bibendum.",
  },
];

const cardsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.17,
      delayChildren: 0.1,
    },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 38 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: transitionEase },
  },
};

const MySkills = () => {
  const isAboveLarge = useMediaQuery("(min-width: 1060px)");

  return (
    <section id="skills" className="pb-24 pt-10">
      {/* HEADER AND IMAGE SECTION */}
      <div className="mt-32 md:flex md:justify-between md:gap-16">
        <motion.div
          className="md:w-1/3"
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: transitionEase }}
        >
          <p className="mb-5 font-playfair text-4xl font-semibold">
            MY <span className="text-red">SKILLS</span>
          </p>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "33.333333%", opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.75, delay: 0.12, ease: transitionEase }}
          >
            <LineGradient />
          </motion.div>
          <motion.p
            className="mb-7 mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.2, ease: transitionEase }}
          >
            Aliquam, amet dui feugiat facilisi dui. Aliquam aliquet integer ut
            fames odio in at.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 md:mt-0"
          initial={{ opacity: 0, x: 38, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.85, ease: transitionEase }}
        >
          {isAboveLarge ? (
            <div
              className="relative z-0 ml-20 before:absolute before:-left-10 before:-top-10
              before:h-full before:w-full before:border-2 before:border-blue before:z-[-1]"
            >
              <motion.img
                alt="skills"
                className="z-10"
                src="assets/skills-image.png"
                whileHover={{ scale: 1.02, rotate: -0.4 }}
                transition={{ duration: 0.35 }}
              />
            </div>
          ) : (
            <motion.img
              alt="skills"
              className="z-10"
              src="assets/skills-image.png"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.35 }}
            />
          )}
        </motion.div>
      </div>

      {/* SKILLS */}
      <motion.div
        className="mt-16 gap-32 md:flex md:justify-between"
        variants={cardsContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {skillCards.map((card) => (
          <motion.article
            key={card.id}
            className="mt-10 md:w-1/3"
            variants={cardReveal}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.28 }}
          >
            <div className="relative h-32 overflow-hidden">
              <div className="z-10">
                <p className="font-playfair text-5xl font-semibold">{card.id}</p>
                <p className="mt-3 font-playfair text-3xl font-semibold">
                  {card.title}
                </p>
              </div>
              <motion.div
                className={`absolute right-0 top-0 h-32 ${card.colorClass} z-[-1]`}
                initial={{ width: "38%", opacity: 0.85 }}
                whileInView={{ width: "70%", opacity: 1 }}
                viewport={{ once: true, amount: 0.9 }}
                transition={{ duration: 0.6, ease: transitionEase }}
              />
            </div>
            <p className="mt-5">{card.body}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default MySkills;
