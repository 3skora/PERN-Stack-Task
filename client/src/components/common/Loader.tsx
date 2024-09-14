import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
