/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// pdf.resolver.ts

// eslint-disable-next-line @typescript-eslint/no-var-requires
const PDFDocument = require('pdfkit');
import { GeneratePDFInput, PDFResponse } from './pdf.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class PDFResolver {

    @Query(() => PDFResponse)
    async getPDF(): Promise<PDFResponse> {
        // Sample implementation
        return {
            data: 'samplePDFData',
            message: 'Sample PDF fetched!'
        };
    }

    @Mutation(() => PDFResponse)
    async generatePDF(
        @Args('input') input: GeneratePDFInput
    ): Promise<PDFResponse> {
        const { name, description, age, title, image } = input;

        // console.log("input", input)

        // Generate PDF with pdfkit
        const doc = new PDFDocument();

        // eslint-disable-next-line prefer-const
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));

        doc.text(`Name: ${name}`);
        doc.text(`Description: ${description}`);
        doc.text(`Age: ${age}`);

                if (title) {
            doc.text(`Title: ${title}`);
        }

        if (image) {
            // Here you'll need logic to process and add the image to the PDF.
            // This is just a sample if the image is a base64 string:
            const imageBuffer = Buffer.from(image, 'base64');
            doc.image(imageBuffer, {
                fit: [250, 300],  // This is just an example size.
                align: 'center',
                valign: 'center'
            });
        }
        
        doc.end();

        return new Promise((resolve, reject) => {
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                const encodedPDF = pdfData.toString('base64');

                resolve({
                    data: encodedPDF,
                    message: 'PDF Generated successfully!'
                });
            });

            doc.on('error', (err: any) => {
                reject(err);
            });
        });
    }
}
