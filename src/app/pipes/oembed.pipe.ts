import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'oembed'
})
export class OembedPipe implements PipeTransform {
  transform(htmlContent: any): any {
    const oembed = htmlContent.split('</oembed>');
    let body = '';
    oembed.forEach((item, index) => {
      body += oembed[index] + '</oembed>';
      const oembed1 = item.split('url="')[1];
      if (oembed1) {
        const oembed2 = oembed1.split('">')[0];
        if (oembed2) {
          const youtube = oembed2.split('https://www.youtube.com/watch?v=')[1];
          if (youtube) {
            body +=
              '<div class="iframe-container"><iframe src="https://youtube.com/embed/' +
              youtube +
              '"width="100%" height="400vh" frameborder="0"; scrolling="no"; allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
          }
        }
      }
    });
    return body;
  }
}
