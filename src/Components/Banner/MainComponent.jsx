import React from 'react'

const MainComponent = () => {
    return (
        <section
            className=" py-16 md:py-24 flex items-center flex-col justify-center min-h-screen overflow-hidden  bg-no-repeat  object-center bg-center bg-cover "
            style={{ backgroundImage: "url('/banner2.jpg')" }}
        >
            <div className="container   text-center mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Smell is a word</h1>
                <h2 className="text-3xl md:text-4xl font-semibold text-blue-600 mb-4">Perfume is Literature</h2>
                <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300">
                    Shop Now
                </button>
            </div>

        </section>
    )
}

export default MainComponent