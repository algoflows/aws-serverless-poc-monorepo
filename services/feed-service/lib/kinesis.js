function parsePayload(record) {
	let json = Buffer.from(record.kinesis.data, 'base64').toString('utf8');
	return JSON.parse(json)
}

function getRecords(event) {
	return event.Records.map(parsePayload)
}

export {getRecords}