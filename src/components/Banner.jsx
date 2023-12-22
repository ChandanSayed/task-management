import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
      }}
      className="hero min-h-screen bg-base-200"
    >
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-5">Wanna start your task manager today?</h1>
          <Link to={'/dashboard'}>
            <button className="btn btn-primary">Let’s Explore</button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
