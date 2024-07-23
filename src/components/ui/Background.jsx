import PropTypes from "prop-types";

export const Background = ({ children }) => {
  return (
    <div className="relative font-poppins flex justify-center items-center bg-[url('grid--dark.svg')] w-full h-screen bg-repeat bg-[length:30px_30px] bg-[#030210]">
      {children}
    </div>
  );
};

Background.propTypes = {
  children: PropTypes.node.isRequired,
};
