import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { EUserRole, IUserRecord } from "../../interfaces/user.interfaces";
import { useDeleteUserMutation, useGetUsersQuery } from "../../api/userApi";
import Loader from "../../components/common/Loader";
import { setOnConfirmDeletion, setOpenModal } from "../../store/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { setFormEntity, setFormType, setOpenForm, setSelectedUserId, setUserInputs } from "../../store/formSlice";
import { mapUserRecordToUser } from "../../utils/user.utils";
import { setMatchedClient, setMatchedHelper } from "../../store/userSlice";

const UsersGrid = () => {
  const { data, isLoading } = useGetUsersQuery({});

  const dispatch = useAppDispatch();

  const [deleteUser] = useDeleteUserMutation();
  const { matchedHelper, matchedClient } = useAppSelector((state) => state.user);

  const onConfirmDeletion = (id: number) => {
    id && deleteUser(id);
    dispatch(setOpenModal(false));
  };

  const handleOnEditUser = (user: IUserRecord) => {
    const mappedUser = mapUserRecordToUser(user);
    dispatch(setOpenForm(true));
    dispatch(setSelectedUserId(user.id));
    dispatch(setFormType("Edit"));
    dispatch(setFormEntity("User"));
    dispatch(setUserInputs(mappedUser));
  };

  const handleOnDeleteUser = (user: IUserRecord) => {
    // dispatch(setSelectedUserId(user.id));
    dispatch(setOpenModal(true));
    dispatch(setOnConfirmDeletion(() => onConfirmDeletion(user.id)));
  };

  const handleOnMatchUser = (user: IUserRecord) => {
    if (user.role === EUserRole.HELPER) {
      const value = user.id === matchedHelper?.id ? undefined : user;
      dispatch(setMatchedHelper(value));
    }

    if (user.role === EUserRole.CLIENT) {
      const value = user.id === matchedClient?.id ? undefined : user;
      dispatch(setMatchedClient(value));
    }
  };

  const handleDisableButton = (user: IUserRecord) => {
    if (user.role === EUserRole.HELPER) {
      return (matchedHelper && matchedHelper.id !== user.id) || (matchedClient && matchedClient.city !== user.city);
    }
    if (user.role === EUserRole.CLIENT) {
      return (matchedClient && matchedClient.id !== user.id) || (matchedHelper && matchedHelper.city !== user.city);
    }
    return false;
  };

  // const handleDisableButton = (user: IUserRecord) => {
  //   if (matchedHelper) {
  //     return (matchedHelper.role === user.role && matchedHelper.id !== user.id) || matchedHelper.city !== user.city;
  //   }
  //   if (matchedClient) {
  //     return (matchedClient.role === user.role && matchedClient.id !== user.id) || matchedClient.city !== user.city;
  //   }
  //   return false;
  // };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "city", headerName: "City", width: 200 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => (
        <div>
          <Button
            key={`edit-${params.id}`}
            sx={{ ml: 1 }}
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => handleOnEditUser(params.row)}
          >
            Edit
          </Button>
          <Button
            key={`delete-${params.id}`}
            sx={{ ml: 1 }}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleOnDeleteUser(params.row)}
          >
            Delete
          </Button>
          <Button
            key={`match-${params.id}`}
            sx={{ ml: 1 }}
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            disabled={handleDisableButton(params.row)}
            onClick={() => handleOnMatchUser(params.row)}
          >
            {(matchedHelper && matchedHelper.id === params.row.id) ||
            (matchedClient && matchedClient.id === params.row.id)
              ? "UnMatch"
              : "Match"}
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <Loader />;

  return (
    <div>
      <DataGrid
        rows={data?.map((user) => user)}
        columns={columns}
        pageSizeOptions={[30, 50, 100]}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default UsersGrid;
