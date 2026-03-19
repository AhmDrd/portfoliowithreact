import { motion } from "framer-motion";

const links = [
  {
    href: "https://www.linkedin.com",
    alt: "linkedin-link",
    src: "../assets/linkedin.png",
  },
  {
    href: "https://www.twitter.com",
    alt: "twitter-link",
    src: "../assets/twitter.png",
  },
  {
    href: "https://www.facebook.com",
    alt: "facebook-link",
    src: "../assets/facebook.png",
  },
  {
    href: "https://www.instagram.com",
    alt: "instagram-link",
    src: "../assets/instagram.png",
  },
];

const SocialMediaIcons = () => {
  return (
    <motion.div
      className="my-10 flex justify-center gap-7 md:justify-start"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45, staggerChildren: 0.08 }}
    >
      {links.map((link) => (
        <motion.a
          key={link.alt}
          className="transition duration-500 hover:opacity-60"
          href={link.href}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -3, scale: 1.07 }}
          whileTap={{ scale: 0.94 }}
        >
          <img alt={link.alt} src={link.src} />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialMediaIcons;
