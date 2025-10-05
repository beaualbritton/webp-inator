# webpinator
### Bun WebP Converter with Concurrency

A performant WebP conversion utility built with **Bun**, designed to process multiple images concurrently. This project leverages **Bun.spawn()** and native CPU concurrency to speed up batch conversions of GIFs, PNGs, or other image formats with ffmpeg.

<div align="center">
  <img src="./static/webpinator.webp"alt="demo" >
</div>

## Features

- **Concurrent processing**  
  Uses **Bun**'s `navigator.hardwareConcurrency` to determine the optimal number of threads and runs multiple FFmpeg processes in parallel.

- **Flexible conversion**  
  Converts any number of files in a directory to WebP, scaling and adjusting frame rates as needed.

## Installation
First, clone the repo. Then install with Bun. 
```bash
git clone https://github.com/yourusername/webpinator.git
cd webpinator
bun install
```

Then link with Bun.

```bash
bun link

webpinator #can be called from any directory
```

### Dependencies
Requires [Bun v1.2](https://bun.sh/) and [FFmpeg](https://www.ffmpeg.org/)
