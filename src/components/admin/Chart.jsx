import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box } from '@chakra-ui/react';
import { Title } from 'chart.js';
import { BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, CategoryScale, LinearScale, PointElement, LineElement, CategoryScale, BarElement, Title);



export const BarChartTopBotAndCampaigan = ({  months,botData, campaignData }) => {
const chartData = {
    labels: months,
    datasets: [
      {
        label: "Bots",
        data: botData,
        backgroundColor: "rgb(124, 208, 214)",
        borderRadius: 7
      },
      {
        label: "Campaigns",
        data: campaignData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderRadius: 7
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw;
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month"
        }
      },
      y: {
        title: {
          display: true,
          text: "Count"
        },
        beginAtZero: true
      }
    }
  };


    return <Bar data={chartData} options={options} />;

};

export const PieSectorWiseBots = ({ data }) => {
    const label = data?.map(item => item.sector_name);
    const total = data?.map(item => item.bot_count);
    const chartData = {
        labels: label,
        datasets: [
            {
                label: "",
                data: total,
                backgroundColor: [
                    "#f9b0db",
                    "#8ccefb",
                    "#FFCE56",
                    "#FF6384",
                    "#4BC0C0",
                    "#9966FF",
                ],
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxWidth: 20,
                    padding: 15,
                },
            },
            datalabels: {
                color: "#fff",
                font: {
                    weight: "bold",
                    size: 14,
                },
                formatter: (value, context) => {
                    const total = context.chart._metasets[0].total || 1;
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${percentage}%`;
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = chartData.labels[tooltipItem.dataIndex] || "";
                        const value = chartData.datasets[0].data[tooltipItem.dataIndex];
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };


    return <Pie data={chartData} options={options} />;
};

export const PieSectorWisesectorGenAi = ({ data }) => {
    const label = data?.map(item => item.sector_name);
    const total = data?.map(item => item.bot_count);
    const chartData = {
        labels: label,
        datasets: [
            {
                label: "",
                data: total,
                backgroundColor: [
                    "#9966FF",
                    "#4BC0C0",
                    "#FF6384",
                    "#FFCE56",
                    "#8ccefb",
                    "#f9b0db",
                ],
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxWidth: 20,
                    padding: 15,
                },
            },
            datalabels: {
                color: "#fff",
                font: {
                    weight: "bold",
                    size: 14,
                },
                formatter: (value, context) => {
                    const total = context.chart._metasets[0].total || 1;
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${percentage}%`;
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = chartData.labels[tooltipItem.dataIndex] || "";
                        const value = chartData.datasets[0].data[tooltipItem.dataIndex];
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };


    return <Pie data={chartData} options={options} />;
};

export const MonthlyTrainingTrend = ({ data }) => {
 
    
    const labels = data?.map(item => item.month) ;
    const completionData = data?.map(item => item.completed);
    const chartData = {
        labels,
        datasets: [
            {
                label: "Completed Trainings",
                data: completionData,
                borderColor: "#4BC0C0",
                backgroundColor: "rgba(75,192,192,0.4)",
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: "#4BC0C0"
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom"
            },
            title: {
                display: true,
                text: "Monthly Training Completion Trend",
                font: {
                    size: 18
                }
            },
            tooltip: {
                callbacks: {
                    // label: context => ${context.dataset.label}: ${context.raw}
                    }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Completed Trainings"
                }
            },
            x: {
                title: {
                    display: true,
                    text: "Month"
                }
            }
        }
    };

    return <Box  height='400px'><Line data={chartData} options={options} /></Box>;
};
// Performance analtytics

// export const ModulewiseAverageScores = ({ data }) => {
//     const departments = data?.map(item => item.module_name);
//     const completionRates = data?.map(item => item.average_score);


//     const chartData = {
//         labels: departments,
//         datasets: [
//             {
//                 label: "Module-wise Average Scores",
//                 data: completionRates,
//                 borderRadius: 7,
//                 backgroundColor: "rgb(197, 140, 243)",
//             },
//             // {
//             //     label: "Remaining Leaves",
//             //     data: remainingLeaves,
//             //     borderRadius: 10,
//             //     backgroundColor: "rgba(12, 72, 24, 0.48)", // Color for Remaining Leaves
//             // },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 display: false,
//             },
//             tooltip: {
//                 callbacks: {
//                     label: (tooltipItem) => {
//                         const label = tooltipItem.dataset.label || "";
//                         const value = tooltipItem.raw;
//                         return `${label}: ${value}`;
//                     },
//                 },
//             },
//             datalabels: {
//                 anchor: 'center',
//                 align: 'center',
//                 color: 'white',
//                 font: {
//                     weight: 'bold',
//                     size: 15,
//                 },
//                 formatter: (value) => {
//                     return `${value}`;
//                 },
//             },
//         },
//         scales: {
//             x: {
//                 stacked: true,
//                 title: {
//                     display: true,
//                     text: "Module",
//                 },
//             },
//             y: {
//                 stacked: true,
//                 title: {
//                     display: true,
//                     text: "Module-wise Average Scores",
//                 },
//                 beginAtZero: true,
//             },
//         },
//     };

//     return <Bar data={chartData} options={options} />;

// };

// export const TraineesPerformanceChart = ({ data }) => {
//     const label = data?.map(item => item.performance_tier);
//     const total = data?.map(item => item.trainee_count);
//     const chartData = {
//         labels: label,
//         datasets: [
//             {
//                 label: "Trainees Performance Chart",
//                 data: total,
//                 backgroundColor: [
//                     "#f9b0db",
//                     "#8ccefb",
//                     "#FFCE56",
//                     "#FF6384",
//                     "#4BC0C0",
//                     "#9966FF",
//                 ],
//                 borderColor: "#fff",
//                 borderWidth: 2,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: "bottom",
//                 labels: {
//                     boxWidth: 20,
//                     padding: 15,
//                 },
//             },
//             datalabels: {
//                 color: "#fff",
//                 font: {
//                     weight: "bold",
//                     size: 14,
//                 },
//                 formatter: (value, context) => {
//                     const total = context.chart._metasets[0].total || 1;
//                     const percentage = ((value / total) * 100).toFixed(1);
//                     return `${percentage}%`;
//                 },
//             },
//             tooltip: {
//                 callbacks: {
//                     label: (tooltipItem) => {
//                         const label = chartData.labels[tooltipItem.dataIndex] || "";
//                         const value = chartData.datasets[0].data[tooltipItem.dataIndex];
//                         return `${label}: ${value}`;
//                     },
//                 },
//             },
//         },
//     };


//     return <Pie data={chartData} options={options} />;
// };



// export const UserEngagementChart = ({ data , formatDate}) => {
//     const labels = data?.map(item =>  formatDate(item.login_date));
//     const name = data?.map(item => item.employee_name);
//     const completionData = data?.map(item => item.login_count);

//     const chartData = {
//         labels,
//         datasets: [
//             {
//                 label: "User Engagement Over Time",
//                 data: completionData,
//                 borderColor: "#4BC0C0",
//                 backgroundColor: "rgba(76, 204, 161, 0.4)",
//                 // tension: 0.4,
//                 // fill: true,
//                 // pointRadius: 5,
//                 pointBackgroundColor: "#4BC0C0"
//             }
//         ],
//     };

//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 position: "bottom"
//             },
//             title: {
//                 display: true,
//                 text: "User Engagement Over Time",
//                 font: {
//                     size: 18
//                 }
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function (context) {
//                         const index = context.dataIndex;
//                         const employee = name[index];
//                         const count = completionData[index];
//                         return `${employee}: ${count} logins`;
//                     }
//                 }
//             }
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 title: {
//                     display: true,
//                     text: "Login Count"
//                 }
//             },
//             x: {
//                 title: {
//                     display: true,
//                     text: "Date"
//                 }
//             }
//         }
//     };

//     return <Box height='400px'><Line data={chartData} options={options} /></Box>;
// };


