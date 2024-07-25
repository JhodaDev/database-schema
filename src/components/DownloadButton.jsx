import { useState } from "react";
import { IconDownload } from "./icons/IconDownload";
import { IconJPG } from "./icons/IconJPG";
import { Tooltip } from "react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { ItemMenu } from "./ui/ItemMenu";

const variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export const DownloadButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        className="focus:outline-none"
        data-tooltip-content="Download schema"
        data-tooltip-id="download-tooltip"
      >
        <IconDownload />
      </button>
      <Tooltip
        id="download-tooltip"
        place="bottom"
        effect="solid"
        delayShow={500}
        variant="dark"
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            className="absolute mt-2 bg-white -right-3 border border-gray-200 rounded-md shadow-lg z-50 w-max top-7"
          >
            <ItemMenu onClick={handleClose}>
              <IconJPG />
              <span>Export as JPEG</span>
            </ItemMenu>
            <ItemMenu onClick={handleClose}>
              <IconJPG />
              <span>Export as PNG</span>
            </ItemMenu>
            <ItemMenu onClick={handleClose}>
              <IconJPG />
              <span>Export as SVG</span>
            </ItemMenu>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
