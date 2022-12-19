import React from "react";

export interface Welcome {
    name?:       string;
    value?:      ValueClass | string;
    subHooks?:   any[];
    hookSource?: HookSource;
}

export interface HookSource {
    lineNumber?:   number;
    functionName?: string;
    fileName?:     string;
    columnNumber?: number;
}

export interface ValueClass {
    _embedded?: EmbeddedClass;
    _links?:    LinksClass;
    page?:      Page;
}

export interface EmbeddedClass {
    events: Event[];
}

export interface Event {
    name:            string;
    type:            Type;
    id:              string;
    test:            boolean;
    url:             string;
    locale:          Locale;
    images:          Images[];
    sales:           string;
    dates:           Dates;
    classifications: Classifications;
    promoter:        Promoter;
    promoters:       Classifications;
    info:            string;
    pleaseNote:      string;
    priceRanges:     Classifications;
    products:        Classifications;
    seatmap:         Seatmap;
    accessibility:   string;
    ticketLimit:     Info;
    ageRestrictions: AgeRestrictions;
    ticketing:       Ticketing;
    _links:          LinksEnum;
    _embedded:       EmbeddedInterface;
    outlets:         Classifications;
}

interface Info {
    info: string;
}
export interface EmbeddedInterface {
    attractions: Attraction[];
    venues: Venue[] ;
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

export interface City{
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

export enum LinksEnum {
    
}

export enum AgeRestrictions {
    LegalAgeEnforcedFalse = "{legalAgeEnforced: false}",
}

export enum Classifications {
    Empty = "[{…}]",
}

export enum Dates {
    DatesSpanMultipleDaysFalseStartStatus = "{spanMultipleDays: false, start: {…}, status: {…}}",
    SpanMultipleDaysFalseStartStatus = "{spanMultipleDays: false, start: {…}, status: {…}, …}",
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
    Descriptionnbaregularseasonntlusaid = "{description: \"NBA REGULAR SEASON / NTL / USA\", id:…}",
}

export enum Seatmap {
    StaticurlhttpsContentResaleTicketmasterCo = "{staticUrl: \"https://content.resale.ticketmaster.co…}",
    StaticurlhttpsMapsTicketmastercomMapsGeo = "{staticUrl: \"https://maps.ticketmaster.com/maps/geo…}",
}

export enum Ticketing {
    SafeTix = "{safeTix: {…}}",
}

export enum Type {
    Event = "event",
}

export interface LinksClass {
    first?: string;
    self?:  string;
    next?:  string;
    last?:  string;
}

export interface Page {
    size?:          number;
    totalElements?: number;
    totalPages?:    number;
    number?:        number;
}

export interface ProductProps {
    feed: EmbeddedClass | undefined;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface HomePageProps {
    feed: EmbeddedClass | undefined;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface ShoppingPageProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    
}

export interface ShoppingCart {
    name: string | undefined;
    id: string | undefined;
    maxTickets: number;
    numOfReservedTickets: number;
    maxReached: boolean;
}