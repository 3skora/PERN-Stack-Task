import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { IUser, IUserRecord } from "../../interfaces/user.interfaces";
import { useDeleteUserMutation, useGetUsersQuery } from "../../api/userApi";
import Loader from "../../components/common/Loader";
import { setOnConfirmDeletion, setOpenModal } from "../../store/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { setFormEntity, setFormType, setOpenForm, setSelectedUserId, setUserInputs } from "../../store/formSlice";
import { mapUserRecordToUser } from "../../utils/user.utils";

const UsersGrid = () => {
  const { data, isLoading } = useGetUsersQuery({});

  const dispatch = useAppDispatch();

  const [deleteUser] = useDeleteUserMutation();
  const { selectedUserId } = useAppSelector((state) => state.form);

  const onConfirmDeletion = () => {
    console.log("Confirm Delete");
    selectedUserId && deleteUser(selectedUserId);
    dispatch(setOpenModal(false));
  };

  const handleOnEditUser = (user: IUserRecord) => {
    console.log("🚀 ~ file: UsersGrid.tsx:20 ~ handleOnEditUser ~ user:", user);
    const mappedUser = mapUserRecordToUser(user);
    dispatch(setOpenForm(true));
    dispatch(setSelectedUserId(user.id));
    dispatch(setFormType("Edit"));
    dispatch(setFormEntity("User"));
    dispatch(setUserInputs(mappedUser));
  };

  const handleOnDeleteUser = (user: IUserRecord) => {
    console.log("🚀 ~ file: UsersGrid.tsx:25 ~ handleOnDeleteUser ~ user:", user);
    dispatch(setSelectedUserId(user.id));
    dispatch(setOpenModal(true));
    dispatch(setOnConfirmDeletion(onConfirmDeletion));
  };

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
            // onClick={() => handleShowDeleteDialog(params)}
          >
            Match
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
