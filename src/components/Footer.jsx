import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="px-4 py-6 text-center bg-gray-800 text-white">
      <div className="container mx-auto flex justify-center items-center px-4 mb-5">
        <a href="#" className="text-gray-300 mx-2 hover:text-gray-400">
          <FaFacebook size={24} />
        </a>
        <a href="#" className="text-gray-300 mx-2 hover:text-gray-400">
          <FaTwitter size={24} />
        </a>
        <a href="#" className="text-gray-300 mx-2 hover:text-gray-400">
          <FaInstagram size={24} />
        </a>
        <a href="#" className="text-gray-300 mx-2 hover:text-gray-400">
          <FaLinkedin size={24} />
        </a>
      </div>
      <p> {new Date().getFullYear()} @ All rights reserved to SCC Technovision Inc. </p>
    </div>
  );
};

export default Footer;
