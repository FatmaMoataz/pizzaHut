import React from 'react'
import { Helmet } from 'react-helmet'

export default function About() {
  return (
    <>
    <Helmet>
    <title>About</title>
  </Helmet>
    <div className="min-h-screen bg-gray-100 py-10">
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">About Pizza Hut</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Pizza Hut was founded in 1958 by two brothers, Dan and Frank Carney, in Wichita, Kansas. 
            What started as a small pizzeria has grown into the largest pizza chain in the world, 
            with thousands of locations across the globe. Our mission has always been to provide 
            delicious, high-quality pizza with a focus on customer satisfaction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <p className="text-gray-600 leading-relaxed">
            At Pizza Hut, we believe in more than just great pizza. We believe in creating memorable 
            experiences for our customers. Our values include quality, innovation, and community. 
            We strive to use the freshest ingredients, embrace new ideas, and give back to the 
            communities we serve.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Menu</h2>
          <p className="text-gray-600 leading-relaxed">
            From our classic Pan Pizza to our innovative Stuffed Crust, Pizza Hut offers a wide variety 
            of pizzas to satisfy every craving. We also offer pasta, wings, desserts, and more. 
            Whether you're dining in, carrying out, or ordering delivery, we have something for everyone.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            Have questions or feedback? We'd love to hear from you! Reach out to us at:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>Email: support@pizzahut.com</li>
            <li>Phone: 1-800-555-PIZZA</li>
            <li>Address: 123 Pizza Hut Lane, Wichita, KS 67202</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
  </>
  )
}
