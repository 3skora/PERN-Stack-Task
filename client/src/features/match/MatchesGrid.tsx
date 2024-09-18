import { DataGrid, GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IUserRecord } from "../../interfaces/user.interfaces";
import { useDeleteUserMutation } from "../../api/userApi";
import Loader from "../../components/common/Loader";
import { setOnConfirmDeletion, setOpenModal } from "../../store/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { setFormEntity, setFormType, setOpenForm, setSelectedUserId, setUserInputs } from "../../store/formSlice";
import { mapUserRecordToUser } from "../../utils/user.utils";
import { useGetMatchQuery } from "../../api/matchApi";

const MatchesGrid = () => {
  const { data, isLoading } = useGetMatchQuery({});

  const dispatch = useAppDispatch();

  const [deleteUser] = useDeleteUserMutation();
  const { selectedUserId } = useAppSelector((state) => state.form);

  const onConfirmDeletion = () => {
    console.log("Confirm Delete");
    console.log("🚀 ~ file: MatchesGrid.tsx:28 ~ onConfirmDeletion ~ selectedUserId:", selectedUserId);
    selectedUserId && deleteUser(selectedUserId);
    dispatch(setOpenModal(false));
  };

  const handleOnEditUser = (user: IUserRecord) => {
    console.log("🚀 ~ file: MatchesGrid.tsx:20 ~ handleOnEditUser ~ user:", user);
    const mappedUser = mapUserRecordToUser(user);
    dispatch(setOpenForm(true));
    dispatch(setSelectedUserId(user.id));
    dispatch(setFormType("Edit"));
    dispatch(setFormEntity("User"));
    dispatch(setUserInputs(mappedUser));
  };

  const handleOnDeleteUser = (user: IUserRecord) => {
    console.log("🚀 ~ file: MatchesGrid.tsx:25 ~ handleOnDeleteUser ~ user:", user);
    dispatch(setSelectedUserId(user.id));
    dispatch(setOpenModal(true));
    dispatch(setOnConfirmDeletion(onConfirmDeletion));
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },

    {
      field: "client.id",
      headerName: "Client ID",
      width: 100,
    },
    { field: "client.name", headerName: "Client Name", width: 170 },
    {
      field: "client.email",
      headerName: "Client Email",
      width: 180,
    },
    // {
    //   field: "client.phoneNumber",
    //   headerName: "Client Phone Number",
    //   width: 150,
    // },
    { field: "client.city", headerName: "Client City", width: 170 },

    { field: "helper.id", headerName: "Helper ID", width: 100 },
    { field: "helper.name", headerName: "Helper Name", width: 170 },
    { field: "helper.email", headerName: "Helper Email", width: 180 },
    // { field: "helper.phoneNumber", headerName: "Helper Phone Number", width: 150 },
    { field: "helper.city", headerName: "Helper City", width: 170 },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <Button
            key={`delete-${params.id}`}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleOnDeleteUser(params.row)}
          >
            Unmatch
          </Button>
        </div>
      ),
    },
  ];

  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: "client",
      description: "Information about the client",
      headerName: "Client Info",
      headerAlign: "center",
      children: [{ field: "client.id" }, { field: "client.name" }, { field: "client.email" }, { field: "client.city" }],
    },
    {
      groupId: "helper",
      description: "Information about the helper",
      headerName: "Helper Info",
      headerAlign: "center",
      children: [{ field: "helper.id" }, { field: "helper.name" }, { field: "helper.email" }, { field: "helper.city" }],
    },
  ];
  if (isLoading) return <Loader />;

  return (
    <div>
      <DataGrid
        rows={data?.map((match) => ({
          id: match.id,
          "client.id": match.client.id,
          "client.name": match.client.name,
          "client.email": match.client.email,
          "client.phoneNumber": match.client.phoneNumber,
          "client.city": match.client.city,
          "helper.id": match.helper.id,
          "helper.name": match.helper.name,
          "helper.email": match.helper.email,
          "helper.phoneNumber": match.helper.phoneNumber,
          "helper.city": match.helper.city,
          createdAt: match.createdAt,
          updatedAt: match.updatedAt,
        }))}
        columns={columns}
        pageSizeOptions={[30, 50, 100]}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        columnGroupingModel={columnGroupingModel}
      />
    </div>
  );
};

export default MatchesGrid;
