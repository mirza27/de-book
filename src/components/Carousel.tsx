'use client';

// Import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Definisikan komponen Carousel
const Carousel = () => {
    return (
        <>
            <section className="w-full">
                <div className="w-full mx-auto">
                    <Swiper
                        // Install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log('Swiper instance:', swiper)}
                        onSlideChange={() => console.log('Slide changed')}
                    >
                        {/* Tambahkan gambar ke dalam slide */}
                        <SwiperSlide>
                            <img
                                src="https://im.uniqlo.com/global-cms/spa/res373d40ee9a6193c91f11fecc3702e212fr.jpg"
                                alt="Gambar 1"
                                className="w-full"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://im.uniqlo.com/global-cms/spa/res21d17e08b136625456e91e945eb9de55fr.jpg"
                                alt="Gambar 2"
                                className="w-full"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://im.uniqlo.com/global-cms/spa/resb8d96ee6aba35399415b6b10492443cffr.jpg"
                                alt="Gambar 3"
                                className="w-full"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </>
    );
};

// Ekspor komponen
export default Carousel;
