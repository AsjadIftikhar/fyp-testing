import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Breadcrumb from "./components/breadcrumb";

import Products from "./components/products";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Register from "./components/register";
import ProfileComponent from "./components/profile";
import {create_product, delete_product, get_products, update_product} from "./services/productServices";
import ProtectedRoute from "./components/commons/ProtectedRoute";
import {get_me} from "./services/userServices";


class App extends Component {
    state = {
        products: [],
        store: [],
        isLoading: true,
    };


    async componentDidMount() {
        let {data: products} = await get_products()
        let {data: store} = await get_me()

        console.log(store)
        this.setState({products, store, isLoading: false})

    }


    handleDelete = async (id) => {
        await delete_product(id)

        const products = this.state.products.filter(p => p.id !== id)
        this.setState({products})

    };

    handleAddProduct = async (product) => {
        const response = await create_product(product)

        const products = this.state.products;
        products.push(response.data)
        this.setState({products})
    };

    handleEditProduct = async (product) => {
        let products = this.state.products;
        await update_product(product)

        // Find index of specific object using findIndex method.
        const product_index = products.findIndex((p => p.sku === product.sku));

        // Update object
        products[product_index] = product

        // Save
        this.setState({products})
    };

    render() {
        return (
            <div className="relative min-h-screen md:flex">

                <Routes>
                    <Route exact path='/' element={<ProtectedRoute/>}>

                        <Route path="/products"
                               element={
                                   <>
                                       <Sidebar products_count={this.state.products.length}/>
                                       <div className="flex-1 px-6">
                                           <Navbar store={this.state.store}/>
                                           <Breadcrumb title={`${this.state.store['brand_name']} - Products`}
                                                       dir="Products"/>
                                           <Products onDelete={this.handleDelete}
                                                     onAdd={this.handleAddProduct}
                                                     onEdit={this.handleEditProduct}
                                                     products={this.state.products}
                                                     isLoading={this.state.isLoading}/>
                                           <Footer/>
                                       </div>
                                   </>
                               }/>
                        <Route path="/dashboard"
                               element={
                                   <>
                                       <Sidebar products_count={this.state.products.length}/>
                                       <div className="flex-1 px-6">
                                           <Navbar store={this.state.store}/>
                                           <Breadcrumb title="Dashboard"
                                                       dir="Dashboard"/>
                                           <Dashboard/>
                                           <Footer/>
                                       </div>
                                   </>
                               }/>
                        <Route path="/me"
                               element={
                                   <>
                                       <Sidebar products_count={this.state.products.length}/>
                                       <div className="flex-1 px-6">
                                           <Navbar store={this.state.store}/>
                                           <Breadcrumb title="My Store"
                                                       dir="Profile Setup"/>
                                           <ProfileComponent store={this.state.store}/>
                                           <Footer/>
                                       </div>
                                   </>
                               }/>
                        <Route exact path="/"
                               element={
                                   <>
                                       <Sidebar products_count={this.state.products.length}/>
                                       <div className="flex-1 px-6">
                                           <Navbar store={this.state.store}/>
                                           <Breadcrumb title={`${this.state.store['brand_name']} - Home`}
                                                       dir="Home"/>
                                           <Products onDelete={this.handleDelete}
                                                     onAdd={this.handleAddProduct}
                                                     onEdit={this.handleEditProduct}
                                                     products={this.state.products}
                                                     isLoading={this.state.isLoading}
                                           />
                                           <Footer/>
                                       </div>
                                   </>
                               }/>
                    </Route>

                    {/*WithOut Authentication:*/}

                    <Route path="/login"
                           element={
                               <>
                                   <div className="flex-1 px-6">
                                       <Login/>
                                   </div>
                               </>
                           }/>
                    <Route path="/register"
                           element={
                               <>
                                   <div className="flex-1 px-6">
                                       <Register/>
                                   </div>
                               </>
                           }/>

                </Routes>
            </div>
        );
    }
}

export default App;
