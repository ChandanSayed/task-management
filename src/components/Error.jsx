import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="text-center h-screen flex flex-col items-center justify-center">
      <h2 className="text-yellow-600 text-2xl mb-6 lg:text-5xl">Page does not exist!</h2>
      <Link to={'/'}>Back to home!</Link>
    </div>
  );
};

export default Error;
