import { tsvParse, csvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

const parseData = (parse) => {
	return function (d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

export const getData = (fetchUrl) => {
	const promiseFetch = fetch(fetchUrl)
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseFetch;
}
