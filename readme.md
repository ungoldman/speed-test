# speed-test

An attempt to reimplement [speed-test](https://github.com/sindresorhus/speed-test) as a webpage.

:rose: ~ _it's just a webpage_ ~ :rose:

**Failed experiment** because speedtest.net doesn't return CORS headers.

Even tried rewriting instances of 'cors' to 'no-cors' in `bundle.js` based on [this hack](https://github.com/SamyPesse/gitkit-js/issues/3#issuecomment-233470219), but that raised another error:

```
index.js:30762 Uncaught (in promise) TypeError: Cannot read property 'getReader' of null
```

coming from https://github.com/jhiesey/stream-http/blob/92500c71be74bc1c4c2d27dabfc9ed2a1d3bb252/lib/response.js#L45

```
// TODO: this doesn't respect backpressure. Once WritableStream is available, this can be fixed
var reader = response.body.getReader()
```

I just wanted to make a speed test page that wasn't a busted old flash thing 😖

If anybody wants to figure out how to make this work, feel free to go nuts, I am giving up.

## License

[CC0-1.0](spdx.org/licenses/CC0-1.0)
