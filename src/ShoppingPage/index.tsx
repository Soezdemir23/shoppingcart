import React from "react";
import { AllProps, ShoppingCart } from "../eventsInterface";
import Footer from "../Footer";
import Header from "../Header";

export default function ShoppingPage(props: {
    shoppingCart: ShoppingCart[];
    onIncrementClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onDecrementClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
})   {
    const { shoppingCart, onIncrementClick, onDecrementClick} = props;
    return (
        <>
        <Header shoppingCart={shoppingCart} onIncrementClick={onIncrementClick} onDecrementClick={onDecrementClick} />
        <h1>Shopping Page</h1>
        <Footer />
        </>

    )
}