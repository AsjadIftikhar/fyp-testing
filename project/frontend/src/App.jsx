import Navbar from "./components/navbar";
import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";
import Sidebar from "./components/sidebar";
import Products from "./components/products";
import Footer from "./components/footer";
import Breadcrumb from "./components/breadcrumb";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Register from "./components/register";
import ProfileComponent from "./components/profile";
import {create_product, delete_product, get_store_products} from "./services/productServices";


class App extends Component {
    state = {
        products: []
    };


    async componentDidMount() {
        const {data: products} = await get_store_products()
        console.log(products)
        this.setState({products})
    }


    handleDelete = async (id) => {
        await delete_product(id)

        const products = this.state.products.filter(p => p.id !== id)
        this.setState({products})

    };

    handleAddProduct = async (product) => {
        await create_product(product)

        const products = this.state.products;
        products.push(product)
        this.setState({products})
    };

    handleEditProduct = (product) => {
        const products = this.state.products;

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
                    <Route path="/products"
                           element={
                               <>
                                   <Sidebar products_count={this.state.products.length}/>
                                   <div className="flex-1 px-6">
                                       <Navbar/>
                                       <Breadcrumb title="All Products"
                                                   dir="Products"/>
                                       <Products onDelete={this.handleDelete}
                                                 onAdd={this.handleAddProduct}
                                                 onEdit={this.handleEditProduct}
                                                 products={this.state.products}/>
                                       <Footer/>
                                   </div>
                               </>
                           }/>
                    <Route path="/dashboard"
                           element={
                               <>
                                   <Sidebar products_count={this.state.products.length}/>
                                   <div className="flex-1 px-6">
                                       <Navbar/>
                                       <Breadcrumb title="Dashboard"
                                                   dir="Dashboard"/>
                                       <Dashboard/>
                                       <Footer/>
                                   </div>
                               </>
                           }/>
                    <Route path="/users"
                           element={
                               <>
                                   <Sidebar products_count={this.state.products.length}/>
                                   <div className="flex-1 px-6">
                                       <Navbar/>
                                       <Breadcrumb title="All Users"
                                                   dir="Users"/>
                                       <Dashboard/>
                                       <Footer/>
                                   </div>
                               </>
                           }/>
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
                    <Route path="/profile"
                           element={
                               <>
                                   <Sidebar products_count={this.state.products.length}/>
                                   <div className="flex-1 px-6">
                                       <Navbar/>
                                       <Breadcrumb title="My Store"
                                                   dir="Profile Setup"/>
                                       <ProfileComponent/>
                                       <Footer/>
                                   </div>
                               </>
                           }/>
                    <Route exact path="/"
                           element={
                               <>
                                   <Sidebar products_count={this.state.products.length}/>
                                   <div className="flex-1 px-6">
                                       <Navbar/>
                                       <Breadcrumb title="All Products"
                                                   dir="Products"/>
                                       <Products onDelete={this.handleDelete}
                                                 onAdd={this.handleAddProduct}
                                                 onEdit={this.handleEditProduct}
                                                 products={this.state.products}/>
                                       <Footer/>
                                   </div>
                               </>
                           }/>
                </Routes>
            </div>
        );
    }
}

export default App;
