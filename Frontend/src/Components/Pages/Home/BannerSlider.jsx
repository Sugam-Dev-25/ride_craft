import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const banners = [
    {
    id: 1,
    image: "/BannerImage3.png",
    title: "Your Journey Begins",
    subtitle: "Get ready for the ultimate biking experience.",
    button: "Get Started",
  },
  {
    id: 1,
    image: "/BannerImage1.png",
    title: "Ride Beyond Limits",
    subtitle: "Discover high-performance bikes for every adventure.",
    button: "Shop Now",
  },
  {
    id: 3,
    image: "/BannerImage2.png",
    title: "Unleash the Power",
    subtitle: "Experience the thrill of speed and style.",
    button: "Explore",
  }

];

const BannerSlider = () => {
  return (
    <Box sx={{ width: "100%", position: "relative", overflow: "hidden" }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Box
              sx={{
                position: "relative",
                height: { xs: "60vh", md: "65vh" },
                backgroundImage: `url(${banner.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                textAlign: "center",
                px: 3,
              }}
            >
              {/* Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              />

              {/* Content */}
              <Box sx={{ position: "relative", zIndex: 2, maxWidth: "800px" }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    fontFamily: `"Wix Madefor Display", sans-serif`,
                    fontSize: { xs: "2rem", md: "3.5rem" },
                  }}
                >
                  {banner.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: 400,
                    fontFamily: `"Wix Madefor Display", sans-serif`,
                  }}
                >
                  {banner.subtitle}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#ffffff02",
                    color: "#fff",
                    width: { xs: "120px", md: "180px" },
                    height: 45,
                    fontWeight: "bold",
                    border: "1px solid #fff",
                    borderRadius: "30px",
                    "&:hover": {
                      backgroundColor: "#cfcfcfff",
                    },
                  }}
                >
                  {banner.button}
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Button Styles */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #000;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          padding: 10px;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background-color: #fdc500;
          color: #000;
          transform: scale(1.1);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px;
          font-weight: bold;
        }

        /* Position tweaks */
        .swiper-button-next {
          right: 15px;
        }
        .swiper-button-prev {
          left: 15px;
        }

        @media (max-width: 600px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 35px;
            height: 35px;
          }
          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 16px;
          }
        }
      `}</style>
    </Box>
  );
};

export default BannerSlider;
