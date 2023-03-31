import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { editProduct, getProduct } from "../service/api";

// Material UI
import {
  FormGroup,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// MultiSelect
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const Container = styled(FormGroup)`
  margin: 3% auto auto auto;
  width: 50%;
  & > div {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

let defaultProduct = {
  productId: 0,
  productName: "",
  productOwnerName: "",
  developers: [],
  scrumMasterName: "",
  startDate: new Date(),
  methodology: "",
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

// Temp
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

const EditProduct = () => {
  const [open, setOpen] = useState(false);

  const [product, setProduct] = useState(defaultProduct);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const { productId } = useParams();

  useEffect(() => {
    const loadProductDetails = async () => {
      const response = await getProduct(productId);
      const product = response.data;
      setProduct(product);
      setPersonName(product.developers);
    };
    loadProductDetails();
  }, []);

  const [personName, setPersonName] = useState([]);
  const theme = useTheme();

  const onValueChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const getDateValue = () => {
    const date = format(new Date(product.startDate), "dd-MM-yyyy");
    return date;
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
    editProductDetails(defaultProduct);
    setOpen(false);
  };

  const editProductDetails = async () => {
    await editProduct(product, productId);
    navigate("/");
  };

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
        : "Atleast 1 developer needs to be selected";
    temp.scrumMasterName =
      product.scrumMasterName.length !== 0
        ? ""
        : "SCRUM Master name is required";
    setErrors({ ...temp });
    return Object.values(temp).every((value) => value.length === 0);
  };

  return (
    <Container>
      <Typography variant="h4">Edit Product</Typography>
      <FormControl>
        <TextField
          label="Product Name"
          variant="standard"
          error={errors.productName}
          helperText={errors.productName}
          onChange={(e) => onValueChange(e)}
          name="productName"
          value={product.productName}
        />
      </FormControl>
      <FormControl>
        <TextField
          variant="standard"
          error={errors.productOwnerName}
          helperText={errors.productOwnerName}
          label="Product Owner Name"
          onChange={(e) => onValueChange(e)}
          name="productOwnerName"
          value={product.productOwnerName}
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
          value={product.scrumMasterName}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Start Date</InputLabel>
        <Input disabled defaultValue={getDateValue(product.startDate)} />
      </FormControl>
      <FormControl>
        <FormLabel component="legend">Methodology</FormLabel>
        <RadioGroup
          row
          aria-label="methodology"
          name="methodology"
          value={product.methodology}
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
          Save Changes
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Save The Changes</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please confirm if you want to save the changes?
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

export default EditProduct;
