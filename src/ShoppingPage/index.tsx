import React from "react";
import { AllProps } from "../eventsInterface";
import Footer from "../Footer";
import Header from "../Header";

export default function ShoppingPage({onClick, shoppingCart}: AllProps)   {
    return (
        <>
        <Header shoppingCart={shoppingCart} />
        <h1>Shopping Page</h1>
        <Footer />
        </>

    )
}