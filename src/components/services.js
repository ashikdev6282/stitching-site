import React from 'react';

const Services = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-pink-200 via-yellow-300 to-gray-400">
      <div className=" mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-yellow-500 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center mb-6">
              <img
                src="https://plus.unsplash.com/premium_photo-1664299848948-54d352989d94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGN1c3RvbSUyMHN0aXRjaGluZ3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Custom Stitching"
                className="w-30 h-30 object-contain"
              />
            </div>
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Custom Stitching
            </h3>
            <p className="text-gray-600 text-center">
              Get tailor-made clothes that fit you perfectly. Our expert tailors provide the best stitching for every type of fabric.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center mb-6">
              <img
                src="https://plus.unsplash.com/premium_photo-1700764098071-22d44ffd5af5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWx0ZXJhdGlvbnN8ZW58MHx8MHx8fDA%3D"
                alt="Alterations"
                className="w-30 h-30 object-contain"
              />
            </div>
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Alterations
            </h3>
            <p className="text-gray-600 text-center">
              Need a quick fix or a major adjustment? We offer high-quality alteration services to make your clothes fit just right.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center mb-6">
              <img
                src="https://plus.unsplash.com/premium_photo-1682142705901-28c534528ce8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGVtYnJvaWRlcnl8ZW58MHx8MHx8fDA%3D"
                alt="Embroidery"
                className="w-30 h-30 object-contain"
              />
            </div>
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Embroidery
            </h3>
            <p className="text-gray-600 text-center">
              Add a touch of creativity to your clothing with our beautiful embroidery designs, perfect for personalizing any outfit.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center mb-6">
              <img
                src="https://plus.unsplash.com/premium_photo-1677695600604-67ce29c00f7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fHNld2luZyUyMHJlcGFpcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Sewing Repair"
                className="w-30 h-30 object-contain"
              />
            </div>
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Sewing Repair
            </h3>
            <p className="text-gray-600 text-center">
              We can fix anything from holes to broken zippers. Trust our experts to restore your favorite clothes to their original condition.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center mb-6">
              <img
                src="https://plus.unsplash.com/premium_photo-1726862821473-1d2992749711?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGZhc2hpb24lMjBjb25zdWxhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Fashion Consultation"
                className="w-30 h-30 object-contain"
              />
            </div>
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Fashion Consultation
            </h3>
            <p className="text-gray-600 text-center">
              Unsure of the style or fit? Let our fashion experts guide you in choosing the right design and fabric for your needs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center mb-6">
              <img
                src="https://images.unsplash.com/photo-1477901492169-d59e6428fc90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGRyZXNzJTIwbWFraW5nfGVufDB8fDB8fHww"
                alt="Dress Making"
                className="w-30 h-30 object-contain"
              />
            </div>
            <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
              Dress Making
            </h3>
            <p className="text-gray-600 text-center">
              From weddings to parties, we offer exquisite dress-making services, creating stunning garments tailored to your occasion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
