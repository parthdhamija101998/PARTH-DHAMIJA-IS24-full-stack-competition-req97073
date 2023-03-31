import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../service/api";

// Material UI
import {
  FormGroup,
  FormControl,
  InputLabel,
  Typography,
  styled,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  TextField,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// Date
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// MultiSelect
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import dayjs from "dayjs";

const Container = styled(FormGroup)`
  margin: 3% auto auto auto;
  width: 50%;
  & > div {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

let defaultProduct = {
  productName: "",
  productOwnerName: "",
  developers: [],
  scrumMasterName: "",
  startDate: new Date(),
  methodology: "Waterfall",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Developer Names
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const AddProduct = () => {
  // State variables for the product and any validation errors
  const [product, setProduct] = useState(defaultProduct);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  // Navigation and theme variables from React Router and Material UI
  const navigate = useNavigate();
  const theme = useTheme();

  // State variable for the selected developers from a multiple select field
  const [personName, setPersonName] = useState([]);

  // Event handlers for updating the product state based on user input
  const onValueChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onChangeDate = (e) => {
    try {
      const newDate = new Date(e.toISOString());
      setProduct({ ...product, startDate: newDate });
    } catch {}
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    const selectedValues = typeof value === "string" ? value.split(",") : value;

    // Limiting the selection to 5
    if (selectedValues.length <= 5) {
      setPersonName(selectedValues);
      setProduct({ ...product, developers: selectedValues });
    }
  };

  // Helper function for styling the multiple select options
  const getStyles = (name, personName, theme) => {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

  const handleClick = (product) => {
    if (validate()) {
      defaultProduct = product;
      setOpen(true);
    }
  };

  const handleConfirm = () => {
    addProductDetails(defaultProduct);
    setOpen(false);
  };

  // Function for adding the product to the database
  const addProductDetails = async () => {
    // Validate the input before adding the product
    if (validate()) {
      await addProduct(product);
      navigate("/");
    }
  };

  // Function for validating the input before submitting
  const validate = () => {
    let temp = {};
    temp.productName =
      product.productName.length !== 0 ? "" : "Product name is required";
    temp.productOwnerName =
      product.productOwnerName.length !== 0
        ? ""
        : "Product Owner name is required";
    temp.developers =
      product.developers.length >= 1
        ? ""
        : "At least 1 developer needs to be selected";
    temp.scrumMasterName =
      product.scrumMasterName.length !== 0
        ? ""
        : "SCRUM Master name is required";
    setErrors({ ...temp });
    // Check if any validation errors exist
    return Object.values(temp).every((value) => value.length === 0);
  };

  return (
    <Container>
      <Typography variant="h4">Add Product</Typography>
      <FormControl>
        <TextField
          label="Product Name"
          variant="standard"
          error={errors.productName}
          helperText={errors.productName}
          onChange={(e) => onValueChange(e)}
          name="productName"
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Product Owner Name"
          variant="standard"
          error={errors.productOwnerName}
          helperText={errors.productOwnerName}
          onChange={(e) => onValueChange(e)}
          name="productOwnerName"
        />
      </FormControl>
      <FormControl error={errors.developers}>
        <InputLabel id="demo-multiple-chip-label">Developers</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormHelperText>{errors.developers}</FormHelperText>
      <FormControl>
        <TextField
          variant="standard"
          label="SCRUM Master Name"
          error={errors.scrumMasterName}
          helperText={errors.scrumMasterName}
          onChange={(e) => onValueChange(e)}
          name="scrumMasterName"
        />
      </FormControl>
      <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              defaultValue={dayjs()}
              label="Start Date"
              onChange={(newValue) => onChangeDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </FormControl>
      <FormControl>
        <FormLabel component="legend">Methodology</FormLabel>
        <RadioGroup
          row
          defaultValue="Waterfall"
          aria-label="methodology"
          name="methodology"
          onChange={(e) => onValueChange(e)}
        >
          <FormControlLabel
            value="Waterfall"
            control={<Radio />}
            label="Waterfall"
          />
          <FormControlLabel value="Agile" control={<Radio />} label="Agile" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <Button variant="contained" onClick={(e) => handleClick(product)}>
          Add Product
        </Button>{" "}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Save The Changes</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please confirm if you want to Add the product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="secondary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </FormControl>
    </Container>
  );
};

export default AddProduct;
