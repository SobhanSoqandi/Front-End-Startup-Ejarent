const PersianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export default function ToPersianNumber(num){
    return num.toString().replace(/\d/g, (d) => PersianDigits[d]);
}