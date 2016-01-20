exports.getExample = function (source) {
    
    var response = {
		test: "works"
	};

	source.res.setHeader('Access-Control-Allow-Origin', source.req.headers.origin);
	source.res.status(200).send(JSON.stringify(response));
}
