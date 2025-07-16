import React, { useEffect, useRef, useState } from "react";
import { emphasize, styled } from "@mui/material";
import { Breadcrumbs, Chip } from "@mui/material";
import { MdHome } from "react-icons/md";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import { editdata, fetchDataFromApi, postData } from "../../utils/api";
import { Link, useNavigate, useParams } from "react-router-dom";


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        }
    };
});



const ProductEdit = () => {

    const [categoryValue, setCategoryValue] = useState('');
     const [product ,setProduct] = useState([])
    const [productSizevalue, setproductSizevalue] = useState([]);
     const [productImgArr , setproductImgArr]  = useState([])
const [fromFields, setFromFields] = useState({
   name:'',
        description:'',
        catName:'',
        brand:'',
        countInStock:0,
        price:0,
        Oldprice:0,
        discount:'',
        productSize:'',
        rating:0,
        images:[]        
});

let{id} = useParams();
            useEffect(()=>{
                window.scrollTo(0,0);
                const arr=[];
             fetchDataFromApi(`/products/${id}`).then((res)=>{
                setProduct(res)
                    setFromFields({
                        name:res.name,
                        description:res.description,
                        brand:res.brand,
                        countInStock:res.countInStock,
                        price:res.price,
                        Oldprice:res.Oldprice,
                        rating:res.rating,
                        images:res.images,
                        discount:res.discount,
                        productSize:res.productSize,
                        catName:res.catName
                    })
                    setRatingValue(res.rating)
                    setCategoryValue(res.catName)
                    setproductImgArr(res.images)
                    setproductSizevalue(res.productSize)
                })

            },[])


  
  const editProduct = (e)=>{
    e.preventDefault();

    const updatefields = {
        ...fromFields,
       images: productImgArr 
    };
    editdata(`/products/${id}`, updatefields).then((res) => {
        console.log(res);
        alert("Product updated successfully!");
    });
  }

  const navigate = useNavigate();
  
   const handleClick = () => {
      setTimeout(() => {
        navigate("/products");
      }, 3000);
    };

       const Imges =[];
       const productImg = useRef();
       const [ratingValue, setRatingValue] = useState(2);

    const handleChangecategory = (event) => {
  setCategoryValue(event.target.value);
     setFromFields(()=>({
                    ...fromFields,
                   catName:event.target.value
                }))
};

     const handleChangeproductSizeValue = (event) => {
        setproductSizevalue(event.target.value);
         setFromFields(()=>({
                    ...fromFields,
                   productSize:event.target.value
                }))
    };

     const addproductimage = () => {
    setproductImgArr(prevArray =>[...prevArray , productImg.current.value])
    productImg.current.value = ""
};

    const inputchange=(e)=>{
       setFromFields(()=>({
                    ...fromFields,
                    [e.target.name]:e.target.value
                }))
    }

    return (
        <>
            <div className="right-content w-100 mt-2">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-0">Product Upload</h5>
                    <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Dashboard"
                            icon={<MdHome fontSize="small" />}
                        />
                        <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Products"
                        />
                        <StyledBreadcrumb
                            label="Product Edit"
                        />
                    </Breadcrumbs>
                </div>

                <form className="form"  onSubmit={editProduct}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card p-4">
                                <h5 className="mb-4">Basic Information</h5>
                                <div className="form-group">
                                    <h6>PRODUCT NAME</h6>
                                    <input type="text" placeholder="type here" name="name" onChange={inputchange} value={fromFields?.name} required/>
                                </div>
                                <div className="form-group">
                                    <h6>DESCRIPTION</h6>
                                    <textarea placeholder="type here..." rows={10} cols={10}  name="description" onChange={inputchange} value={fromFields?.description} required/>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>CATEGORY</h6>
                                            <Select
                                                value={categoryValue}
                                                onChange={handleChangecategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'Men'}>Men</MenuItem>
                                                <MenuItem value={'Women'}>Women</MenuItem>
                                                <MenuItem value={'Kids'}>Kids</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                             <div className="form-group">
                                            <h6>BRAND</h6>
                                            <input type="text" name="brand" value={fromFields.brand} onChange={inputchange} required/>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                              <h6>COUNT IN STOCK </h6>
                                            <input type="text" name="countInStock" value={fromFields.countInStock} onChange={inputchange} required/>
                                        
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                      <div className="col">
                                        <div className="form-group">
                                               <h6>PRICE </h6>
                                            <input type="text" name="price" value={fromFields.price}  onChange={inputchange} required/>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                              <h6>OLD PRICE</h6>
                                            <input type="text" name="Oldprice" value={fromFields.Oldprice} onChange={inputchange} required/>
                                        </div>
                                    </div>
                                      <div className="col">
                                        <div className="form-group">
                                                  <h6>discount</h6>
                                                 <input type="text" name="discount" value={fromFields.discount} onChange={inputchange} required/>
                                        </div>
                                    </div>
                                </div>

                                 <div className="row">    
                                     <div className="col">
                                        <div className="form-group">
                                                 <h6>product Size</h6>
                                            <Select
                                                value={productSizevalue}
                                                onChange={handleChangeproductSizeValue}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className="w-100"
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'S'}>S</MenuItem>
                                                <MenuItem value={'M'}>M</MenuItem>
                                                <MenuItem value={'L'}>L</MenuItem>
                                                <MenuItem value={'XL'}>XL</MenuItem>
                                                <MenuItem value={'XXL'}>XXL</MenuItem>
                                                <MenuItem value={'All Size'}>All Size</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                      <div className="col">
                                        <div className="form-group">
                                                  <h6>RATINGS</h6>
                                            <Rating
                                                name="simple-controlled"
                                                id="rat"
                                                value={ratingValue}
                                                onChange={(event, newValue) => {
                                                    setRatingValue(newValue); 
                                                      setFromFields(()=>({
                                                    ...fromFields,
                                                rating:newValue
                                                })) 
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <h6>PRODUCT IMAGES</h6>
                                            <div className="position-relative inputbtn">
                                            <input type="text" ref={productImg} name="images" onChange={inputchange}/>
                                            <Button className="btn-blue" onClick={addproductimage}>ADD</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                             <div className="card p-4 mt-0">
                                <div className="images-upload-section">
                                    <h5 className="mb-4">PRODUCT IMAGES</h5>
                                    <div className="img-upload-box d-flex flex-wrap gap-3" id="imgGrid">
                                                {
                                                    productImgArr?.map((image,index)=>{
                                                        return(
                                                            <div className="img" key={index}>
                                                                <img src={image} alt="images" className="w-100"/>
                                                            </div>
                                                        )
                                                    })
                                                }
                                    </div>
                                </div>
                           <Button className="btn-blue btn-big btn-lg w-100 mb-4 mt-4" type="submit"  onClick={handleClick}><FaCloudUploadAlt /> &nbsp; PUBLISH AND VIEW</Button>
                                
                            </div>
 
                        </div>
                    </div>
                </form>

            </div>
        </>
    )
}

export default ProductEdit;

