import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 p-4 text-lg">
      <p className="flex justify-center items-center gap-2">
        Copyright &copy; 2023 aerahrah
        <a href="https://github.com/aerahrah" target="_blank">
          <FaGithub
            size="1.5rem"
            className="transition duration-100 transform hover:scale-[1.06] hover:cursor-pointer"
          />
        </a>
      </p>
    </div>
  );
};
export default Footer;
