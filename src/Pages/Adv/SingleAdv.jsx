// src/components/SingleAdv.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// داده‌های آگهی‌ها (می‌تونید بعداً از API یا Context بیارید)
const allAdvertisements = [
    {
        id: "1",
        title: "خودرو 206",
        price: "",
        categories: "لوازم خانگی",
        description: "این یک متن توضیح است عریزم",
        address: "خیابان طلوع",
        image: "images/defualt-image.jpg",
        details: "جزئیات کامل خودرو 206...",
        phone: "09123456789",
        date: "۱۴۰۳/۰۱/۱۵"
    },
    {
        id: "2",
        title: "منزل 100 متری در خیابان فرشته",
        price: "500000000",
        categories: "مسکن",
        description: "این یک متن توضیح است عریزم",
        address: "اتوبان شهید باقری",
        image: "images/defualt-image.jpg",
        details: "ویلای ۱۰۰ متری، سند دار، قابل معاوضه...",
        phone: "09129876543",
        date: "۱۴۰۳/۰۱/۱۶"
    },
    {
        id: "3",
        title: "دوربین فیلم برداری",
        price: "400000",
        categories: "مجالس و مراسمات",
        description: "این یک متن توضیح است عریزم",
        address: "بلوار گلها",
        image: "images/defualt-image.jpg",
        details: "دوربین حرفه ای فیلم برداری Canon...",
        phone: "09351234567",
        date: "۱۴۰۳/۰۱/۱۷"
    },
];

function SingleAdv() {
    const { id } = useParams(); // گرفتن ID از URL
    const navigate = useNavigate();
    
    // پیدا کردن آگهی با ID دریافتی
    const advertisement = allAdvertisements.find(ad => ad.id === id);
    
    // اگر آگهی پیدا نشد
    if (!advertisement) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-500">آگهی پیدا نشد!</h2>
                <button 
                    onClick={() => navigate('/')}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    بازگشت به لیست آگهی‌ها
                </button>
            </div>
        );
    }
    
    // فرمت کردن قیمت با جداکننده هزارگان
    const formatPrice = (price) => {
        if (!price) return "توافقی";
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            {/* دکمه بازگشت */}
            <button 
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 flex items-center gap-2 text-blue-500 hover:text-blue-600"
            >
                <span>←</span>
                بازگشت
            </button>
            
            {/* عکس اصلی */}
            <div className="mb-8">
                <img 
                    src={advertisement.image} 
                    alt={advertisement.title}
                    className="w-full h-64 sm:h-96 object-cover rounded-xl shadow-lg"
                />
            </div>
            
            {/* اطلاعات آگهی */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="border-b pb-4 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                        {advertisement.title}
                    </h1>
                    
                    <div className="flex flex-wrap gap-4 mt-4">
                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                            {advertisement.categories}
                        </span>
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                            {advertisement.address}
                        </span>
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                            {advertisement.date}
                        </span>
                    </div>
                </div>
                
                {/* قیمت */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">قیمت:</h3>
                    <div className="text-2xl font-bold text-gray-900">
                        {formatPrice(advertisement.price)} تومان
                    </div>
                </div>
                
                {/* توضیحات */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">توضیحات:</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {advertisement.description}
                    </p>
                </div>
                
                {/* جزئیات کامل */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">جزئیات کامل:</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {advertisement.details}
                    </p>
                </div>
                
                {/* اطلاعات تماس */}
                <div className="bg-blue-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">اطلاعات تماس:</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">تلفن:</span>
                            <span className="font-bold text-gray-800">{advertisement.phone}</span>
                        </div>
                        <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
                            تماس
                        </button>
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                            چت
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleAdv;