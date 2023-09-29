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

      const colors = {
        "GAP": [
            'rgb(75, 192, 192)', // color for the first sensor's GAP
            'rgb(54, 162, 235)',  // color for the second sensor's GAP
            'rgb(255, 0, 0)',
            'rgb(0, 128, 0)',
            'rgb(0, 0, 255)',
            'rgb(255, 255, 0)',
            'rgb(255, 0, 255)',
            'rgb(0, 255, 255)',
        ],
        "TEMPERATURE": [
            'rgb(255, 99, 132)', // color for the first sensor's TEMPERATURE
            'rgb(255, 159, 64)',  // color for the second sensor's TEMPERATURE
            'rgb(255, 0, 0)',
            'rgb(0, 128, 0)',
            'rgb(0, 0, 255)',
            'rgb(255, 255, 0)',
            'rgb(255, 0, 255)',
            'rgb(0, 255, 255)',
        ]
    };

    const sensorData = {
      "getMetricsBySensorsIdList": [
          {
              "sensor_id": "22921d2f-2c07-472a-aba5-b71419344228",
              "measurement": "DELTA",
              "metrics": [
                  {
                      "field": "GAP",
                      "VStartBrut": 22.8,
                      "VLastBrut": 29,
                      "VLastDelta": 6.199999999999999,
                      "metrics": [
                          {
                              "value": 23.5,
                              "time": "2023-06-02T18:00:00Z",
                              "delta": 0.6999999999999993,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 23.1,
                              "time": "2023-06-03T00:00:00Z",
                              "delta": 0.3000000000000007,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 22.9,
                              "time": "2023-06-03T06:00:00Z",
                              "delta": 0.09999999999999787,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 22.8,
                              "time": "2023-06-03T12:00:00Z",
                              "delta": 0,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 22.4,
                              "time": "2023-06-03T18:00:00Z",
                              "delta": -0.40000000000000213,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 23.4,
                              "time": "2023-06-04T00:00:00Z",
                              "delta": 0.5999999999999979,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 22.7,
                              "time": "2023-06-04T06:00:00Z",
                              "delta": -0.10000000000000142,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 23.3,
                              "time": "2023-06-04T12:00:00Z",
                              "delta": 0.5,
                              "__typename": "MetricValue"
                          }
                      ],
                      "__typename": "MeasureType"
                  },
                  {
                      "field": "TEMPERATURE",
                      "VStartBrut": 19.1,
                      "VLastBrut": 34,
                      "VLastDelta": 14.899999999999999,
                      "metrics": [
                          {
                              "value": 21.9,
                              "time": "2023-06-02T18:00:00Z",
                              "delta": 2.799999999999997,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 24.1,
                              "time": "2023-06-03T00:00:00Z",
                              "delta": 5,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 22.3,
                              "time": "2023-06-03T06:00:00Z",
                              "delta": 3.1999999999999993,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 22.9,
                              "time": "2023-06-03T12:00:00Z",
                              "delta": 3.799999999999997,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 19.9,
                              "time": "2023-06-03T18:00:00Z",
                              "delta": 0.7999999999999972,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 22.4,
                              "time": "2023-06-04T00:00:00Z",
                              "delta": 3.299999999999997,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 20.3,
                              "time": "2023-06-04T06:00:00Z",
                              "delta": 1.1999999999999993,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 21.4,
                              "time": "2023-06-04T12:00:00Z",
                              "delta": 2.299999999999997,
                              "__typename": "MetricValue"
                          }
                      ],
                      "__typename": "MeasureType"
                  }
              ],
              "__typename": "Metrics"
          },
          {
              "sensor_id": "4bf25cd7-a70b-4af4-98a0-f091680f7e5d",
              "measurement": "DELTA",
              "metrics": [
                  {
                      "field": "GAP",
                      "VStartBrut": 22.2,
                      "VLastBrut": 23.1,
                      "VLastDelta": 0.9000000000000021,
                      "metrics": [
                          {
                              "value": 23,
                              "time": "2023-06-02T18:00:00Z",
                              "delta": 0.8000000000000007,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 23.2,
                              "time": "2023-06-03T00:00:00Z",
                              "delta": 1,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 23.3,
                              "time": "2023-06-03T06:00:00Z",
                              "delta": 1.1000000000000014,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 22.1,
                              "time": "2023-06-03T12:00:00Z",
                              "delta": -0.09999999999999787,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 23.8,
                              "time": "2023-06-03T18:00:00Z",
                              "delta": 1.6000000000000014,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 22.5,
                              "time": "2023-06-04T00:00:00Z",
                              "delta": 0.3000000000000007,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 22.6,
                              "time": "2023-06-04T06:00:00Z",
                              "delta": 0.40000000000000213,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 22.7,
                              "time": "2023-06-04T12:00:00Z",
                              "delta": 0.5,
                              "__typename": "MetricValue"
                          }
                      ],
                      "__typename": "MeasureType"
                  },
                  {
                      "field": "TEMPERATURE",
                      "VStartBrut": 22.8,
                      "VLastBrut": 20.9,
                      "VLastDelta": -1.9000000000000021,
                      "metrics": [
                          {
                              "value": 20.5,
                              "time": "2023-06-02T18:00:00Z",
                              "delta": -2.3000000000000007,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 21.4,
                              "time": "2023-06-03T00:00:00Z",
                              "delta": -1.4000000000000021,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 23,
                              "time": "2023-06-03T06:00:00Z",
                              "delta": 0.1999999999999993,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 19.8,
                              "time": "2023-06-03T12:00:00Z",
                              "delta": -3,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 22.9,
                              "time": "2023-06-03T18:00:00Z",
                              "delta": 0.09999999999999787,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 21.2,
                              "time": "2023-06-04T00:00:00Z",
                              "delta": -1.6000000000000014,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 24,
                              "time": "2023-06-04T06:00:00Z",
                              "delta": 1.1999999999999993,
                              "__typename": "MetricValue"
                          },
                          {
                              "value": 18.8,
                              "time": "2023-06-04T12:00:00Z",
                              "delta": -4,
                              "__typename": "MetricValue"
                          }
                      ],
                      "__typename": "MeasureType"
                  }
              ],
              "__typename": "Metrics"
          }
      ]
  };

      const chartData = {
    labels: sensorData.getMetricsBySensorsIdList[0].metrics[0].metrics.map(point => new Date(point.time).toLocaleString('fr-FR')),
    datasets: sensorData.getMetricsBySensorsIdList.flatMap((sensor, index) => 
      sensor.metrics.map(metric => ({
        label: `${metric.field} from Sensor ${index + 1}`,
        data: metric.metrics.map(point => point.value),
        fill: false,
        borderColor: colors[metric.field][index],
        tension: 0.1,
        yAxisID: metric.field === "GAP" ? 'y-axis-gap' : 'y-axis-temperature'
      }))
    )
      };

      const charDatamultiple = {
        labels: ["2023-06-02", "2023-06-03", "2023-06-04"],
        datasets: [
          {
            label: "GAP Values for Sensor 1",
            data: [22.8, 23.5, 22.9], // Example GAP values for each date
            borderColor: "rgb(75, 192, 192)", // The color of the line for GAP values
          },
          {
            label: "Temperature Values for Sensor 1",
            data: [19.1, 21.9, 22.3], // Example Temperature values for each date
            borderColor: "rgb(255, 99, 132)", // The color of the line for Temperature values
          },
        ],
      };

      const singleSensorChartData = {
        labels: sensorData.getMetricsBySensorsIdList[0].metrics[0].metrics.map(point => new Date(point.time).toLocaleString('fr-FR')),
        datasets: sensorData.getMetricsBySensorsIdList[0].metrics.map((metric, index) => ({
            label: `${metric.field} from Sensor 1`,
            data: metric.metrics.map(point => point.value),
            fill: false,
            borderColor: colors[metric.field][0], // Assuming colors is defined elsewhere
            tension: 0.1,
            yAxisID: metric.field === "GAP" ? 'y-axis-gap' : 'y-axis-temperature'
        }))
    };

      // Generate the PDF
      const pdfBuffer = await this.appService.generatePDF(input, chartData, singleSensorChartData);
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