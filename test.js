
    res: IncomingMessage = {
		_readableState: ["ReadableState"],
		_events: ["Object", "prototype"],
		_eventsCount: 1,
		_maxListeners: undefined,
		socket: null,
		httpVersionMajor: 1,
		httpVersionMinor: 1,
		httpVersion: "1.1",
		complete: true,
		rawHeaders: ["Array"],
		rawTrailers: [],
		aborted: false,
		upgrade: false,
		url: "",
		method: null,
		statusCode: 200,
		statusMessage: "OK",
		client: ["Socket"],
		_consuming: true,
		_dumped: false,
		req: ["Circular *1"],
		responseUrl: "http://0.0.0.0:3000/users",
		redirects: [],
	};

    console.log(res.IncomingMessage.statusCode)