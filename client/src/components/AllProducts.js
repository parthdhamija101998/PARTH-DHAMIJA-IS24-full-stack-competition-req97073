import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Grid,
} from "@mui/material";

import { Link } from "react-router-dom";

import { getProducts, deleteProduct } from "../service/api";

const GridContainer = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Container = styled(TextField)`
  width: 20%;
  margin: 10px 20px 0 20px;
`;

const Total = styled(Typography)`
  justifycontent: center;
  margin: 30px 0 0 20px;
`;

const StyledTable = styled(Table)`
  width: 90%;
  margin: 30px auto 0 auto;
`;
const THead = styled(TableRow)`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: black;
  & > th {
    color: white;
    font-size: 15px;
  }
`;
const TBody = styled(TableRow)`
  & > td {
    font-size: 14px;
  }
`;
let pId = "";

const AllProducts = () => {
  const [queryDev, setQueryDev] = useState("");
  const [queryScrum, setQueryScrum] = useState("");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    let response = await getProducts();
    setProducts(response.data);
  };

  /**
   * @param {*} productId
   * @returns Deletes the product
   */
  const deleteProductId = async (productId) => {
    await deleteProduct(productId);
    getAllProducts();
  };

  const handleClick = (productId) => {
    setOpen(true);
    pId = productId;
  };

  const handleConfirm = () => {
    deleteProductId(pId);
    setOpen(false);
  };

  const handleDevFilterChange = (event) => {
    setQueryDev(event.target.value);
  };

  const handleScrumFilterChange = (event) => {
    setQueryScrum(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    // Filter by Developer
    const devCheck =
      queryDev === "" ||
      product.developers.some((developer) =>
        developer.toLowerCase().includes(queryDev.toLowerCase())
      );

    // Filter by SCRUM Master
    const scrumCheck =
      queryScrum === "" ||
      product.scrumMasterName.toLowerCase().includes(queryScrum.toLowerCase());

    // If row passes both filters, return true
    const filterCheck = devCheck && scrumCheck;

    return filterCheck;
  });

  return (
    <div>
      <GridContainer>
        <Container
          id="searchDeveloper"
          label="Search by Developers Name"
          variant="standard"
          onChange={(e) => handleDevFilterChange(e)}
        />
        <Container
          id="searchScrumMaster"
          label="Search by SCRUM Master's Name"
          variant="standard"
          onChange={(e) => handleScrumFilterChange(e)}
        />
        <Total variant="h6">
          Products Being Displayed = {filteredProducts.length}
        </Total>
      </GridContainer>
      <StyledTable>
        <TableHead>
          <THead>
            <TableCell>Product ID</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Product Owner Name</TableCell>
            <TableCell>Developers</TableCell>
            <TableCell>SCRUM Master Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Methodology</TableCell>
            <TableCell></TableCell>
          </THead>
        </TableHead>
        <TableBody>
          {filteredProducts.map((product) => (
            <TBody key={product.productId}>
              <TableCell> {product.productId} </TableCell>
              <TableCell> {product.productName} </TableCell>
              <TableCell> {product.productOwnerName} </TableCell>
              <TableCell>
                {product.developers?.map((developer) => (
                  <span key={developer}>
                    {developer}
                    <br />
                  </span>
                ))}
              </TableCell>
              <TableCell> {product.scrumMasterName} </TableCell>
              <TableCell>
                {new Date(product.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell> {product.methodology} </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  style={{ marginRight: 10 }}
                  component={Link}
                  to={`/product/${product.productId}`}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    handleClick(product.productId);
                  }}
                >
                  Delete
                </Button>
                <Dialog open={open} onClose={() => setOpen(false)}>
                  <DialogTitle>Delete Item?</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to delete this item?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="secondary" autoFocus>
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
            </TBody>
          ))}
        </TableBody>
      </StyledTable>
    </div>
  );
};

export default AllProducts;
