import React, { useEffect, useRef, useState } from "react";
import { emphasize, styled } from "@mui/material";
import { Breadcrumbs, Chip } from "@mui/material";
import { MdHome } from "react-icons/md";
import Slider from "react-slick";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import DescriptionIcon from '@mui/icons-material/Description';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { PiResizeFill } from "react-icons/pi";
import { IoMdPricetags } from "react-icons/io";
import { GoStarFill } from "react-icons/go";
import StarIcon from '@mui/icons-material/Star';
import UserImg from "../../components/UserImg/UserImg";
import user from "../../assets/images/user.png";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaReply } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";

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

const ProductDetailsid = () => {
    const productSliderBig = useRef();
    const productSliderSmall = useRef();

    var productSliderOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    var productSliderSmlOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false
    };

    const goToSlider=(index)=>{
        productSliderBig.current.slickGoTo(index);
        productSliderSmall.current.slickGoTo(index);
    }
     const {id} = useParams();
    const [productdata,setproductdata] = useState()
    useEffect(()=>{
       
         fetchDataFromApi(`/products/${id}`).then((res)=>{
                setproductdata(res)
              })
    })
    
    return (
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 res-col">
                    <h5 className="mb-0">Product View</h5>
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
                            label="Product View"
                        />
                    </Breadcrumbs>
                </div>

                <div className="card product-details-section ">
                    <div className="row product-de">
                      <div className="col-md-5">
                    <div className="slider-wrapper pt-3 pb-3 pl-5 pr-3">
                        <h6 className="mb-4">Product Gallery</h6>

                        <Slider {...productSliderOptions} ref={productSliderBig} className="slider-big mb-2">
                        {productdata?.images?.map((img, index) => (
                            <div className="item" key={index}>
                            <img src={img}  className="w-100" />
                            </div>
                        ))}
                        </Slider>

                        <Slider {...productSliderSmlOptions} ref={productSliderSmall} className="slider-small">
                        {productdata?.images?.map((img, index) => (
                            <div
                            className="item"
                            key={index}
                            onClick={() => goToSlider(index)}
                            >
                            <img src={img}  className="w-100" />
                            </div>
                        ))}
                        </Slider>
                    </div>
                    </div>
                        <div className="col-md-7">
                            <div className="pt-3 pb-3 pl-3 pr-3">
                                <h6 className="mb-4">Product Details</h6>
                                <h4>{productdata?.name}</h4>
                                <div className="product-info mt-4">
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icons"><MdBrandingWatermark /></span>
                                            <span className="name">Brand</span>
                                        </div>
                                        <div className="col-sm-9">
                                            <span>{productdata?.brand}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icons"><BiSolidCategoryAlt /></span>
                                            <span className="name">Category</span>
                                        </div>
                                        <div className="col-sm-9">
                                            <span>{productdata?.catName}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icons"><Inventory2Icon /></span>
                                            <span className="name">count In Stock</span>
                                        </div>
                                        <div className="col-sm-9">
                                            <span>{productdata?.countInStock}</span>
                                        </div>
                                    </div>
                                       <div className="row">
                                            <div className="col-sm-3 d-flex align-items-center">
                                                <span className="icons"><IoMdPricetags /></span>
                                                <span className="name">Price</span>
                                            </div>
                                            <div className="col-sm-9">
                                                <span>RS {productdata?.price} &nbsp; <del className="text-danger">RS {productdata?.Oldprice}</del> </span>
                                            </div>
                                        </div>
                                         <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icons"><PiResizeFill /></span>
                                            <span className="name">product Size</span>
                                        </div>
                                        <div className="col-sm-9">
                                            <span>{productdata?.productSize}</span>
                                        </div>
                                    </div>
                                      <div className="row">
                                    <div className="col-sm-3 d-flex ">
                                        <span className="icons"><StarIcon /></span>
                                        <span className="name">Rating</span>
                                    </div>
                                    <div className="col-sm-8">
                                        <span>
                                        <Rating name="size-medium"  value={Number(productdata?.rating) || 0} readOnly />
                                        </span>
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3 d-flex align-items-center">
                                            <span className="icons"><DescriptionIcon /></span>
                                            <span className="name">description</span>
                                        </div>
                                        <div className="col-sm-8 ml-5">
                                            <span>{productdata?.description}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <h6 className="mt-4 mb-4">Rating Analytics</h6>
                        <div className="rating-section">
                            <div className="rating-row d-flex align-items-center">
                                <span className="col1">5 Star</span>
                                <div className="col2">
                                    <div className="progress">
                                        <div className="progress-bar" style={{width: '70%'}}></div>
                                    </div>
                                </div>
                                <div className="col3"> <span>(22)</span></div>
                            </div>
                            <div className="rating-row d-flex align-items-center">
                                <span className="col1">4 Star</span>
                                <div className="col2">
                                    <div className="progress">
                                        <div className="progress-bar" style={{width: '60%'}}></div>
                                    </div>
                                </div>
                                <div className="col3"> <span>(15)</span></div>
                            </div>
                            <div className="rating-row d-flex align-items-center">
                                <span className="col1">3 Star</span>
                                <div className="col2">
                                    <div className="progress">
                                        <div className="progress-bar" style={{width: '50%'}}></div>
                                    </div>
                                </div>
                                <div className="col3"> <span>(11)</span></div>
                            </div>
                            <div className="rating-row d-flex align-items-center">
                                <span className="col1">2 Star</span>
                                <div className="col2">
                                    <div className="progress">
                                        <div className="progress-bar" style={{width: '40%'}}></div>
                                    </div>
                                </div>
                                <div className="col3"> <span>(5)</span></div>
                            </div>
                            <div className="rating-row d-flex align-items-center">
                                <span className="col1">1 Star</span>
                                <div className="col2">
                                    <div className="progress">
                                        <div className="progress-bar" style={{width: '32%'}}></div>
                                    </div>
                                </div>
                                <div className="col3"> <span>(7)</span></div>
                            </div>
                        </div>

                        <br />
                        <h6 className="mt-4 mb-4">Customer Reviews</h6>
                        <div className="reviews-section">
                            <div className="reviews-row">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <div className="d-flex flex-column">
                                            <div className="user-info d-flex align-items-center mb-3">
                                                <UserImg img={user} lg={true} />
                                                <div className="info pl-3 pt-2">
                                                    <h6>&nbsp; Miron Mahmud</h6>
                                                    <span>&nbsp; 3 days ago!</span>
                                                </div>
                                            </div>
                                            <Rating name="read-only" id="rat" value={5.0}  precision={0.5} readOnly   /> 
                                        </div>     
                                    </div>
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <Button className="btn-big btn-blue ml-auto"><FaReply /> &nbsp; Reply</Button> 
                                    </div>
                                    <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore 
                                        fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, 
                                        adipisci natus quod magni omnis quas.</p>
                                </div>
                            </div>

                            <div className="reviews-row reply">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <div className="d-flex flex-column">
                                            <div className="user-info d-flex align-items-center mb-3">
                                                <UserImg img={user} lg={true} />
                                                <div className="info pl-3 pt-2">
                                                    <h6>&nbsp; Miron Mahmud</h6>
                                                    <span>&nbsp; 3 hours ago!</span>
                                                </div>
                                            </div>
                                            <Rating name="read-only" id="rat" value={2.5}  precision={0.5} readOnly   /> 
                                        </div>     
                                    </div>
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <Button className="btn-big btn-blue ml-auto"><FaReply /> &nbsp; Reply</Button> 
                                    </div>
                                    <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore 
                                        fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, 
                                        adipisci natus quod magni omnis quas.</p>
                                </div>
                            </div>

                            <div className="reviews-row reply">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <div className="d-flex flex-column">
                                            <div className="user-info d-flex align-items-center mb-3">
                                                <UserImg img={user} lg={true} />
                                                <div className="info pl-3 pt-2">
                                                    <h6>&nbsp; Miron Mahmud</h6>
                                                    <span>&nbsp; 2 days ago!</span>
                                                </div>
                                            </div>
                                            <Rating name="read-only" id="rat" value={3.5}  precision={0.5} readOnly   /> 
                                        </div>     
                                    </div>
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <Button className="btn-big btn-blue ml-auto"><FaReply /> &nbsp; Reply</Button> 
                                    </div>
                                    <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore 
                                        fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, 
                                        adipisci natus quod magni omnis quas.</p>
                                </div>
                            </div>

                            <div className="reviews-row">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <div className="d-flex flex-column">
                                            <div className="user-info d-flex align-items-center mb-3">
                                                <UserImg img={user} lg={true} />
                                                <div className="info pl-3 pt-2">
                                                    <h6>&nbsp; Miron Mahmud</h6>
                                                    <span>&nbsp; 5 days ago!</span>
                                                </div>
                                            </div>
                                            <Rating name="read-only" id="rat" value={4.0}  precision={0.5} readOnly   /> 
                                        </div>     
                                    </div>
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <Button className="btn-big btn-blue ml-auto"><FaReply /> &nbsp; Reply</Button> 
                                    </div>
                                    <p className="mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore 
                                        fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, 
                                        adipisci natus quod magni omnis quas.</p>
                                </div>
                            </div> 
                        </div>

                        <br />
                        <h6 className="mt-4 mb-4">Review Reply Form</h6>
                        <form className="review-form">
                            <textarea placeholder="Write here">
                            </textarea>
                            <Button className="btn-blue btn-big btn-lg w-100 mt-4"> Drop your Replies</Button>
                        </form>
                    </div>
                </div>
            </div>     
        </>
    )
}

export default ProductDetailsid;
