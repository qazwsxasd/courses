const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {

		const courses = server.db.getState().courses;
		let url_parts = url.parse(req.originalUrl, true),
			// query = url_parts.query,
			query = req.query,
			from = query.start || 0,
			to = (+query.start + +query.count) || courses.length,
			sort = query.sort,
			queryStr = query.query;

    	let result = courses;

		console.log(sort);
		console.log(req.query);
		console.log(queryStr);

		if (queryStr && queryStr.length) {
			console.log('111111 ', result.length);
            result = result.filter(item => item.name.includes(queryStr));
		}

		if (result.length < to) {
			to = result.length;
		};

    	result = result.slice(from, to);

		res.json(result);
	});
	
	return router;
};
