import LineGradient from "../components/LineGradient";
import { motion } from "framer-motion";

const transitionEase = [0.22, 1, 0.36, 1];

const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 38, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: transitionEase },
  },
};

const projectTiles = [
  {
    type: "label",
    text: "BEAUTIFUL USER INTERFACES",
    colorClass: "bg-red",
  },
  { type: "project", title: "Project 1" },
  { type: "project", title: "Project 2" },
  { type: "project", title: "Project 3" },
  { type: "project", title: "Project 4" },
  { type: "project", title: "Project 5" },
  { type: "project", title: "Project 6" },
  { type: "project", title: "Project 7" },
  {
    type: "label",
    text: "SMOOTH USER EXPERIENCE",
    colorClass: "bg-blue",
  },
];

const ProjectTile = ({ title }) => {
  const projectTitle = title.split(" ").join("-").toLowerCase();

  return (
    <motion.article
      variants={cardVariant}
      className="group relative overflow-hidden"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.28 }}
    >
      <motion.img
        src={`../assets/${projectTitle}.jpeg`}
        alt={projectTitle}
        className="h-full w-full object-cover"
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      />
      <div
        className="absolute inset-0 z-30 flex translate-y-3 flex-col items-center justify-center bg-grey p-16
        text-center text-deep-blue opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-95"
      >
        <p className="text-2xl font-playfair">{title}</p>
        <p className="mt-7">
          Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nulla
          porttitor accumsan tincidunt.
        </p>
      </div>
    </motion.article>
  );
};

const StatementTile = ({ text, colorClass }) => (
  <motion.div
    variants={cardVariant}
    className={`flex items-center justify-center p-10 text-center font-playfair text-2xl font-semibold ${colorClass}
      max-h-[400px] max-w-[400px]`}
    whileHover={{ y: -6, scale: 1.01 }}
    transition={{ duration: 0.28 }}
  >
    {text}
  </motion.div>
);

const Projects = () => {
  return (
    <section id="projects" className="scroll-mt-28 pb-40 pt-28">
      {/* HEADINGS */}
      <motion.div
        className="mx-auto text-center md:w-2/5"
        initial={{ opacity: 0, y: -34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "0px 0px 140px 0px" }}
        transition={{ duration: 0.75, ease: transitionEase }}
      >
        <div>
          <p className="font-playfair text-4xl font-semibold">
            <span className="text-red">PRO</span>JECTS
          </p>
          <div className="mt-5 flex justify-center">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "66.666667%", opacity: 1 }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px 120px 0px" }}
              transition={{ duration: 0.75, delay: 0.12, ease: transitionEase }}
            >
              <LineGradient />
            </motion.div>
          </div>
        </div>
        <motion.p
          className="mb-10 mt-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.68, delay: 0.16, ease: transitionEase }}
        >
          Aliquam, amet dui feugiat facilisi dui. Aliquam aliquet integer ut
          fames odio in at. At magna ornare dictum lectus. Purus massa morbi
          purus nec eget eleifend ut elit.
        </motion.p>
      </motion.div>

      {/* PROJECTS */}
      <div className="flex justify-center">
        <motion.div
          className="sm:grid sm:grid-cols-3"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08, margin: "0px 0px 180px 0px" }}
        >
          {projectTiles.map((tile) =>
            tile.type === "project" ? (
              <ProjectTile key={tile.title} title={tile.title} />
            ) : (
              <StatementTile
                key={tile.text}
                text={tile.text}
                colorClass={tile.colorClass}
              />
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
