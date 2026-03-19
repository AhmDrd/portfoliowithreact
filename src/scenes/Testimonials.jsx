import LineGradient from "../components/LineGradient";
import { motion } from "framer-motion";

const transitionEase = [0.22, 1, 0.36, 1];

const testimonials = [
  {
    id: "person-1",
    quote: "A auctor pharetra hendrerit mattis amet etiam interdum platea.",
    colorClass: "bg-blue",
    personClass: "before:content-person1",
  },
  {
    id: "person-2",
    quote:
      "Aliquam aliquet integer ut fames odio in at. At magna ornare dictum lectus.",
    colorClass: "bg-red",
    personClass: "before:content-person2",
  },
  {
    id: "person-3",
    quote: "Fames odio in at. At magna ornare dictum lectus.",
    colorClass: "bg-yellow",
    personClass: "before:content-person3",
  },
];

const cardContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: transitionEase },
  },
};

const TestimonialCard = ({ quote, colorClass, personClass }) => (
  <motion.article
    variants={cardVariant}
    className={`mx-auto mt-48 flex h-[350px] max-w-[400px] flex-col justify-end p-16 ${colorClass}
      ${personClass} relative before:absolute before:left-1/2 before:top-[-120px] before:-ml-[110px]`}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.28 }}
  >
    <motion.p
      className="font-playfair text-6xl leading-none"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.95 }}
      transition={{ duration: 0.5, delay: 0.12 }}
    >
      "
    </motion.p>
    <motion.p
      className="text-center text-xl"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.95 }}
      transition={{ duration: 0.65, delay: 0.18, ease: transitionEase }}
    >
      {quote}
    </motion.p>
  </motion.article>
);

const Testimonials = () => {
  return (
    <section id="testimonials" className="pb-16 pt-32">
      {/* HEADING */}
      <motion.div
        className="text-center md:w-1/3 md:text-left"
        initial={{ opacity: 0, x: -36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.75, ease: transitionEase }}
      >
        <p className="mb-5 font-playfair text-4xl font-semibold text-red">
          TESTIMONIALS
        </p>
        <motion.div
          className="mx-auto md:mx-0"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "40%", opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.72, delay: 0.12, ease: transitionEase }}
        >
          <LineGradient />
        </motion.div>
        <motion.p
          className="mt-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.68, delay: 0.16, ease: transitionEase }}
        >
          Here's What People are Saying About My Work. Aliquam aliquet integer
          ut fames odio in at. At magna ornare dictum lectus.
        </motion.p>
      </motion.div>

      {/* TESTIMONIALS */}
      <motion.div
        className="gap-8 md:flex md:justify-between"
        variants={cardContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {testimonials.map((entry) => (
          <TestimonialCard
            key={entry.id}
            quote={entry.quote}
            colorClass={entry.colorClass}
            personClass={entry.personClass}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
