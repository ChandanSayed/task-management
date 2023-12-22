import { motion } from 'framer-motion';
const TargetAudience = () => {
  const audienceTypes = [
    { id: 1, name: 'Developers', description: 'Can track the tasks of your daily life!' },
    { id: 2, name: 'Corporate Professionals', description: 'Can track the tasks of your daily life!' },
    { id: 3, name: 'Bankers', description: 'Can track the tasks of your daily life!' }
  ];

  return (
    <section className="bg-gray-100 py-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 }
        }}
        className="container mx-auto px-4"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Who Can Benefit?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audienceTypes.map(audience => (
            <div key={audience.id} className="bg-white shadow-md p-6 rounded-md">
              <h3 className="text-xl font-semibold mb-2">{audience.name}</h3>
              <p className="text-gray-700">{audience.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TargetAudience;
