import { useCreateMatchMutation } from "../../api/matchApi";
import { useAppSelector } from "../../store";
import { Button } from "@mui/material";

const MatchedUsers = () => {
  const [createMatch] = useCreateMatchMutation();
  const { matchedHelper, matchedClient } = useAppSelector((state) => state.user);

  const onApplyMatch = () => {
    if (matchedHelper && matchedClient) createMatch({ clientId: matchedClient.id, helperId: matchedHelper.id });
    console.log("Apply Match");
  };

  if (!matchedHelper && !matchedClient) return null;

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-evenly", flexGrow: 1 }}>
        <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f0f0f0" }}>
          {matchedHelper ? (
            <div>
              {matchedHelper.name} - {matchedHelper.email} - {matchedHelper.city}
            </div>
          ) : (
            <div> Select Helper To Match</div>
          )}
        </div>

        <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f0f0f0" }}>
          {matchedClient ? (
            <div>
              {matchedClient.name} - {matchedClient.email} - {matchedClient.city}
            </div>
          ) : (
            <div> Select Client To Match</div>
          )}
        </div>
      </div>

      <div>
        <Button variant="contained" color="success" onClick={onApplyMatch} disabled={!matchedHelper || !matchedClient}>
          Apply Matching
        </Button>
      </div>
    </div>
  );
};

export default MatchedUsers;
