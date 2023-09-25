/* eslint-disable prettier/prettier */
import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GeneratePDFInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  image?: string; 

  // Added the previousPDF field to store the base64 encoded previous PDF
  @Field({ nullable: true })
  previousPDF?: string;
}

@ObjectType()
export class PDFResponse {
  @Field()
  data: string;

  @Field({ nullable: true })
  message?: string;
}
