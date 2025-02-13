import React from "react"
import { Route, Routes } from "react-router"

import Allproduct from "../AdminComponents/product/Allproduct";
import AdminProductDetaills from "../AdminComponents/product/adminProductDetaills";
import UpdateProduct from "../AdminComponents/product/adminUpdateProduct";
import Adminsidebar from "../AdminComponents/slidebar/adminsidebar";
import AdminaddProduct from "../AdminComponents/product/adminaddProduct";
import Getallcatogory from "../AdminComponents/catogory/getallcatogory";
import Addcatogory from "../AdminComponents/catogory/addcatogory";
import Editcategories from "../AdminComponents/catogory/editcategories";
import Allorder from "../AdminComponents/Order/allorder";
import Orderdetails from "../AdminComponents/Order/orderdetails";
import Admindasboard from "../AdminComponents/dasboard/admindasboard";
import OfferPage from "../AdminComponents/email/OfferTemplate";
import GetallCoupan from "../AdminComponents/Coupan/coupanallcatogory";
import AddCoupan from "../AdminComponents/Coupan/coupanCreate";
import EditCoupan from "../AdminComponents/Coupan/coupanUpdate";
import CouponDetails from "../AdminComponents/Coupan/couapndetails";
import AllUser from "../AdminComponents/User/allUser";
import SubscribeUser from "../AdminComponents/User/subscribeUser";
import BannerManagement from "../AdminComponents/Offer/Banner";
import AddBanner from "../AdminComponents/Offer/AddBanner";
import AddEditBanner from "../AdminComponents/Offer/EditBanner";
import AllExistOfferBanner from "../AdminComponents/Offer/existOfferBanner/Banner";
import AddExistOfferBanner from "../AdminComponents/Offer/existOfferBanner/AddBanner";
import EditExistOfferBanner from "../AdminComponents/Offer/existOfferBanner/EditBanner";

function Admin() {
	return (
		<div className="main_admin_pages">
			<div className="admin_page_sidebar_div">
				<Adminsidebar />
			</div>
			<div className="admin_page_main_div">
				<Routes>
					<Route
						path="/sidebar"
						element={<Adminsidebar />}
					/>
					{/* products */}
					<Route
						path="/allproducts"
						element={<Allproduct />}
					/>
					<Route
						path="/add-product"
						element={<AdminaddProduct />}
					/>
					<Route
						path="/product-details/:productId"
						element={<AdminProductDetaills />}
					/>
					<Route
						path="/product-update/:productId"
						element={<UpdateProduct />}
					/>

					{/* category */}
					<Route
						path="/all-categories"
						element={<Getallcatogory />}
					/>
					<Route
						path="/add-category"
						element={<Addcatogory />}
					/>
					<Route
						path="/category-update/:Id"
						element={<Editcategories />}
					/>

					{/* orders */}
					<Route
						path="/all-orders"
						element={<Allorder />}
					/>
					<Route
						path="/order/:id"
						element={<Orderdetails />}
					/>
			{/* coupan */}
					<Route path="/All-coupan" element={<GetallCoupan />} />
					<Route path="/add-coupan" element={<AddCoupan />} />
					<Route path="/update-coupan/:Id" element={<EditCoupan />} />
					<Route path="/coupan-details/:Id" element={<CouponDetails />} />
					{/*           

				{/* admin */}
					<Route
						path="/admin-dashboard"
						element={<Admindasboard />}
					/>

					{/* email send */}
					<Route
						path="/send-email"
						element={<OfferPage />}
					/>

					{/* user */}
					<Route
					path="/all-user"
					element={<AllUser/>}
					/>
					<Route
					path="/subscribe-user"
					element={<SubscribeUser/>}
					/>


						{/* offer */}
						<Route path="/offer-banner" element={<BannerManagement />} />
						<Route  path ="/add-banner" element={<AddBanner />} />
						<Route path='/edit-banner/:bannerId' element={<AddEditBanner/>} />

							{/* existing offer */}
							<Route path="/exist-offer-banner" element={<AllExistOfferBanner />} />
							<Route path="/add-existing-banner" element={<AddExistOfferBanner />} />
							<Route path='/edit-existing-banner/:bannerId' element={<EditExistOfferBanner/>} />
				</Routes>
			</div>
		</div>
	)
}

export default Admin
