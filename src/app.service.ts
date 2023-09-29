/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import axios from 'axios';
import sizeOf from 'image-size';
import sharp from 'sharp';
import puppeteer from 'puppeteer';



// eslint-disable-next-line @typescript-eslint/no-var-requires
const PDFKit: any = require('pdfkit');

@Injectable()
export class AppService {

    
  // Helper function to get the fitted dimensions
  getFittedDimensions(imgWidth: number, imgHeight: number, maxWidth: number, maxHeight: number): { width: number, height: number } {
    const aspectRatio = imgWidth / imgHeight;
    let width = maxWidth;
    let height = Math.round(maxWidth / aspectRatio);

    if (height > maxHeight) {
      height = maxHeight;
      width = Math.round(maxHeight * aspectRatio);
    }

    return { width, height };
  }

  getScaledDimensions(originalWidth: number, originalHeight: number, maxWidth: number, maxHeight: number): { width: number, height: number } {
    // Determine the ratio to maintain aspect ratio
    let ratio = Math.min(maxWidth / originalWidth, maxHeight / originalHeight);
    
    // Return new dimensions
    return {
        width: originalWidth * ratio,
        height: originalHeight * ratio
    };
}


async captureLeafletMap(data: CreateReportDto, zoom: number): Promise<Buffer> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const coordinates = zoom === 10 ? data.page_configs.map_coordinate_01 : data.page_configs.map_coordinate_02;

    if (!coordinates) {
        throw new Error(`Coordinates not provided for zoom level ${zoom}`);
    }

    const [lat, lon] = coordinates.split(',').map(coord => parseFloat(coord.trim()));

    // Set up the content of the page with Leaflet map
    const content = `
        <html>
            <head>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
            </head>
            <body style="margin: 0; padding: 0;">
                <div id="map" style="width: 100%; height: 100vh;"></div>

                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                <script>
                    const map = L.map('map').setView([${lat}, ${lon}], ${zoom});
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
                </script>
            </body>
        </html>
    `;

    await page.setContent(content, { waitUntil: 'networkidle0' });
    const screenshot = await page.screenshot();
    await browser.close();

    return screenshot;
}

// chart-capture.ts
async captureChartScreenshot(chartData: any, chartOptions:any): Promise<Buffer> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
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
const colors = {
    "GAP": [
        'rgb(75, 192, 192)', // color for the first sensor's GAP
        'rgb(54, 162, 235)'  // color for the second sensor's GAP
    ],
    "TEMPERATURE": [
        'rgb(255, 99, 132)', // color for the first sensor's TEMPERATURE
        'rgb(255, 159, 64)'  // color for the second sensor's TEMPERATURE
    ]
};
  // Updated dataset
//   const sensorMetrics = sensorData.getMetricsBySensorsIdList[0].metrics;

//   const chartData1 = {
//     labels: sensorData.getMetricsBySensorsIdList[0].metrics[0].metrics.map(point => new Date(point.time).toLocaleString('fr-FR')),
//     datasets: sensorData.getMetricsBySensorsIdList.flatMap((sensor, index) => 
//       sensor.metrics.map(metric => ({
//         label: `${metric.field} from Sensor ${index + 1}`,
//         data: metric.metrics.map(point => point.value),
//         fill: false,
//         borderColor: colors[metric.field][index],
//         tension: 0.1,
//         yAxisID: metric.field === "GAP" ? 'y-axis-gap' : 'y-axis-temperature'
//       }))
//     )
//   };
// Replace the sampleChartOptions with generatedChartOptions while retaining some sample properties





  await page.setContent(`
      <html>
          <body>
              <canvas id="myChart" width="2107" height="765"></canvas>
              <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
              <script>
                  const ctx = document.getElementById('myChart').getContext('2d');
                  const chart = new Chart(ctx, {
                      type: 'line',
                      data: ${JSON.stringify(chartData)},
                      options: ${JSON.stringify(chartOptions)}
                  });
                  // This flag will be set to true once the chart is fully rendered
                  window.chartIsRendered = false;
                  function checkRenderStatus() {
                      if (chart.isDatasetVisible(0)) { // A simple condition to check if the dataset is visible
                          window.chartIsRendered = true;
                      } else {
                          requestAnimationFrame(checkRenderStatus);
                      }
                  }
                  checkRenderStatus();
              </script>
          </body>
      </html>
  `);

  // Wait until the chart is rendered
  await page.waitForFunction(() => (window as any).chartIsRendered);

  const chartElement = await page.$('#myChart');
  const screenshot = await chartElement.screenshot() as unknown as Buffer;

  await browser.close();

  return screenshot;
}




  async generatePDFintroduction(doc: any, data: CreateReportDto): Promise<void> {
    // No need to recreate the `doc` object, just use the one passed as an argument

    // Reference the downloaded font files
    const MONTSERRAT_BLACK = 'assets/fonts/montserrat_static/Montserrat-Black.ttf';
    const MONTSERRAT_LIGHT = 'assets/fonts/montserrat_static/Montserrat-Light.ttf';
    const MONTSERRAT_THIN_ITALIC = 'assets/fonts/montserrat_static/Montserrat-ThinItalic.ttf';
    const MONTSERRAT_MEDIUM = 'assets/fonts/montserrat_static/Montserrat-Medium.ttf';

    // Embed hardcoded logo
    const HARDCODED_LOGO_URL = 'https://fastly.picsum.photos/id/127/200/100.jpg?hmac=YomLX3vGRgbprKBwZAJFyUI0p_987I3YdYVW8sWi2y4'; // Replace with your actual logo URL

    try {
        const hardcodedLogoResponse = await axios.get(HARDCODED_LOGO_URL, {
            responseType: 'arraybuffer',
        });
        const hardcodedLogoBuffer = Buffer.from(hardcodedLogoResponse.data, 'binary');
        doc.image(hardcodedLogoBuffer, 1837, 238, { width: 399, height: 184 });
    } catch (error) {
        console.error('Error fetching or embedding hardcoded logo:', error);
    }

    // Embed company logo if available
    if (data.page_configs.company_logo) {
        try {
            const companyLogoResponse = await axios.get(data.page_configs.company_logo, { responseType: 'arraybuffer' });
            const companyLogoBuffer = Buffer.from(companyLogoResponse.data, 'binary');
            doc.image(companyLogoBuffer, 1956, 447, { width: 280, height: 156 });
        } catch (error) {
            console.error('Error fetching or embedding company logo:', error);
        }
    }

    doc.font(MONTSERRAT_BLACK)
        .fontSize(160)
        .text(data.page_configs.report_title, 287, 447, { width: 1615, height: 729 });

    doc.strokeColor("#000")
        .lineWidth(18)
        .moveTo(245, 447)
        .lineTo(245, 447 + 877)
        .stroke();

    doc.font(MONTSERRAT_LIGHT)
        .fontSize(75)
        .text(data.page_configs.project_title, 325, 1057, { width: 1512 });

    // Set the address and author name
    doc.font(MONTSERRAT_THIN_ITALIC)
        .fontSize(35)
        .text(data.page_configs.adresse, 325, 1190)
        .text(data.page_configs.author_name, 325, 1257);

    if (data.page_configs.project_image) {
        try {
            const projectImageResponse = await axios.get(data.page_configs.project_image, {
                responseType: 'arraybuffer',
            });
            const projectImageBuffer = Buffer.from(projectImageResponse.data, 'binary');

            // Use image-size to get the image's dimensions
            const { width: imgWidth, height: imgHeight } = sizeOf(projectImageBuffer);

            // Calculate the fitted dimensions
            const { width, height } = this.getFittedDimensions(imgWidth, imgHeight, 1733, 1241);

            // Calculate starting x and y for the image to be centered in the area
            const areaWidth = 1733;   // Area where the image should be placed
            const areaHeight = 1241;  // Area where the image should be placed
            const startX = 374 + (areaWidth - width) / 2;   // The '144' here is the original starting x position. Adjust if needed.
            const startY = 1574 + (areaHeight - height) / 2; // The '817' here is the original starting y position. Adjust if needed.

            // Draw the image in PDFKit using the calculated starting positions and fitted dimensions
            doc.image(projectImageBuffer, startX, startY, { width, height });

        } catch (error) {
            console.error('Error fetching or embedding project image:', error);
        }
    }

    doc.font(MONTSERRAT_MEDIUM)
        .fontSize(23)
        .text(new Date().toLocaleDateString(), 1173, 3114, { width: 135 });

    doc.font(MONTSERRAT_MEDIUM)
        .fontSize(18)
        .text('Rapport envoyé automatiquement une fois par mois depuis 2020', 935, 3175, { width: 612 });

    // doc.end(); // This signals to PDFKit that you've finished adding content to the doc.
}

async generatePDFprojectpage(doc: any, data: CreateReportDto): Promise<void> {
  // Reference the downloaded font files
  const MONTSERRAT_BLACK = 'assets/fonts/montserrat_static/Montserrat-Black.ttf';
  const MONTSERRAT_REGULAR = 'assets/fonts/montserrat_static/Montserrat-Regular.ttf';
  const MONTSERRAT_MEDIUM = 'assets/fonts/montserrat_static/Montserrat-Medium.ttf';
  
  const ICON_PLACEHOLDER_ADRESSE = 'assets/icon/location-dot-solid.svg';
  const ICON_PLACEHOLDER_ZONE = 'assets/icon/map-solid.svg';
  const ICON_PLACEHOLDER_CAPTEUR_ACTIF = 'assets/icon/house-signal-solid.svg';

  // Helper function to embed and display images with fitted dimensions the embedImage function can be overloaded to accept either a URL (string) or a Buffer. If it receives a URL, it will fetch the image. If it receives a Buffer, it will process it directly.
  const embedImage = async (input: string | Buffer, x: number, y: number, boxWidth: number, boxHeight: number) => {
    let imageBuffer: Buffer;

    try {
        if (typeof input === 'string') {
            const imageResponse = await axios.get(input, { responseType: 'arraybuffer' });
            imageBuffer = Buffer.from(imageResponse.data, 'binary');
        } else {
            imageBuffer = input;
        }

        const { width: imgWidth, height: imgHeight } = sizeOf(imageBuffer);

        const aspectRatio = imgWidth / imgHeight;
        let imgFinalWidth: number, imgFinalHeight: number;

        if (imgWidth / boxWidth > imgHeight / boxHeight) {
            imgFinalWidth = boxWidth;
            imgFinalHeight = boxWidth / aspectRatio;
        } else {
            imgFinalHeight = boxHeight;
            imgFinalWidth = boxHeight * aspectRatio;
        }

        const xOffset = (boxWidth - imgFinalWidth) / 2;
        const yOffset = (boxHeight - imgFinalHeight) / 2;

        doc.image(imageBuffer, x + xOffset, y + yOffset, { width: imgFinalWidth, height: imgFinalHeight });
    } catch (error) {
        console.error('Error processing or embedding image:', error);
    }
};


  const embedIcon = async (iconPath: string, x: number, y: number, maxWidth: number, maxHeight: number) => {
    try {
      const pngBuffer = await sharp(iconPath).png().toBuffer();
      const { width: imgWidth, height: imgHeight } = sizeOf(pngBuffer);
      const { width, height } = this.getScaledDimensions(imgWidth, imgHeight, maxWidth, maxHeight);
      doc.image(pngBuffer, x, y, { width, height });
    } catch (error) {
      console.error('Error embedding icon:', error);
    }
  };


  // Project details
  if (data.page_configs.page2_project_title) {
    doc.font(MONTSERRAT_BLACK)
        .fontSize(80)
        .text(data.page_configs.page2_project_title, 171, 175, { width: 548, height: 98 });
}

if (data.page_configs.page2_project_date) {
    doc.font(MONTSERRAT_REGULAR)
        .fontSize(37)
        .text(data.page_configs.page2_project_date, 182, 268, { width: 363, height: 43 });
}

if (data.page_configs.page2_project_type) {
    doc.font(MONTSERRAT_REGULAR)
        .fontSize(29)
        .text(data.page_configs.page2_project_type, 182, 372, { width: 211, height: 37 });
}


await embedIcon(ICON_PLACEHOLDER_ZONE, 171, 436, 32, 32);
if (data.page_configs.page2_project_zone) {
    doc.font(MONTSERRAT_MEDIUM)
    .fontSize(31)
    .fillColor('#315EFF')
    .text(data.page_configs.page2_project_zone, 216, 436, { width: 161, height: 32 });
  }


await embedIcon(ICON_PLACEHOLDER_CAPTEUR_ACTIF, 371, 436, 32, 32);
  if (data.page_configs.page2_project_capteur_actif) {
    doc.font(MONTSERRAT_MEDIUM)
    .fontSize(31)
    .fillColor('#C8643B')
    .text(data.page_configs.page2_project_capteur_actif, 416, 436, { width: 258, height: 32 });
  }


await embedIcon(ICON_PLACEHOLDER_ADRESSE, 171, 532, 50, 50);
if (data.page_configs.page2_project_adresse) {
  doc.font(MONTSERRAT_REGULAR)
      .fontSize(36)
      .fillColor('#0000') //checker apres kfr bisin change couleur la ici
      .text(data.page_configs.page2_project_adresse, 225, 532, { width: 494, height: 50 });
  }

if (data.page_configs.page2_project_image) {
    await embedImage(data.page_configs.page2_project_image, 1098, 177, 1210, 585);
}
const zoomedOutMap = await this.captureLeafletMap(data, 10);
const zoomedInMap = await this.captureLeafletMap(data, 15);
embedImage(zoomedOutMap, 171, 964, 1058, 950);
embedImage(zoomedInMap, 1250, 964, 1058, 950);

}

// async generatePDFlocalisation(doc: any, data: CreateReportDto): Promise<void> {
//   // Fonts
//   const MONTSERRAT_BLACK = 'assets/fonts/montserrat_static/Montserrat-Black.ttf';
//   const MONTSERRAT_SEMIBOLD = 'assets/fonts/montserrat_static/Montserrat-SemiBold.ttf';

//   // Page title
//   if (data.page_configs.page_title) {
//       doc.font(MONTSERRAT_BLACK)
//           .fontSize(70)
//           .text(data.page_configs.page_title, 171, 231, { width: 998, height: 88 });
//   }

//   // Helper function to embed and display images with fitted dimensions
//   const embedImage = async (imageUrl: string, x: number, y: number, boxWidth: number, boxHeight: number) => {
//     try {
//         const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
//         const imageBuffer = Buffer.from(imageResponse.data, 'binary');
//         const { width: imgWidth, height: imgHeight } = sizeOf(imageBuffer);

//         const aspectRatio = imgWidth / imgHeight;
//         let imgFinalWidth: number, imgFinalHeight: number;

//         if (imgWidth / boxWidth > imgHeight / boxHeight) {
//             // If the image width overflow is greater than height overflow
//             imgFinalWidth = boxWidth;
//             imgFinalHeight = boxWidth / aspectRatio;
//         } else {
//             imgFinalHeight = boxHeight;
//             imgFinalWidth = boxHeight * aspectRatio;
//         }

//         const xOffset = (boxWidth - imgFinalWidth) / 2;
//         const yOffset = (boxHeight - imgFinalHeight) / 2;

//         doc.image(imageBuffer, x + xOffset, y + yOffset, { width: imgFinalWidth, height: imgFinalHeight });
//     } catch (error) {
//         console.error('Error fetching or embedding image:', error);
//     }
// };


//   if (data.page_configs.plan1_image) {
//       await
//        embedImage(data.page_configs.plan1_image, 399, 414, 680, 810);
//   }
//   if (data.page_configs.plan1_name) {
//     doc.font(MONTSERRAT_SEMIBOLD)
//         .fontSize(40)
//         .text(data.page_configs.plan1_name, 451, 1243, { width: 566, height: 59, align: 'center' });
//       }


//   if (data.page_configs.plan2_image) {
//       await embedImage(data.page_configs.plan2_image, 1403, 414, 680, 810);
//   }
//   if (data.page_configs.plan2_name) {
//     doc.font(MONTSERRAT_SEMIBOLD)
//         .fontSize(40)
//         .text(data.page_configs.plan2_name, 1455, 1243, { width: 566, height: 59, align: 'center' });
//       }

//   if (data.page_configs.plan3_image) {
//       await embedImage(data.page_configs.plan3_image, 399, 1388, 680, 810);
//   }
//   if (data.page_configs.plan3_name) {
//     doc.font(MONTSERRAT_SEMIBOLD)
//         .fontSize(40)
//         .text(data.page_configs.plan3_name, 451, 2217, { width: 566, height: 59, align: 'center' });
//       }

//   if (data.page_configs.plan4_image) {
//     await embedImage(data.page_configs.plan4_image, 1403, 1388, 680, 810);
// }
// if (data.page_configs.plan4_name) {
//   doc.font(MONTSERRAT_SEMIBOLD)
//       .fontSize(40)
//       .text(data.page_configs.plan4_name, 1455, 2217, { width: 566, height: 59, align: 'center' });
//     }

//   if (data.page_configs.plan5_image) {
//   await embedImage(data.page_configs.plan5_image, 399, 2356, 680, 810);
// }
// if (data.page_configs.plan5_name) {
//   doc.font(MONTSERRAT_SEMIBOLD)
//       .fontSize(40)
//       .text(data.page_configs.plan5_name, 451, 3185, { width: 566, height: 59, align: 'center' });
//     }

//   if (data.page_configs.plan6_image) {
//   await embedImage(data.page_configs.plan5_image, 1403, 2356, 680, 810);
// }
// if (data.page_configs.plan6_name) {
//   doc.font(MONTSERRAT_SEMIBOLD)
//       .fontSize(40)
//       .text(data.page_configs.plan6_name, 1455, 3185, { width: 566, height: 59, align: 'center' });
//     }
// }
async generatePDFlocalisation(doc: any, data: CreateReportDto): Promise<void> {
    // Constants for the fonts
    const MONTSERRAT_BLACK = 'assets/fonts/montserrat_static/Montserrat-Black.ttf';
    const MONTSERRAT_SEMIBOLD = 'assets/fonts/montserrat_static/Montserrat-SemiBold.ttf';

      // Page title
  if (data.page_configs.page_title) {
      doc.font(MONTSERRAT_BLACK)
          .fontSize(70)
          .text(data.page_configs.page_title, 297, 175, { width: 998, height: 88 });
  }
  
    // Dimensions and positions for the boxes
    const BOX_DIMENSIONS = [
      { imageX: 399, imageY: 414, textX: 451, textY: 1243 },
      { imageX: 1403, imageY: 414, textX: 1455, textY: 1243 },
      { imageX: 399, imageY: 1388, textX: 451, textY: 2217 },
      { imageX: 1403, imageY: 1388, textX: 1455, textY: 2217 },
      { imageX: 399, imageY: 2356, textX: 451, textY: 3185 },
      { imageX: 1403, imageY: 2356, textX: 1455, textY: 3185 }
    ];
  
    // Extracting plans from the input data (replace this with actual data extraction logic)
    const plans = data.page_configs.plans; // assuming plans is an array with image and name properties for each plan
  
    // Initialize counter
    let currentPlanCount = 0;
  
    for (const plan of plans) {
      if (currentPlanCount % 6 === 0 && currentPlanCount !== 0) {
        doc.addPage(); // Add new page after every 6 plans
      }
  
      // Get current box dimensions
      const currentBox = BOX_DIMENSIONS[currentPlanCount % 6];
  
      // Embed the image
      try {
        const imageResponse = await axios.get(plan.image, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        doc.image(imageBuffer, currentBox.imageX, currentBox.imageY, { width: 680, height: 810 });
      } catch (error) {
        console.error('Error fetching or embedding image:', error);
      }
  
      // Add the text
      doc.font(MONTSERRAT_SEMIBOLD)
         .fontSize(40)
         .text(plan.name, currentBox.textX, currentBox.textY, { width: 566, height: 59, align: 'center' });
  
      // Increment the counter
      currentPlanCount++;
    }
  }

// async generatePDFlinechart(doc: any, chartData: any): Promise<void> {
//   // embedImage function as provided earlier...
//   const embedImage = async (input: string | Buffer, x: number, y: number, boxWidth: number, boxHeight: number) => {
//       let imageBuffer: Buffer;

//       try {
//           if (typeof input === 'string') {
//               const imageResponse = await axios.get(input, { responseType: 'arraybuffer' });
//               imageBuffer = Buffer.from(imageResponse.data, 'binary');
//           } else {
//               imageBuffer = input;
//           }

//           const { width: imgWidth, height: imgHeight } = sizeOf(imageBuffer);

//           const aspectRatio = imgWidth / imgHeight;
//           let imgFinalWidth: number, imgFinalHeight: number;

//           if (imgWidth / boxWidth > imgHeight / boxHeight) {
//               imgFinalWidth = boxWidth;
//               imgFinalHeight = boxWidth / aspectRatio;
//           } else {
//               imgFinalHeight = boxHeight;
//               imgFinalWidth = boxHeight * aspectRatio;
//           }

//           const xOffset = (boxWidth - imgFinalWidth) / 2;
//           const yOffset = (boxHeight - imgFinalHeight) / 2;

//           doc.image(imageBuffer, x + xOffset, y + yOffset, { width: imgFinalWidth, height: imgFinalHeight });
//       } catch (error) {
//           console.error('Error processing or embedding image:', error);
//       }
//   };

//   const chartScreenshot = await this.captureChartScreenshot(chartData);
  
//   // Use the embedImage function to embed the chart screenshot in the document.
//   await embedImage(chartScreenshot, 214, 907, 2107, 765);
// }

async generatePDFSensorDetails(doc: any, data: CreateReportDto, singleSensorChartData: any): Promise<void> {
    const MONTSERRAT_BLACK = 'assets/fonts/montserrat_static/Montserrat-Black.ttf';
    const MONTSERRAT_REGULAR = 'assets/fonts/montserrat_static/Montserrat-Regular.ttf';
    const chartOptions = {
        scales: {
          x: {
              type: 'category',
              title: {
                  display: true,
                  text: 'Date & Time'
              }
          },
          'y-axis-gap': {
              type: 'linear',
              position: 'left',
              title: {
                  display: true,
                  text: 'GAP Values'
              }
          },
          'y-axis-temperature': {
              type: 'linear',
              position: 'right',
              title: {
                  display: true,
                  text: 'Temperature Values'
              },
              grid: {
                  drawOnChartArea: false, // only want the grid lines for one axis to show up
              }
          }
        },
        plugins: {
          legend: {
              display: true,
              position: 'top'
          }
        }
      };

    const embedImage = async (input: string | Buffer, x: number, y: number, boxWidth: number, boxHeight: number) => {
        let imageBuffer: Buffer;
  
        try {
            if (typeof input === 'string') {
                const imageResponse = await axios.get(input, { responseType: 'arraybuffer' });
                imageBuffer = Buffer.from(imageResponse.data, 'binary');
            } else {
                imageBuffer = input;
            }
  
            const { width: imgWidth, height: imgHeight } = sizeOf(imageBuffer);
  
            const aspectRatio = imgWidth / imgHeight;
            let imgFinalWidth: number, imgFinalHeight: number;
  
            if (imgWidth / boxWidth > imgHeight / boxHeight) {
                imgFinalWidth = boxWidth;
                imgFinalHeight = boxWidth / aspectRatio;
            } else {
                imgFinalHeight = boxHeight;
                imgFinalWidth = boxHeight * aspectRatio;
            }
  
            const xOffset = (boxWidth - imgFinalWidth) / 2;
            const yOffset = (boxHeight - imgFinalHeight) / 2;
  
            doc.image(imageBuffer, x + xOffset, y + yOffset, { width: imgFinalWidth, height: imgFinalHeight });
        } catch (error) {
            console.error('Error processing or embedding image:', error);
        }
    };

      if (data.page_configs.page_sensor_title) {
        doc.font(MONTSERRAT_BLACK)
            .fontSize(60)
            .text(data.page_configs.page_sensor_title, 212, 105, { width: 535, height: 72 });
    }
for (let i = 0; i < data.page_configs.sensorDetails.length; i++) {
    const detail = data.page_configs.sensorDetails[i];
        const customPageSize = [2481, 3507];

        if (i % 2 === 0 && i !== 0) {
            doc.addPage({ size: customPageSize });
        }
        const yOffset = (i % 2 === 0) ? 0 : 1587;  // Calculate Y offset based on whether it's the first or second sensor on the page
        
        
        // Set font and add text for zone
        doc.font(MONTSERRAT_BLACK).fontSize(45);
        doc.text(detail.zone, 1051, 204 + yOffset, { width: 352, height: 65 });

        // Set font and add text for name
        doc.font(MONTSERRAT_BLACK).fontSize(30);
        doc.text(detail.name, 499, 400 + yOffset, { width: 265, height: 23 });

        // Set font and add text for date
        doc.font(MONTSERRAT_REGULAR).fontSize(20);
        doc.text(detail.date, 499, 440 + yOffset, { width: 175, height: 70 });

        // Embed images
        await embedImage(detail.image1, 280, 400 + yOffset, 180, 132);
        await embedImage(detail.image2, 1575, 357 + yOffset, 667, 404);

        // Add your graph here
        const chartScreenshotBuffer = await this.captureChartScreenshot(singleSensorChartData,chartOptions);
        await embedImage(chartScreenshotBuffer, 212, 870 + yOffset, 2030, 715);



    }
}
async generatePDFSensorAnalyse(doc: any, data: CreateReportDto, charData: any): Promise<void> {
    const MONTSERRAT_BLACK = 'assets/fonts/montserrat_static/Montserrat-Black.ttf';
    const MONTSERRAT_REGULAR = 'assets/fonts/montserrat_static/Montserrat-Regular.ttf';
    const chartOptions = {
        scales: {
          x: {
              type: 'category',
              title: {
                  display: true,
                  text: 'Date & Time'
              }
          },
          'y-axis-gap': {
              type: 'linear',
              position: 'left',
              title: {
                  display: true,
                  text: 'GAP Values'
              }
          },
          'y-axis-temperature': {
              type: 'linear',
              position: 'right',
              title: {
                  display: true,
                  text: 'Temperature Values'
              },
              grid: {
                  drawOnChartArea: false, // only want the grid lines for one axis to show up
              }
          }
        },
        plugins: {
          legend: {
              display: true,
              position: 'top'
          }
        }
      };

    const embedImage = async (input: string | Buffer, x: number, y: number, boxWidth: number, boxHeight: number) => {
        let imageBuffer: Buffer;
  
        try {
            if (typeof input === 'string') {
                const imageResponse = await axios.get(input, { responseType: 'arraybuffer' });
                imageBuffer = Buffer.from(imageResponse.data, 'binary');
            } else {
                imageBuffer = input;
            }
  
            const { width: imgWidth, height: imgHeight } = sizeOf(imageBuffer);
  
            const aspectRatio = imgWidth / imgHeight;
            let imgFinalWidth: number, imgFinalHeight: number;
  
            if (imgWidth / boxWidth > imgHeight / boxHeight) {
                imgFinalWidth = boxWidth;
                imgFinalHeight = boxWidth / aspectRatio;
            } else {
                imgFinalHeight = boxHeight;
                imgFinalWidth = boxHeight * aspectRatio;
            }
  
            const xOffset = (boxWidth - imgFinalWidth) / 2;
            const yOffset = (boxHeight - imgFinalHeight) / 2;
  
            doc.image(imageBuffer, x + xOffset, y + yOffset, { width: imgFinalWidth, height: imgFinalHeight });
        } catch (error) {
            console.error('Error processing or embedding image:', error);
        }
    };

      if (data.page_configs.sensor_analyse_title) {
        doc.font(MONTSERRAT_BLACK)
            .fontSize(50)
            .text(data.page_configs.sensor_analyse_title, 285, 231, { width: 648, height: 55 });
    }
for (let i = 0; i < data.page_configs.sensorAnalyse.length; i++) {
    const detail = data.page_configs.sensorAnalyse[i];
        const customPageSize = [2481, 3507];

        if (i % 2 === 0 && i !== 0) {
            doc.addPage({ size: customPageSize });
        }
        const yOffset = (i % 2 === 0) ? 0 : 1587;  // Calculate Y offset based on whether it's the first or second sensor on the page
        
        
        // Set font and add text for zone
        doc.font(MONTSERRAT_BLACK).fontSize(22);
        doc.text(detail.zone, 1125, 439 + yOffset, { width: 172, height: 36 });

        doc.font(MONTSERRAT_BLACK).fontSize(19);
        doc.text(detail.name1, 697, 521 + yOffset, { width: 159, height: 25 });

        // Set font and add text for date
        doc.font(MONTSERRAT_REGULAR).fontSize(15);
        doc.text(detail.date1, 697, 547 + yOffset, { width: 132, height: 33 });

        // Embed images
        await embedImage(detail.image1, 566, 511 + yOffset, 115, 96);
        
        doc.font(MONTSERRAT_BLACK).fontSize(19);
        doc.text(detail.name2, 1046, 521 + yOffset, { width: 159, height: 25 });

        // Set font and add text for date
        doc.font(MONTSERRAT_REGULAR).fontSize(15);
        doc.text(detail.date2, 1046, 547 + yOffset, { width: 132, height: 33 });

        // Embed images
        await embedImage(detail.image2, 915, 511 + yOffset, 115, 96);

        doc.font(MONTSERRAT_BLACK).fontSize(19);
        doc.text(detail.name3, 1395, 521 + yOffset, { width: 159, height: 25 });

        // Set font and add text for date
        doc.font(MONTSERRAT_REGULAR).fontSize(15);
        doc.text(detail.date3, 1395, 547 + yOffset, { width: 132, height: 33 });

        // Embed images
        await embedImage(detail.image3, 1264, 511 + yOffset, 115, 96);

        doc.font(MONTSERRAT_BLACK).fontSize(19);
        doc.text(detail.name4, 1744, 521 + yOffset, { width: 159, height: 25 });

        // Set font and add text for date
        doc.font(MONTSERRAT_REGULAR).fontSize(15);
        doc.text(detail.date4, 1744, 547 + yOffset, { width: 132, height: 33 });

        // Embed images
        await embedImage(detail.image4, 1613, 511 + yOffset, 115, 96);

        // Add your graph here
        const chartScreenshotBuffer = await this.captureChartScreenshot(charData,chartOptions);
        await embedImage(chartScreenshotBuffer, 367, 669 + yOffset, 1747, 637);


                // Set font and add text for name
        doc.font(MONTSERRAT_REGULAR).fontSize(30);
        doc.text(detail.legend, 367, 1402 + yOffset, { width: 865, height:332 });
        
                // Set font and add text for date
        doc.font(MONTSERRAT_REGULAR).fontSize(30);
        doc.text(detail.commentaire, 1295, 1402 + yOffset, { width: 865, height: 332 });

    }
}
  
async generatePDF(data: CreateReportDto, charData: any, singleSensorChartData :any): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const customPageSize = [2481, 3507];
    const doc = new PDFKit({ size: customPageSize });
          const buffers: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => {
          buffers.push(chunk);
      });

      doc.on('end', () => {
          resolve(Buffer.concat(buffers));
      });

      doc.on('error', (err) => {
          reject(err);
      });

      // Now, instead of adding buffers, we're directly generating the content into the main doc.
      await this.generatePDFintroduction(doc, data);
      doc.addPage({ size: customPageSize }); // This starts a new page
      await this.generatePDFprojectpage(doc, data);
      doc.addPage({ size: customPageSize }); // This starts a new page
      await this.generatePDFlocalisation(doc, data);
      doc.addPage({ size: customPageSize });
      await this.generatePDFSensorDetails(doc, data, singleSensorChartData);
      doc.addPage({ size: customPageSize });
      await this.generatePDFSensorAnalyse(doc, data, charData);
      // This starts a new page

    
  
      
      // If you have more functions like generatePDFintroduction, you can call them sequentially here.

      doc.end(); // This will end the document and trigger the buffers to combine.
  });
}

}