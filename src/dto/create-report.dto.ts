/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';
import { PageConfigInput } from './pageConfig.input';

@InputType()
export class CreateReportDto {
  @Field()
  user_id: string;

  @Field()
  project_id: string;

  @Field()
  date_range?: string;

  @Field(() => PageConfigInput)
  page_configs: PageConfigInput;
}
