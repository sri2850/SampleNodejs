const express = require('express');
const { parse } = require('url');
const next = require('next');
const { createServer } = require('http');
// const SENDGRID_USERNAME = process.env.SENDGRID_USERNAME;
// const SENDGRID_PASSWORD = process.env.SENDGRID_PASSWORD;
// const sendgrid = require('sendgrid')(SENDGRID_USERNAME, SENDGRID_PASSWORD);

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	createServer(async (req, res) => {
		const parsedUrl = parse(req.url, true);
		const { pathname, query } = parsedUrl;

		if (pathname === '/articles') {
			app.render(req, res, '/articles', { ...query, test: 'Test' });
		} else {
			handle(req, res, parsedUrl);
		}
	}).listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
