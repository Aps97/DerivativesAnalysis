export interface Derivative{
    symbol : String;
    expiryDate : String;
	type : String ;
	strikePrice : number;
	quantity : number
    avgPrice : number;
    ltp : number;
    currValue : number;
    pl : number;
    per_change : number;
}