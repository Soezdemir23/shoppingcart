import React from "react";
import { ShoppingPageProps } from "../eventsInterface";
import Footer from "../Footer";
import Header from "../Header";

export default function ShoppingPage({onClick}: ShoppingPageProps)   {
    return (
        <>
        <Header />
        <h1>Shopping Page</h1>
        <Footer />
        </>

    )
}