/*import React from 'react';
import { render,fireEvent, screen } from '@testing-library/react';
import ShoppingCartMenu from "./ShoppingCartMenu";
import { ShoppingCart } from './eventsInterface';


let testArray: ShoppingCart[] = [
    {
        name: "Homerun Slammers vs Mokka Sippers",
        id: "ppsmwes",
        maxReached: false,
        maxTickets: 9,
        numOfReservedTickets: 2,
        image: "https://media.bizj.us/view/img/11195295/plazaviewvideoboard*1200xx6000-3375-0-312.jpg"
    } ,{
        name: "Homerun Slammers vs Mokka Sippers",
        id: "ppsmwes",
        maxReached: false,
        maxTickets: 9,
        numOfReservedTickets: 2,
        image: "https://media.bizj.us/view/img/11195295/plazaviewvideoboard*1200xx6000-3375-0-312.jpg"
    } ,{
        name: "Homerun Slammers vs Mokka Sippers",
        id: "ppswes",
        maxReached: false,
        maxTickets: 9,
        numOfReservedTickets: 2,
        image: "https://media.bizj.us/view/img/11195295/plazaviewvideoboard*1200xx6000-3375-0-312.jpg"
    } 
]

describe('ShoppingCartMenu is working according to expectations?', () => {
    it('should render the button to checkout', () => {
        render(<ShoppingCartMenu  shoppingCart={testArray} popUpDrawer={false} />);
        const button = screen.getByText("Checkout")    
        expect(button).toBeInTheDocument();
    });
    it('should render the button to empty the cart', () => {
        render(<ShoppingCartMenu shoppingCart={testArray} popUpDrawer={false} />);
        const button = screen.getByTitle('Empty Cart');
        expect(button).toBeInTheDocument();
    });

    it('should render the card with the title, picture and small menu', () => {
        render(<ShoppingCartMenu shoppingCart={testArray} popUpDrawer={false} />);
        const title = screen.getByTitle("Title");
        const picture = screen.getByTitle("Event Picture");
        const input = screen.getByTitle("Input Text");
        expect(title).toBeInTheDocument();
        expect(picture).toBeInTheDocument();
        expect(input).toBeInTheDocument();
    });

    it('should render the remove product button', () => {
        render(<ShoppingCartMenu shoppingCart={testArray} popUpDrawer={false} />);
        const button = screen.getByText("Remove Product");
        expect(button).toBeInTheDocument();
    })

    it('should increase the input text value when the plus button is clicked', () => {
        render(<ShoppingCartMenu shoppingCart={testArray} popUpDrawer={false} />);
        const plusButton = screen.getByText('+');
        fireEvent.click(plusButton);
        const input: HTMLInputElement = screen.getByText('Input Text');
        expect(input.value).toBe("1")
    })

    it('should be decreasing the input text value when the minus button is clicked', () => {
        render(<ShoppingCartMenu shoppingCart={testArray} popUpDrawer={false} />);
        const minusButton = screen.getByText('-');
        fireEvent.click(minusButton);
        const input: HTMLInputElement = screen.getByText('Input Text');
        expect(input.value).toBe('-1')
    })

    it('should remove the product when the remove product button is clicked', () => {
        render(<ShoppingCartMenu shoppingCart={testArray} popUpDrawer={false} />);
        const removeButton = screen.getByText('Remove Product');
        fireEvent.click(removeButton);
        const card = screen.getByTitle('Title')
        expect(card).not.toBeInTheDocument();
    })

    it('should remove all children of products from the shoppinggcart', () => {
        render(<ShoppingCartMenu shoppingCart={testArray} popUpDrawer={false} />);
        const emptyButton = screen.getByTitle("Empty Cart");
        fireEvent.click(emptyButton);
        const childrenContainer = screen.getByTitle("children");
        expect(childrenContainer).toBeEmptyDOMElement();
    })

    
})*/

export {};