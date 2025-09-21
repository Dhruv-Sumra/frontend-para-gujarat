import React from "react";
import PropTypes from "prop-types";

const Section = ({ title, children }) => (
  <section className="w-full py-12">
    <div className="container mx-auto px-2">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#FF9933] mb-8 tracking-tight text-center">{title}</h2>
      <div>{children}</div>
    </div>
  </section>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Section; 