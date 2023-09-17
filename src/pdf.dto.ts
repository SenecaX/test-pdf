/* eslint-disable prettier/prettier */
// pdf.dto.ts

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

  // Assuming you'll send the image as a base64 string, but you might change this if you're sending it differently
  @Field({ nullable: true })
  image?: string; 
}

@ObjectType()
export class PDFResponse {
  @Field()
  data: string;

  @Field({ nullable: true })
  message?: string;
}
