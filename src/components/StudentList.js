import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import axios from "axios";
import shortid from "shortid";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = shortid.generate();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", class: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function StudentList() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const fetchStudents = async () => {
    const response = await axios.get("/studentsinfo");
    setRows(
      response.data.studentInfo.map((item) => {
        return {
          ...item,
          ...item.subjects,
        };
      })
    );
    return response.data;
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchStudents();
    return () => {
      controller.abort();
    };
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id) => {
      try {
        const response = await axios.delete(`/studentsinfo/${id}`);
        setRows(rows.filter((row) => row.id !== id));
        return response.data.message;
      } catch (error) {
        console.log('Error deleting record');
      }
   
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const saveDataToDB = async (data, mode) => {
    const response = await axios.post("/studentsinfo", { data, mode: mode });
    return response;
  };

  const processRowUpdate = (newRow) => {
    const mode = newRow.isNew ? "create" : "edit";
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    saveDataToDB(newRow, mode);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "class",
      headerName: "Class",
      type: "singleSelect",
      valueOptions: ["IV", "V", "VI"],
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "subject1",
      headerName: "Subject 1",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["None", "Science", "Maths"],
    },
    {
      field: "subject2",
      headerName: "Subject 2",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["None", "Science", "Maths"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
