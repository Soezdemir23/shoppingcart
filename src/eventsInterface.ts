import React from "react";

export interface Welcome {
  name?: string;
  value?: ValueClass | string;
  subHooks?: any[];
  hookSource?: HookSource;
}

export interface HookSource {
  lineNumber?: number;
  functionName?: string;
  fileName?: string;
  columnNumber?: number;
}

export interface ValueClass {
  _embedded?: EmbeddedClass;
  _links?: LinksClass;
  page?: Page;
}

export interface EmbeddedClass {
  events: Event[];
}

export interface Event {
  name: string;
  type: Type;
  id: string;
  test: boolean;
  url: string;
  locale: Locale;
  images: Images[];
  sales: string;
  dates: Dates;
  classifications: Classifications;
  promoter: Promoter;
  promoters: Classifications;
  info: string;
  pleaseNote: string;
  priceRanges: Classifications;
  products: Classifications;
  seatmap: Seatmap;
  accessibility: Accessibility;
  ticketLimit: Info;
  ageRestrictions: AgeRestrictions;
  ticketing: Ticketing;
  _links: LinksEnum;
  _embedded: EmbeddedInterface;
  outlets: Classifications;
}

export interface Accessibility {
  ticketLimit: number;
}

interface Info {
  info: string;
}
export interface EmbeddedInterface {
  attractions: Attraction[];
  venues: Venue[];
}

export interface Venue {
  accessibleSeatingDetail: string;
  address: Address;
  boxOfficeInfo: BoxOfficeInfo;
  city: City;
  country: Country;
  name: string;
  images: Images[];
  locale: string;
  parkingDetail: string;
  postalCode: string;
  state: Country;
  url: string;
}
interface Country {
  name: string;
  countryCode: string;
}

export interface City {
  name: string;
}

export interface BoxOfficeInfo {
  acceptedPaymentDetail: string;
  openHoursDetail: string;
  phoneNumberDetail: string;
  willCallDetail: string;
}

export interface Address {
  line1: string;
}

export interface Attraction {
  classifications: Classifications[];
  externalLinks: ExternalLinks;
  id: string;
  images: Images[];
  locale: string;
  name: string;
  test: boolean;
  type: string;
}

export interface ExternalLinks {
  facebook: URLLink[];
  wiki: URLLink[];
  twitter: URLLink[];
  instagram: URLLink[];
  homepage: URLLink[];
}

export interface URLLink {
  url: string;
}

export enum LinksEnum {}

export enum AgeRestrictions {
  LegalAgeEnforcedFalse = "{legalAgeEnforced: false}",
}

export enum Classifications {
  Empty = "[{…}]",
}

export interface Dates {
  start: Start;
  timezone: string;
  status: Status;
  spanMultipleDays: boolean;
}

export interface Start {
  localDate: string;
  localTime: string;
  dateTime: string;
  dateTBD: boolean;
  dateTBA: boolean;
  timeTBA: boolean;
  noSpecificTime: boolean;
}

export interface Status {
  code: string;
}

export interface Images {
  fallback: boolean;
  height: number;
  ratio: string;
  url: string;
  width: number;
}

export enum Locale {
  EnUs = "en-us",
}

export enum Promoter {
  Descriptionnbaregularseasonntlusaid = '{description: "NBA REGULAR SEASON / NTL / USA", id:…}',
}

export enum Seatmap {
  StaticurlhttpsContentResaleTicketmasterCo = '{staticUrl: "https://content.resale.ticketmaster.co…}',
  StaticurlhttpsMapsTicketmastercomMapsGeo = '{staticUrl: "https://maps.ticketmaster.com/maps/geo…}',
}

export enum Ticketing {
  SafeTix = "{safeTix: {…}}",
}

export enum Type {
  Event = "event",
}

export interface LinksClass {
  first?: string;
  self?: string;
  next?: string;
  last?: string;
}

export interface Page {
  size?: number;
  totalElements?: number;
  totalPages?: number;
  number?: number;
}

export interface AllProps {
  feed?: EmbeddedClass | undefined;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  shoppingCart: ShoppingCart[];
}
// Fresh created object, not possible to be anything undefined inside as it is created.
/**
 * This is the ShoppingCart interface that is necessary for the shoppingCart and the shoppingCartMenu and the product pages
 *
 * @interface ShoppingCart
 * @property {string} name - The name of the product
 * @property {string} id - The id of the product
 * @property {string | undefined} image - The image of the product
 * @property {number} maxTickets - The max amount of tickets that can be bought
 * @property {number} numOfReservedTickets - The amount of tickets that are reserved
 * @property {boolean} maxReached - If the max amount of tickets is reached
 *
 */
export interface ShoppingCart {
  name: string;
  id: string;
  image: string | undefined;
  maxTickets: number;
  numOfReservedTickets: number;
  maxReached: boolean;
}

export interface ShoppingCartMenuProps {
  products: ShoppingCart[];
  popupDrawer: boolean;
}
