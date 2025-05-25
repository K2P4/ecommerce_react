import React from 'react'
import { IconButton, Container, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { AllContext } from "../../context/AllContext";


const FooterComponent = () => {
    return (
        < footer className="bg-gray-100 text-gray-600 py-10 mt-16 border-t border-gray-200" >
            <Container maxWidth="lg" className="text-center">
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <p variant="h6" className="font-semibold mb-3 text-gray-800">
                            XPERFUMES
                        </p>
                        <p variant="body2" className="text-gray-500">
                            Your destination for exquisite fragrances. Discover scents that tell your story.
                        </p>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <p variant="h6" className="font-semibold mb-3 text-gray-800">
                            Quick Links
                        </p>
                        <ul className="space-y-2 text-gray-500">
                            <li><a href="#" className="hover:text-blue-600 transition duration-300">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition duration-300">Best Sellers</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition duration-300">Contact Us</a></li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <p variant="h6" className="font-semibold mb-3 text-gray-800">
                            Follow Us
                        </p>
                        <div className="flex flex-col justify-center  text-gray-500">
                            <div className='space-x-4'>
                                <IconButton color='primary'><FacebookIcon /></IconButton>
                                <IconButton color='primary'><TwitterIcon /></IconButton>
                                <IconButton color='primary'><InstagramIcon /></IconButton>
                            </div>

                            <a target='_blank' href="mailto:pthuya381@gmail.com" className='text-blue-600 cursor-pointer'>
                                xperfume.shop@gmail.com
                            </a>
                        </div>
                    </Grid>
                </Grid>
                <div className="mt-8 border-t border-gray-200 pt-6">
                    <p variant="body2" className="text-gray-500">
                        © {new Date().getFullYear()} XPERFUMES. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer >
    )
}

export default FooterComponent