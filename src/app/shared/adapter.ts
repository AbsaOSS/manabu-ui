export default class Adapter {
  loader;
  reader;
  config;
  constructor(loader, config) {
    this.loader = loader;
    this.config = config;
  }

  upload() {
    return new Promise( ( resolve, reject ) => {
        const reader = this.reader = new FileReader();

        reader.addEventListener( 'load', () => {
            resolve( { default: reader.result } );
        } );

        reader.addEventListener( 'error', err => {
            reject( err );
        } );

        reader.addEventListener( 'abort', () => {
            reject();
        } );

        this.loader.file.then( file => {
            reader.readAsDataURL( file );
        } );
    } );
}

  abort() {
    if (this.reader) {
      this.reader.abort();
    }
  }
}
