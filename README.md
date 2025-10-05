# webpinator

## Concurrent WebP Converter

a WebP conversion utility built with **TypeScript** and **Bun**, designed to process multiple images concurrently.

<div align="center">
  <img src="./static/webp-inator.webp"alt="demo" >
</div>

### Features
- **concurrent processing**  
  uses **Bun**'s `navigator.hardwareConcurrency` to determine the optimal number of threads and runs multiple FFmpeg processes in parallel.

- **flexible conversion**  
  converts any number of files in a directory to WebP, scaling and adjusting frame rates as needed.

### Installation
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
requires [Bun v1.2](https://bun.sh/) and [FFmpeg](https://www.ffmpeg.org/)

### Roadmap 
- specialized pipeline for large GIFs.
- atomic output to minimize conflicts.
- robust benchmarking comparing input and output files.

### Additional resources:
- [bun processes](https://bun.com/docs/api/spawn)
- [bun stdin](https://bun.com/guides/process/stdin)
- [libwep](https://ffmpeg.org/ffmpeg-codecs.html#libwebp)
