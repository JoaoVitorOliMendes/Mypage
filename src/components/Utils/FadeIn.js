import { motion } from "framer-motion";

export default function FadeIn(props) {
  const { leftToRight } = props;
  const { topToBottom } = props;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      variants={{
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
        },
        hidden: {
          opacity: 0,
          x: leftToRight ? (leftToRight === 1 ? "-50%" : "50%") : 0,
          y: topToBottom ? (topToBottom === 1 ? "-50%" : "50%") : 0,
        },
      }}
    >
      {props.children}
    </motion.div>
  );
}
