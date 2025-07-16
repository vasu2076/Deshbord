import React, { useContext, useEffect, useState } from "react";
import DashboardBox from "../DashboardCard/DashboardBox";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoIosTimer } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { Chart } from "react-google-charts";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { mycontext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
    const [productList,setproductList] = useState([])
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const data = [
    ["Task", "Hours per Day"],
    ["2023", 8],
    ["2024", 8],
    ["2025", productList.length],
  ];

  const options = {
    backgroundColor: "transparent",
    chartArea: { width: "100%", height: "100%" },
  };

  const [showBy, setShowBy] = useState("");
  const [catBy, setCatBy] = useState("");
  const context = useContext(mycontext);

    useEffect(()=>{
        context.setIsHideSidebarAndHeader(false)
        fetchDataFromApi('/products').then((res)=>{
                setproductList(res)
            })
        window.scrollTo(0,0);
    },[]);

    const Deleteproduct = (_id)=> [
      deleteData(`/products/${_id}`).then((res)=>{
        fetchDataFromApi('/products').then((res)=>{
          setproductList(res)
        })
      })
    ]

  return (
    <>
      <div className="right-content w-100">
        <div className="row dashboard-box-wrapper-row">
          <div className="col-md-8">
            <div className="dashboard-box-wrapper d-flex">
              <DashboardBox
                color={["#1da256", "#48d483"]}
                icon={<FaUserCircle />}
                grow={true}
                count={productList.length}
              />
              <DashboardBox
                color={["#c012e2", "#eb64fe"]}
                icon={<IoMdCart />}
                count={productList.length}
              />
              <DashboardBox
                color={["#2c78e5", "#60aff5"]}
                icon={<MdShoppingBag />}
                count={productList.length}
              />
              <DashboardBox
                color={["#e1950e", "#f3cd29"]}
                icon={<GiStarsStack />}
                 count={productList.length}
                grow={true}
              />
            </div>
          </div>
          
          <div className="col-md-4 pl-0 top-part2">
            <div className="box grapg-box">
              <div className="d-flex align-items-center w-100 bottom-ele">
                <h6 className="text-white mb-0 mt-0">Total Sales</h6>
                <div className="ml-auto">
                  <span className="ml-auto toggle-icons" onClick={handleClick}>
                    <HiDotsVertical />
                  </span>
                  <Menu
                    className="dropdown-menus"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      },
                    }}>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Day
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Week
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Month
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Year
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              <h3 className="text-white font-weight-bold">$3,787,681.00</h3>
              <p>$3,578.90 in last month</p>
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height="200px"
              />
            </div>
          </div>

        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="headign-text">Best selling Products</h3>
          <div className="row card-filters mt-3">
            <div className="col-md-3">
              <h4>SHOW BY</h4>
              <FormControl className="w-100" size="small">
                <Select
                  value={showBy}
                  onChange={(e) => setShowBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  labelId="demo-select-small-label"
                  className="w-100">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>CATEGORY BY</h4>
              <FormControl className="w-100" size="small">
                <Select
                  value={catBy}
                  onChange={(e) => setCatBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Rating</th>
                  <th>size</th>
                 <th>Action</th>
                </tr>
              </thead>
                 <tbody>
                                {
                                    productList?.length!==0 && productList?.map((item,index)=>{
                                        return(
                                             <tr>
                                    <td>{index + 1}</td>
                                    <td> 
                                        <div className="d-flex align-items-center product-box">
                                            <div className="img-wrapper">
                                                <div className="img">
                                                    <img src={item.images[0]}alt="skirt" className="w-100" />
                                                </div>
                                            </div>
                                            <div className="info pl-0">
                                                <h6>{item.name}</h6>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.catName}</td>
                                    <td>{item.brand}</td>
                                    <td> 
                                        <del className="old-price text-danger">RS {item.Oldprice}</del>
                                        <span className="new-price ">RS {item.price}</span>
                                    </td>
                                    <td>{item.countInStock}</td>
                                    <td><Rating name="size-medium"  value={item.rating}readOnly /></td>
                                    <td>{item.productSize}</td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to={`/products/details/${item._id}`} key={item._id}>
                                                <Button className="secondary" color="secondary"><FaEye /></Button>
                                            </Link>
                                          <Link to={`/products/edit/${item._id}`} key={item._id}>
                                                <Button className="success" color="success"><FaPencilAlt /></Button>
                                          </Link>
                                            <Button className="error" color="error" onClick={()=>Deleteproduct(item._id)}><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>
                                        )
                               
                                    })
                                }
                               </tbody>
            </table>
            <div className="d-flex table-footer">
              <p>
                showing <b>1</b> of <b>10</b> results
              </p>
              <Pagination
                count={10}
                color="primary"
                className="paginations"
                showFirstButton
                showLastButton
              />
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
