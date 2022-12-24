const toNumeric = x => typeof x?.valueOf?.() == 'bigint' ? BigInt(x) : +x;

const parseToNumber = (string, radix, charset = '0123456789abcdef') =>
{
	string = String(string);
	radix = toNumeric(radix);
}

const printToNumeral = (number, radix, charset = '0123456789abcdef') =>
{
	number = toNumeric(number);
	radix = toNumeric(radix);
}
