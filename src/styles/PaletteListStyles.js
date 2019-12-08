export default {
  root: {
    backgroundColor: "#434190",
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  container: {
    width: "90%",
    maxWidth: "960px",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap"
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    "& a": {
      color: "white"
    }
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    marginBottom: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "30px"
  }
};
