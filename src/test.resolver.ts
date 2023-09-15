import { Query, Resolver } from '@nestjs/graphql';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { ChartConfiguration } from 'chartjs';

import { createCanvas, loadImage } from 'canvas';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

@Resolver()
export class FooResolver {
  @Query(() => String)
  async generatePdfWithImageCanvas(): Promise<string> {
    try {
      const doc = new jsPDF();

      // Add some text
      doc.text('Hello world!', 100, 100);

      // Image URL
      const imageUrl = 'https://placehold.co/600x400';

      // Fetch the image
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });
      const imageBuffer = Buffer.from(response.data);

      // Load the image into a canvas
      const image = await loadImage(imageBuffer);
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      // Add the image from the canvas to the PDF
      doc.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 10, 20, 100, 100);

      // Output the PDF as a Base64 string
      const pdfBase64 = doc.output('datauristring').split(',')[1];

      return pdfBase64;
    } catch (error) {
      console.error('An error occurred while generating the PDF:', error);
      throw new Error(
        'An error occurred while generating the PDF. Please check the server logs for details.',
      );
    }
  }

  @Query(() => String)
  async generateChart(): Promise<string> {
    const width = 400;
    const height = 400;

    const canvasRenderService = new ChartJSNodeCanvas({ width, height });

    const configuration: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Sample Dataset',
            data: [10, 30, 20, 40, 35],
            borderColor: '#FF5733',
            backgroundColor: '#FFF',
            fill: false,
          },
        ],
      },
      options: {
        // ... Any required Chart.js options ...
      },
    };

    const imageBuffer = await canvasRenderService.renderToBuffer(configuration);

    const image = await loadImage(imageBuffer);

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);

    const doc = new jsPDF();
    doc.addImage(
      canvas.toDataURL('image/jpeg'),
      'JPEG',
      10,
      20,
      width / 3,
      height / 3,
    ); // Scale the image size down to fit the PDF
    const pdfBase64 = doc.output('datauristring').split(',')[1];

    return pdfBase64;
  }
}
