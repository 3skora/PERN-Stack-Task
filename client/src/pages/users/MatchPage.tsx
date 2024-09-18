import { Button } from "@mui/material";
import MatchesGrid from "../../features/match/MatchesGrid";
import { Link } from "react-router-dom";

const MatchPage = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div>
          <Button component={Link} to="/" variant="contained" color="primary">
            View Users
          </Button>
        </div>
        <h1 style={{ flexGrow: 1, textAlign: "center" }}>Matched Users</h1>
      </div>

      <MatchesGrid />
    </>
  );
};

export default MatchPage;
