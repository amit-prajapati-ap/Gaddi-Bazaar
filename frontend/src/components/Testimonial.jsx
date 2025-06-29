import React, { useState } from "react";
import Title from "./Title";

const Testimonial = () => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });
  const cardRefs = React.useRef([]);

  const handleMouseMove = (e, index) => {
    const bounds = cardRefs.current[index].getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
      text: testimonials[index].name,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const testimonials = [
    {
      name: "John Doe",
      title: "Frontend Developer",
      message:
        "Integrating this component into our project was seamless and saved us countless hours of development and testing. Highly recommended!",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    },
    {
      name: "Jane Smith",
      title: "Full Stack Engineer",
      message:
        "This solution not only simplified our workflow but also improved our UI consistency across the board. Excellent tool for modern teams.",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    },
    {
      name: "Bonnie Green",
      title: "UX Designer",
      message:
        "I was impressed with how intuitive and flexible the design was. It allowed us to rapidly prototype and launch features with confidence.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    },
  ];
  return (
    <div className="max-w-[1200px] mx-auto mt-24">
      <Title
        title={"What Our Customes Say"}
        subTitle={
          "Discover why discerning travelers choose GaddiBazaar for their luxury accomodations around the world."
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 px-24">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={handleMouseLeave}
            className="relative bg-gray-200 rounded-lg overflow-hidden max-w-sm border border-borderColor shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {tooltip.visible && tooltip.text === testimonial.name && (
              <span
                className="absolute px-2.5 py-1 text-sm rounded text-nowrap bg-indigo-500 text-white pointer-events-none transition-all duration-300"
                style={{
                  top: tooltip.y + 8,
                  left: tooltip.x + 8,
                  transition: "all 0.3s ease-out",
                  animationDelay: "0.2s",
                }}
              >
                {tooltip.text}
              </span>
            )}

            <div className="flex flex-col items-start justify-center p-8 text-center bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4 text-gray-500">
                <div className="mb-4">
                  <svg 
                    width="44"
                    height="40"
                    viewBox="0 0 44 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                   >
                    <path
                      d="M33.172 5.469q2.555 0 4.547 1.547a7.4 7.4 0 0 1 2.695 4.007q.47 1.711.469 3.61 0 2.883-1.125 5.86a22.8 22.8 0 0 1-3.094 5.577 33 33 0 0 1-4.57 4.922A35 35 0 0 1 26.539 35l-3.398-3.398q5.296-4.243 7.218-6.563 1.946-2.32 2.016-4.617-2.86-.329-4.781-2.461-1.923-2.133-1.922-4.992 0-3.117 2.18-5.297 2.202-2.203 5.32-2.203m-20.625 0q2.555 0 4.547 1.547a7.4 7.4 0 0 1 2.695 4.007q.47 1.711.469 3.61 0 2.883-1.125 5.86a22.8 22.8 0 0 1-3.094 5.577 33 33 0 0 1-4.57 4.922A35 35 0 0 1 5.914 35l-3.398-3.398q5.296-4.243 7.218-6.563 1.946-2.32 2.016-4.617-2.86-.329-4.781-2.461-1.922-2.133-1.922-4.992 0-3.117 2.18-5.297 2.202-2.203 5.32-2.203"
                      fill="#2563EB"
                    />
                  </svg>
                </div>

                <div class="flex gap-1 mb-4">
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z"
                      fill="#FF532E"
                    />
                  </svg>
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z"
                      fill="#FF532E"
                    />
                  </svg>
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z"
                      fill="#FF532E"
                    />
                  </svg>
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z"
                      fill="#FF532E"
                    />
                  </svg>
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z"
                      fill="#FF532E"
                    />
                  </svg>
                </div>
                <p className="mt-4 text-start text-sm line-clamp-3">
                  {testimonial.message}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="rounded-full w-9 h-9"
                  src={testimonial.image}
                  alt={`${testimonial.name} profile`}
                />
                <div className="space-y-0.5 font-medium text-left ml-3">
                  <p>{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
