// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./StepContainer.css";

export default function StepContainer({ children, variants, ...props }) {
  const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <motion.div
      className="game-content"
      {...props}
      variants={variants || defaultVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

