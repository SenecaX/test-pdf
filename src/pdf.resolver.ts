/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// pdf.resolver.ts

// eslint-disable-next-line @typescript-eslint/no-var-requires
const PDFDocument = require('pdfkit');
import { AppService } from './app.service';
import { CreateReportDto } from './dto/create-report.dto';
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
    constructor(private readonly appService: AppService) {}


    
  @Mutation(() => String)
  async generateAndFetchPDF(
    @Args('input') input: CreateReportDto,
  ): Promise<string> {
    try {
      // Generate the PDF
      const pdfBuffer = await this.appService.generatePDF(input);
      console.log('Generated PDF Buffer:', pdfBuffer);

      // Encode the generated PDF to base64
      const base64PDF = pdfBuffer.toString('base64');

      return base64PDF;
    } catch (error) {
      console.error('Error in resolver:', error);
      throw new Error('Failed to generate and fetch PDF');
    }
  }


}