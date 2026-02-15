// src/pages/SingleAdv.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetSingleAdv from '../../features/Advertisement/useGetSingleAdv';
import Loading from '../../UI/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// فقط یه آیکون ساده
import { HiOutlineChevronRight } from "react-icons/hi";

function SingleAdv() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleAdv: adv, isLoading, isError } = useGetSingleAdv(id);

  // تاریخ ساز
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading />
    </div>
  );

  if (isError || !adv) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 text-xl mb-4">آگهی پیدا نشد</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          بازگشت
        </button>
      </div>
    </div>
  );

  // آماده‌سازی تصاویر برای نمایش
  const images = adv.images && adv.images.length > 0 
    ? adv.images 
    : [{ image_path: 'images/defualt-image.jpg' }]; // اگر تصویر نبود، فقط یه آرایه با یه آیتم

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* دکمه بازگشت */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6"
        >
          <HiOutlineChevronRight />
          <span>بازگشت</span>
        </button>

        {/* کارت اصلی */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* گالری تصاویر با Swiper */}
          <div className="w-full bg-gray-100">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              loop={images.length > 1}
              className="w-full h-96"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <img 
                      src={
                        image.image_path?.includes('defualt-image') 
                          ? image.image_path 
                          : `http://localhost:8000/storage/${image.image_path}`
                      }
                      alt={`${adv.title} - تصویر ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.src = '/images/defualt-image.jpg';
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* شمارنده تصاویر (اگه بیشتر از ۱ تا باشه) */}
            {images.length > 1 && (
              <div className="text-center py-2 text-sm text-gray-500">
                {images.length} تصویر
              </div>
            )}
          </div>

          {/* اطلاعات */}
          <div className="p-6">
            
            {/* عنوان و تاریخ */}
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{adv.title}</h1>
              <span className="text-sm text-gray-500">
                {formatDate(adv.created_at)}
              </span>
            </div>

            {/* قیمت */}
            <div className="mb-6">
              <span className="text-sm text-gray-600">قیمت:</span>
              <p className="text-3xl font-bold text-blue-600">
                {adv.price?.toLocaleString() || 'توافقی'}
                {adv.price && <span className="text-base mr-1">تومان</span>}
              </p>
            </div>

            {/* توضیحات */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">توضیحات</h2>
              <p className="text-gray-700 leading-relaxed">
                {adv.description || 'توضیحاتی ثبت نشده'}
              </p>
            </div>

            {/* ویژگی‌ها (اگه باشن) */}
            {adv.attributes && adv.attributes.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">مشخصات</h2>
                <div className="grid grid-cols-2 gap-3">
                  {adv.attributes.map((attr, idx) => (
                    <div key={idx} className="border rounded-lg p-3">
                      <p className="text-sm text-gray-500">{attr.name}</p>
                      <p className="font-medium">{attr.pivot?.value || attr.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* اطلاعات فروشنده */}
            {adv.user && (
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold mb-3">فروشنده</h2>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                    {adv.user.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-medium">{adv.user.name || 'کاربر'}</p>
                    <p className="text-sm text-gray-500">{adv.user.phone || 'شماره ثبت نشده'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* دکمه تماس */}
            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              تماس با فروشنده
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleAdv;