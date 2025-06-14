import React from "react";
import "./Workflow.css";
import videoPic from "../../../img/videoPic.png";

const Workflow = () => {
  return (
    <section className="bg-[#219653] py-16 px-6 md:px-16 rounded-3xl shadow-xl text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4">
          How Agri-Help Works?
        </h1>
        <p className="text-lg md:text-xl font-medium uppercase text-white opacity-90">
          Take a look at our platform demo
        </p>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Steps */}
        <div className="w-full md:w-1/2">
          <ol className="list-decimal list-inside space-y-4 text-xl md:text-2xl font-medium leading-relaxed pl-6">
            <li>Sign up to the platform</li>
            <li>Post your ad for the off-season</li>
            <li>Provide equipment details</li>
            <li>Explore and filter lists of equipment</li>
            <li>Check an available time slot</li>
            <li>Chat with the owner and make a booking</li>
            <li>Stay updated by SMS</li>
          </ol>
        </div>

        {/* Demo Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={videoPic}
            alt="Platform Demo"
            className="rounded-2xl shadow-lg w-full max-w-md hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Workflow;
