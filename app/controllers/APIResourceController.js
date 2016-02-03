var request = require('request')

exports.index = function (req, res) {
	request({
		method: 'GET',
		uri: 'http://52.20.76.156:8888/api/resources'
	}, function (err, response, body) {
		if (!err && response.statusCode === 200) {
			res.status(200).send(body);
		} else {
			res.status(500).send(error);
		}
	});
};