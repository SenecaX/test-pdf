/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class SensorDetailInput {
  @Field()
  zone: string;

  @Field()
  name: string;

  @Field()
  date: string;

  @Field()
  image1: string;

  @Field()
  image2: string;

}

@InputType()
export class SensorAnalyseInput {
  @Field()
  zone: string;

  @Field()
  legend: string;

  @Field()
  commentaire: string;

  @Field()
  name1: string;

  @Field()
  date1: string;

  @Field()
  image1: string;

  @Field()
  name2: string;

  @Field()
  date2: string;

  @Field()
  image2: string;

  @Field()
  name3: string;

  @Field()
  date3: string;

  @Field()
  image3: string;

  @Field()
  name4: string;

  @Field()
  date4: string;

  @Field()
  image4: string;
}

@InputType()
export class PlanInput {
  @Field()
  name: string;

  @Field()
  image: string;
  
}

@InputType()
export class PageConfigInput {

  //introduction 
  @Field()
  report_title: string;

  @Field()
  project_title: string;

  @Field()
  adresse: string;

  @Field()
  author_name: string;

  @Field()
  project_image: string;

  @Field()
  company_logo: string;

  // second page
  @Field({ nullable: true })
  page2_project_title?: string;

  @Field({ nullable: true })
  page2_project_date?: string;

  @Field({ nullable: true })
  page2_project_type?: string;

  @Field({ nullable: true })
  page2_project_zone?: string;

  @Field({ nullable: true })
  page2_project_capteur_actif?: string;

  @Field({ nullable: true })
  page2_project_adresse?: string;

  @Field({ nullable: true })
  page2_project_image?: string;

  @Field({ nullable: true })
  page2_project_plan1?: string; //erased

  @Field({ nullable: true })
  page2_project_plan2?: string; //erased

  @Field({ nullable: true })
  page2_project_plan3?: string; //erased

  @Field({ nullable: true })
  page2_project_description?: string; //erased

  @Field({ nullable: true })
  map_coordinate_01?: string;

  @Field({ nullable: true })
  map_coordinate_02?: string;


  //third page - localisation
  @Field({ nullable: true })
  page_title?: string;

  @Field({ nullable: true })
  plan1_name?: string; 

  @Field({ nullable: true })
  plan1_description?: string; //erased

  @Field({ nullable: true })
  plan1_image?: string; //need to create an array

  @Field({ nullable: true })
  plan2_name?: string; 

  @Field({ nullable: true })
  plan2_description?: string; //erased

  @Field({ nullable: true })
  plan2_image?: string; 

  @Field({ nullable: true })
  plan3_name?: string; 

  @Field({ nullable: true })
  plan3_description?: string; //erased

  @Field({ nullable: true })
  plan3_image?: string;

  @Field({ nullable: true })
  plan4_name?: string; 

  @Field({ nullable: true })
  plan4_image?: string;

  @Field({ nullable: true })
  plan5_name?: string; 

  @Field({ nullable: true })
  plan5_image?: string;

  @Field({ nullable: true })
  plan6_name?: string; 

  @Field({ nullable: true })
  plan6_image?: string;

  @Field({ nullable: true })
  page_sensor_title?: string;

  @Field({ nullable: true })
  sensor_analyse_title?: string

  @Field(type => [PlanInput], { nullable: true })
  plans?: PlanInput[];

  @Field(type => [SensorDetailInput], { nullable: true })
  sensorDetails?: SensorDetailInput[];
  
  @Field(type => [SensorAnalyseInput], { nullable: true })
  sensorAnalyse?: SensorAnalyseInput[];


}