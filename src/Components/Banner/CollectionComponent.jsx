import React from 'react';
import { Box, Button, Container } from '@mui/material';

const CollectionComponent = () => {
    return (

        <Container maxWidth="lg">

            <section
                className="py-16 container md:py-24 min-h-full flex items-center justify-center mx-auto bg-gray-50 relative"
            >
                {/* Background Circles - Absolute Positioning */}
                <div className="hidden md:flex absolute sm:top-25 lg:top-30 lg:left-1/4 w-14 h-14 rounded-full bg-orange-500 opacity-90"></div>
                <div className=" bottom-55 sm:bottom-30  absolute lg:bottom-3 right-1/4 w-16 h-16 rounded-full bg-pink-300 opacity-90"></div>
                <div className="  absolute top-20 left-0/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-pink-300 opacity-90"></div>
                <div className="hidden sm:flex  absolute sm:-right-4 top-1/3 lg:right-15 w-12 h-12 rounded-full bg-red-300 opacity-90"></div>

                <div className="container mx-auto flex flex-col  md:flex-row items-center justify-between px-4 z-10">
                    {/* Left Content - Text and Button */}
                    <Box className="flex flex-col items-center md:items-start text-center md:text-left mb-10 md:mb-0">
                        <p className="text-4xl md:text-5xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4">
                            Perfume <br /> Collection
                        </p>
                        <p className="text-base md:text-lg text-gray-600 mb-8 max-w-md font-light">
                            Explore an exquisite range of captivating fragrances, crafted to evoke elegance and leave a lasting impression.
                        </p>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#ef4444',
                                '&:hover': {
                                    bgcolor: '#dc2626',
                                },
                                paddingX: 3,
                                paddingY: 1.5,
                                borderRadius: '9999px',
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            Buy Now
                        </Button>
                    </Box>

                    {/* Right Content - Images */}
                    <Box className="relative flex items-center justify-center w-ful mr:0 sm:mr-0 md:mr-0 lg:mr-20  md:w-auto mt-8 md:mt-0">
                        {/* Main Perfume Image */}
                        <img
                            src="/banner.jpg"
                            alt="Perfume Bottle 1"
                            className="w-64 h-[200px] object-cover rounded-lg shadow-xl transform rotate-3 z-10"
                        />
                        {/* Overlapping Perfume Image */}
                        <img
                            src="/banner3.jpg"
                            alt="Perfume Bottle 2"
                            className="w-52  h-[160px] object-cover rounded-lg shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform -rotate-6 ml-40 mt-20"
                        />
                    </Box>
                </div>
            </section>
        </Container>


    );
};

export default CollectionComponent;