import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import BookCard from "./BookCard";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

function DataPresentation(props) {
  const svgRef = useRef(null);
  const marginLeft = 60;
  let width = props.GraphWidth !== undefined ? props.GraphWidth : 600;
  const height = props.GraphHeight !== undefined ? props.GraphHeight : 500;
  const [currentHover, setCurrentHover] = useState("");
  const [selectedYears, setSelectedYears] = useState([]);
  width = width > document.width ? document.width : width;
  useEffect(() => {
    const marginTop = -20;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const svgEl = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${marginLeft}, ${marginTop})`);
    let graphData = d3.rollup(
      props.Data,
      (d) => d.length,
      (b) => b.first_publish_year
    );
    graphData.delete(undefined);

    const x = d3
      .scaleBand()
      .range([0, width - marginLeft])
      .domain(d3.sort(graphData.keys()))
      .padding(0.2);
    svgEl
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end");

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(graphData.values()) - marginTop / 4])
      .range([height, 0]);
    svgEl.append("g").call(d3.axisLeft(y));

    svgEl
      .selectAll()
      .data(graphData)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d[0]);
      })
      .attr("y", function (d) {
        return y(d[1]);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d[1]);
      })
      .attr("fill", "#4401ff")
      .style("stroke-width", 4)
      .style("stroke", "none")
      .style("opacity", 0.8)
      .style("stroke", (d) =>
        selectedYears.indexOf(d[0]) > -1 ? "red" : "none"
      )
      .style("cursor", "pointer")
      .on("mouseover", (e, d) => {
        setCurrentHover(
          `${d[1]} book${d[1] > 1 ? "s" : ""} published in ${d[0]}`
        );
        d3.select(e.target)
          .style("stroke", selectedYears.indexOf(d[0]) > -1 ? "red" : "black")
          .style("opacity", 1);
      })
      .on("mouseleave", (e, d) => {
        setCurrentHover("");
        d3.select(e.target)
          .style("stroke", selectedYears.indexOf(d[0]) > -1 ? "red" : "none")
          .style("opacity", 0.8);
      })
      .on("click", (e, d) => {
        if (selectedYears.indexOf(d[0]) === -1) {
          setSelectedYears([...selectedYears, d[0]]);
        } else {
          setSelectedYears([...selectedYears.filter((year) => year !== d[0])]);
        }
        d3.select(e.target)
          .style("stroke", selectedYears.indexOf(d[0]) > -1 ? "red" : "black")
          .style("opacity", 1);
      });
  }, [height, props, width, selectedYears]);

  const booksForSelectedYears = props.Data.filter(
    (books) => selectedYears.indexOf(books.first_publish_year) > -1
  );
  return (
    <React.Fragment>
      <div>
        <svg ref={svgRef} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 0",
          marginBottom: "1.5rem",
        }}
      >
        <Typography variant="body1" color="info">
          {currentHover}
        </Typography>
        <Typography>
          {booksForSelectedYears.length > 0
            ? `Showing ${
                booksForSelectedYears.length
              } results for the selected years:${" "}
          ${selectedYears.join(", ")}`
            : "Showing 0 results. Please select some years to view the books published in that year."}
        </Typography>
      </div>
      <Grid container spacing={2}>
        {booksForSelectedYears.map((book, index) => {
          return (
            <Grid item md={4}>
              <BookCard Book={book} />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}

export default DataPresentation;
