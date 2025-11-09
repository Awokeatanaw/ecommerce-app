import React from 'react';
import { toast } from 'react-toastify'; // Import toast for success message

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault(); // Fixed typo: preventDfault -> preventDefault
    const email = event.target.email.value;
    if (email) {
      toast.success('Subscribed successfully! Check your inbox for 20% off.', {
        position: 'top-right',
        autoClose: 3000,
      });
      event.target.reset(); // Clear form
    }
  };

  return (
    <section className="text-center py-12 sm:py-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-md my-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 animate-fadeIn">
        Subscribe now & get 20% off your first order
      </h2>
      <p className="text-gray-600 mt-3 max-w-xl mx-auto text-sm sm:text-base">
        Join our newsletter to receive exclusive offers, new arrivals, and special discounts delivered straight to your inbox.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md mx-auto mt-6 flex flex-col sm:flex-row items-center gap-3 border border-gray-300 rounded-full overflow-hidden shadow-inner bg-white"
      >
        <input
          name="email" // Added name for form access
          className="flex-1 px-5 py-3 outline-none text-gray-700 placeholder-gray-400"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 font-medium uppercase tracking-wider transition-colors hover:bg-gray-800 rounded-full sm:rounded-none sm:rounded-r-full"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsletterBox;