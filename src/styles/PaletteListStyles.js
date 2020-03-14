import sizes from "./sizeHelper";
import bg from "./bg.svg";
export default {
  "@global": {
    ".fade-exit": {
      opacity: 1
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-out"
    },
    ".fade-enter": {
      opacity: 0
    },
    ".fade-enter-active": {
      opacity: 1,
      transition: "opacity 500ms ease-out"
    }
  },
  root: {
    background: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    /* background by SVGBackgrounds.com */
    backgroundColor: "#0c0f40",
    backgroundImage: `url(${bg})`,
    overflow: "auto"
  },
  header: {
    fontSize: "2rem"
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "columns",
    flexWrap: "wrap",
    [sizes.down("xs")]: {
      width: "70%"
    }
  },
  nav: {
    display: "flex",
    width: "100%",
    height: "100px",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white",
      fontSize: "1rem"
    }
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "2rem",
    [sizes.down("sm")]: {
      gridTemplateColumns: "repeat(2, 50%)"
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "1.5rem"
    }
  },
  newPaletteLink: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    color: "white",
    textDecoration: "none"
  }
};
