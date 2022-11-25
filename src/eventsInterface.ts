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
    events?: Event[];
}

export interface Event {
    name?:            string;
    type?:            Type;
    id?:              string;
    test?:            boolean;
    url?:             string;
    locale?:          Locale;
    images?:          Images;
    sales?:           string;
    dates?:           Dates;
    classifications?: Classifications;
    promoter?:        Promoter;
    promoters?:       Classifications;
    info?:            string;
    pleaseNote?:      string;
    priceRanges?:     Classifications;
    products?:        Classifications;
    seatmap?:         Seatmap;
    accessibility?:   string;
    ticketLimit?:     string;
    ageRestrictions?: AgeRestrictions;
    ticketing?:       Ticketing;
    _links?:          LinksEnum;
    _embedded?:       EmbeddedEnum;
    outlets?:         Classifications;
}

export enum EmbeddedEnum {
    AttractionsArray2VenuesArray1 = "{attractions: Array(2), venues: Array(1)}",
}

export enum LinksEnum {
    AttractionsArray2SelfVenuesArray1 = "{attractions: Array(2), self: {…}, venues: Array(1)}",
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

export enum Images {
    Empty = "[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]",
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
