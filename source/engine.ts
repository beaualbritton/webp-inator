import  path  from "path";

export class Engine
{
  private extension: string; 
  private directory: string; 
  constructor(directory: string, extension: string)
  {
    this.directory = directory;
    this.extension = extension
  }

  private async findFiles()
  {
    const fileArray: Array<string> = [];
    try
    {
      let files:Array<string> =  await Array.fromAsync(new Bun.Glob(`*.${this.extension}`).scan({cwd:this.directory, absolute: true}));

      for(let file of files)
      {
        fileArray.push(file);
      }
    }
    catch(error)
    {
      console.error(error)
    }
    return fileArray;
  }

  public async process()
  {
    const startTime = performance.now();
    let foundFiles: Array<string> = await this.findFiles();

    if(foundFiles.length==0)
    {
      console.log(`no files with .${this.extension} found in ${this.directory}`);
      return;
    }

    console.log(`found ${foundFiles.length} .${this.extension} files in ${this.directory}`);

    let threads : number = navigator.hardwareConcurrency;

    let maxConcurrent : number = threads;
    let ffmpegThreads : number = (foundFiles.length==1) ? threads : 1;
    
    //Finding files by chunk for multiple Bun processes
    for(let i=0; i < foundFiles.length; i+=maxConcurrent)
    {
      //Batches of file per process
      let currentBatch = foundFiles.slice(i,i+maxConcurrent);
      
      const results = await Promise.all(
      currentBatch.map(file => this.toWebP(file, ffmpegThreads)));
    }
    console.log(`done in ${(performance.now() - startTime)/1000}s`)
  }
  private async toWebP(file: string, maxConcurrent: number) : Promise<boolean>
  {
    let status = false;

    try
    {
      const parsed = path.parse(file);
      const outputPath = path.format({dir: parsed.dir, name: parsed.name, ext: '.webp'});
      const ffmpegArgs = ["ffmpeg",
        "-i", file,
        "-threads", maxConcurrent.toString(),
        "-vf", "fps=15,scale=iw*0.5:-1:flags=lanczos",
        "-vcodec", "libwebp",
        "-lossless", "0",
        "-compression_level", "6",
        "-q:v", "50",
        "-loop", "0",
        "-preset", "picture",
        "-an",
        "-fps_mode", "passthrough",    // Modern replacement for -vsync 0
        "-y",
        outputPath
      ];
      let process = Bun.spawn(ffmpegArgs, {stdout:"ignore",stdin:"pipe"});

      const status = await process.exited;
      if (status !== 0)
      {
        console.log(`error for ${file}`)
      }
    }
    catch(error)
    {
      console.log(`error ${error}`)
      return false;
    }
    return status;

  }
}
