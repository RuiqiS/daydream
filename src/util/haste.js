const fetch = require('node-fetch');
async function postHaste(code, lang = '') {
	try {
		if (code.length > 400000) {
			return 'Document exceeds maximum length.';
		}
		const res = await fetch('https://paste.nomsy.net/documents', { method: 'POST', body: code });
		const { key, message } = await res.json();
		if (!key) {
			return message;
		}
		return `https://paste.nomsy.net/${key}${lang && `.${lang}`}`;
	} catch (err) {
		throw err;
	}
}
module.exports = postHaste;
