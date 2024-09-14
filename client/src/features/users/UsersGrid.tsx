import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { IUser, IUserRecord } from "../../interfaces/user.interfaces";
import { useGetUsersQuery } from "../../api/userApi";
import Loader from "../../components/common/Loader";
import { setOpenModal } from "../../store/modalSlice";
import { useAppDispatch } from "../../store";
import { setFormType, setOpenForm, setUserInputs } from "../../store/formSlice";
import { mapUserRecordToUser } from "../../utils/user.utils";

interface UsersGridProps {
  //   onEditUser: (user: IUserRecord, userId: number) => void;
  //   handleShowDeleteDialog: (params: any) => void;
}

const UsersGrid: React.FC<UsersGridProps> = ({}) => {
  const { data, isLoading } = useGetUsersQuery({});

  const dispatch = useAppDispatch();

  const handleOnEditUser = (user: IUserRecord) => {
    console.log("🚀 ~ file: UsersGrid.tsx:20 ~ handleOnEditUser ~ user:", user);
    const mappedUser = mapUserRecordToUser(user);
    dispatch(setOpenForm(true));
    dispatch(setFormType("Edit"));
    dispatch(setUserInputs(mappedUser));
    // onEditUser(user, user.id);
  };

  const handleOnDeleteUser = (user: IUserRecord) => {
    console.log("🚀 ~ file: UsersGrid.tsx:25 ~ handleOnDeleteUser ~ user:", user);
    dispatch(setOpenModal(true));
    // onEditUser(user, user.id);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "city", headerName: "City", width: 200 },
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
