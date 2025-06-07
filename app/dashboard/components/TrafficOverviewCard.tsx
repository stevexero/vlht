'use client';

import dynamic from 'next/dynamic';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

interface TrafficData {
  stats: {
    pageviews: { value: number };
    visitors: { value: number };
    bounces: { value: number };
    visits: { value: number };
  };
  pageviews: { x: string; y: number }[];
  referrers: { x: string; y: number }[];
}

export default function TrafficOverviewCard({
  traffic,
}: {
  traffic: TrafficData;
}) {
  const chartData = {
    labels: traffic.pageviews.length
      ? traffic.pageviews.map((pv) =>
          new Date(pv.x).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })
        )
      : ['No Data'],
    datasets: [
      {
        label: 'Page Views',
        data: traffic.pageviews.length
          ? traffic.pageviews.map((pv) => pv.y)
          : [0],
        borderColor: '#b91c1c', // Vegas red
        backgroundColor: 'rgba(185, 28, 28, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <DashboardCard
      title='Traffic Overview (Last 7 Days)'
      containerStyles='col-span-1 md:col-span-2'
    >
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2'>
        <div className='text-center'>
          <p className='text-gray-600 text-sm uppercase'>Page Views</p>
          <p className='text-2xl font-bold text-blue-600'>
            {traffic.stats.pageviews.value.toLocaleString()}
          </p>
        </div>
        <div className='text-center'>
          <p className='text-gray-600 text-sm uppercase'>Unique Visitors</p>
          <p className='text-2xl font-bold text-blue-600'>
            {traffic.stats.visitors.value.toLocaleString()}
          </p>
        </div>
        <div className='text-center'>
          <p className='text-gray-600 text-sm uppercase'>Bounce Rate</p>
          <p className='text-2xl font-bold text-blue-600'>
            {(traffic.stats.visits.value
              ? (traffic.stats.bounces.value / traffic.stats.visits.value) * 100
              : 0
            ).toFixed(1)}
            %
          </p>
        </div>
      </div>
      <div className='mt-6'>
        <h3 className='text-lg font-semibold text-gray-500 mb-2'>
          Daily Page Views
        </h3>
        <div className='h-64'>
          <Chart
            data={chartData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: 'Page Views' },
                },
                x: { title: { display: true, text: 'Date' } },
              },
            }}
          />
        </div>
      </div>
      <div className='mt-6'>
        <h3 className='text-lg font-semibold text-gray-500 mb-2'>
          Top Referrers
        </h3>
        {traffic.referrers.length ? (
          <ul className='list-disc pl-5'>
            {traffic.referrers.map((ref) => (
              <li key={ref.x} className='text-gray-600'>
                {ref.x || 'Direct'}: {ref.y}
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-600'>No referrer data available</p>
        )}
      </div>
    </DashboardCard>
  );
}
