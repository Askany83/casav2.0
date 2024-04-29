const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 sm:h-10 h-16 glass flex flex-row justify-center items-center">
      <div className="text-[11px] flex items-center justify-center sm:pl-7 font-light">
        <p className="mr-1">
          {" "}
          <span className="mr-3">
            <i>Developed by</i> <b>Askany.Inc</b>
          </span>
          <span className="mr-3">-</span>
          <span>
            <b>GNU.v3</b> license
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
