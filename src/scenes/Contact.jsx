import LineGradient from "../components/LineGradient";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const transitionEase = [0.22, 1, 0.36, 1];

const formContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.1,
    },
  },
};

const fieldVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: transitionEase },
  },
};

const Contact = () => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }
  };

  return (
    <section id="contact" className="contact py-48">
      {/* HEADINGS */}
      <motion.div
        className="flex w-full justify-end"
        initial={{ opacity: 0, x: 38 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.72, ease: transitionEase }}
      >
        <div>
          <p className="font-playfair text-4xl font-semibold">
            <span className="text-yellow">CONTACT ME</span> TO GET STARTED
          </p>
          <div className="my-5 flex md:justify-end">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "50%", opacity: 1 }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{ duration: 0.72, delay: 0.12, ease: transitionEase }}
            >
              <LineGradient />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* FORM & IMAGE */}
      <div className="mt-5 gap-16 md:flex md:justify-between">
        <motion.div
          className="basis-1/2 flex justify-center"
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.8, ease: transitionEase }}
        >
          <motion.img
            src="../assets/contact-image.jpeg"
            alt="contact"
            className="rounded-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.35 }}
          />
        </motion.div>

        <motion.div
          className="basis-1/2 mt-10 md:mt-0"
          variants={formContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <form
            target="_blank"
            onSubmit={onSubmit}
            action="https://formsubmit.co/e8a5bdfa807605332f809e5656e27c6e"
            method="POST"
          >
            <motion.div variants={fieldVariant}>
              <input
                className="w-full bg-blue p-3 font-semibold placeholder-opaque-black focus:outline-none focus:ring-2 focus:ring-yellow/70"
                type="text"
                placeholder="NAME"
                {...register("name", {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors.name && (
                <p className="mt-1 text-red">
                  {errors.name.type === "required" && "This field is required."}
                  {errors.name.type === "maxLength" && "Max length is 100 char."}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariant} className="mt-5">
              <input
                className="w-full bg-blue p-3 font-semibold placeholder-opaque-black focus:outline-none focus:ring-2 focus:ring-yellow/70"
                type="text"
                placeholder="EMAIL"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              {errors.email && (
                <p className="mt-1 text-red">
                  {errors.email.type === "required" && "This field is required."}
                  {errors.email.type === "pattern" && "Invalid email address."}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariant} className="mt-5">
              <textarea
                className="w-full bg-blue p-3 font-semibold placeholder-opaque-black focus:outline-none focus:ring-2 focus:ring-yellow/70"
                name="message"
                placeholder="MESSAGE"
                rows="4"
                cols="50"
                {...register("message", {
                  required: true,
                  maxLength: 2000,
                })}
              />
              {errors.message && (
                <p className="mt-1 text-red">
                  {errors.message.type === "required" &&
                    "This field is required."}
                  {errors.message.type === "maxLength" &&
                    "Max length is 2000 char."}
                </p>
              )}
            </motion.div>

            <motion.button
              className="mt-5 bg-yellow p-5 font-semibold text-deep-blue transition duration-500 hover:bg-red hover:text-white"
              type="submit"
              variants={fieldVariant}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              SEND ME A MESSAGE
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
