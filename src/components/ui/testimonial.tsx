const Testimonial = () => {
  return (
    <div className="max-w-md border border-[#e0eee7] mx-auto bg-white rounded-xl hover:shadow-lg p-6">
      {/* Star Rating */}
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-6 h-6 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.955a1 1 0 00-.364-1.118L2.065 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.284-3.955z" />
          </svg>
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-lg italic mb-4">
        "Ordered Metformin at midnight — arrived by 8am. 100% genuine. I'm a
        regular now!"
      </p>

      {/* Reviewer Info */}
      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-900">Rahim Ahmed</h3>
        <p className="text-gray-500">Dhaka, Mirpur</p>
      </div>
    </div>
  );
};

export default Testimonial;
