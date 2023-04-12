# ShoppingCart

A simple very small shop by an api call to ticketmaster.
Focusing on the shoppingcart and the interactivity between the shopping cart and the site itself.

## Technologies used

+ React-router
+ React
+ Typescript
+ TailwindCSS

## Link to the deployed project

<https://Soezdemir23.github.io/shoppingcart>

## Problems I faced

+ find ways to quickly create interfaces or type the object [with quicktype](https://quicktype.io/)
  + Still had to refactor the interfaces and constrict the needs down to the basics of the webapplication.
+ Links to products page broke and had to fix it after new Ticketmaster updates
  + some properties were missing on the same objects, necessitation fallbacks and avoid magic values.
+ Header is not really responsive.
  + First suspicion might be that due to the nature of CRA we used [not have the necessary compatibility](https://tailwindcss.com/docs/guides/create-react-app).
  + Next reason might be due to simply using relative and absolute properties nillywilly to the header and require more meticulous care (WIP)