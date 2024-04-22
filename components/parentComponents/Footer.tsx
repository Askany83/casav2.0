import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 sm:h-10 h-16 glass flex flex-col sm:flex-row justify-between items-center">
      <div className="text-[10px] flex items-center justify-center sm:pl-7 font-light">
        {" "}
        <span className="mr-1">
          <b>GNU.v3</b> license
        </span>
      </div>

      <a
        href="https://github.com/Askany83/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub size={20} className="mr-1" />
      </a>

      <div className="flex items-center justify-center sm:justify-start text-xs sm:text-sm font-semibold ">
        <span className="mr-1">
          <b className="text-fuchsia-700 text-md">C</b>adastro
        </span>{" "}
        <span className="mr-1">de </span>
        <span className="mr-1">
          <b className="text-fuchsia-700 text-md">A</b>lojamento
        </span>{" "}
        <span className="mr-1">
          <b className="text-fuchsia-700 text-md">S</b>em
        </span>{" "}
        <span className="mr-1">
          <b className="text-fuchsia-700 text-md">A</b>proveitamento
        </span>{" "}
      </div>

      <a
        href="https://www.linkedin.com/in/andre-santos-carvalho/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin size={20} className="mr-1" />
      </a>

      <div className="text-[10px] flex items-center justify-center sm:pr-7 font-light">
        <span className="mr-1">
          <i>Developed by</i>
        </span>{" "}
        <span className="mr-1">
          <b>Askany.Inc</b>
        </span>
      </div>
    </div>
  );
};

export default Footer;
