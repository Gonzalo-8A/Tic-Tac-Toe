// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./StepContainer.css";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export default function StepContainer({ key, children }) {
  return (
    <motion.div
      key={key}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.8 }}
      className="game-content"
    >
      {children}
    </motion.div>
  );
}
