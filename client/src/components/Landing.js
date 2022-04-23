import { Component } from "react";
import classes from "./Landing.module.css";
import React from "react";

import { Link } from "react-router-dom";
export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      a: "apple",
    };
  }

  render() {
    return (
      <section className={classes.SectioN}>
        <article className={classes.intro}>
          <header>UPLOAD JOBS HERE!!</header>
          <div>
            <p>
              Sunflowers are usually tall annual or perennial plants that in
              some species can grow to a height of 300 centimetres (120 inches)
              or more. Each "flower" is actually a disc made up of tiny flowers,
              to form a larger false flower to better attract pollinators. The
              plants bear one or more wide, terminal capitula (flower heads made
              up of many tiny flowers), with bright yellow ray florets (mini
              flowers inside a flower head) at the outside and yellow or maroon
              (also known as a brown/red) disc florets inside. Several
              ornamental cultivars of H. annuus have red-colored ray florets;
              all of them stem from a single original mutant.[10] While the
              majority of sunflowers are yellow, there are branching varieties
              in other colours including, orange, red and purple.
            </p>
          </div>
          <footer>
            <button  >
              <Link to='/register'>login/regiter</Link> </button>
          </footer>
        </article>
        <figure>

        </figure>
      </section>
    );
  }
}
