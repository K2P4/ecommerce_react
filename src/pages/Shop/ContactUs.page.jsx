import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactFormComponent, FooterComponent } from "../../Components";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Fill out the form below and we'll get
            back to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <ContactFormComponent />
            <div className="bg-gradient-to-r mt-5 from-blue-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg">
              <h4 className="font-semibold mb-2">Premium Support</h4>
              <p className="text-blue-100 text-sm">
                Our fragrance experts are available to help you find your
                perfect scent. Get personalized recommendations and exclusive
                access to new arrivals.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
              <h3 className="text-xl font-semibold text-black mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-black">Email</p>
                    <p className="text-gray-600">pthuya381@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-black">Phone</p>
                    <p className="text-gray-600">+95 9968213232</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-black">Address</p>
                    <p className="text-gray-600">
                      No 644 <br />
                      North Okkalapa, Yangon City
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-black">Business Hours</p>
                    <p className="text-gray-600">Mon - Sun: 9AM - 6PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
              <h3 className="text-xl font-semibold text-black mb-4">
                Quick Help
              </h3>
              <div className="space-y-4">
                <div className="pb-3 border-b border-gray-100">
                  <p className="font-medium text-black text-sm">
                    Order & Shipping
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Track your order or learn about our shipping policies
                  </p>
                </div>
                <div className="pb-3 border-b border-gray-100">
                  <p className="font-medium text-black text-sm">
                    Returns & Exchanges
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    30-day return policy for all unopened items
                  </p>
                </div>
                <div>
                  <p className="font-medium text-black text-sm">
                    Fragrance Consultation
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Get personalized recommendations from our experts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default ContactUsPage;
