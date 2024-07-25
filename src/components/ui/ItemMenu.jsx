import PropTypes from "prop-types";

export const ItemMenu = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className="px-4 py-2 text-xs text-gray-700 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
    >
      {children}
    </div>
  );
};

ItemMenu.propTypes = {
  children: PropTypes.node.isRequired,
};